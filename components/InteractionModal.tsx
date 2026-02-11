import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, CheckCircle, AlertCircle, ShoppingBag } from 'lucide-react';
import { LocationNode } from '../types';

interface InteractionModalProps {
  isOpen: boolean;
  node: LocationNode | null;
  onClose: () => void;
  onComplete: (nodeId: string) => void;
}

const InteractionModal: React.FC<InteractionModalProps> = ({ isOpen, node, onClose, onComplete }) => {
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [deliveryStatus, setDeliveryStatus] = useState(false);

  // Reset state when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setQuizSelected(null);
      setFeedback(null);
      setDeliveryStatus(false);
    }
  }, [isOpen]);

  if (!node) return null;

  const handleQuizSubmit = (index: number) => {
    setQuizSelected(index);
    if (index === node.content.quiz?.correctIndex) {
      setFeedback('success');
      setTimeout(() => {
        onComplete(node.id);
      }, 1500);
    } else {
      setFeedback('error');
    }
  };

  const handleDeliveryComplete = () => {
    setDeliveryStatus(true);
    setFeedback('success');
    setTimeout(() => {
      onComplete(node.id);
    }, 1500);
  };

  const handleStoryComplete = () => {
    onComplete(node.id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div 
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border-4 border-morandi-primary/50"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
          >
            {/* Header Image */}
            <div className="relative h-48 bg-morandi-primary/20">
               <img src={node.content.image} alt={node.title} className="w-full h-full object-cover" />
               <button onClick={onClose} className="absolute top-4 right-4 bg-white/80 p-2 rounded-full hover:bg-white text-morandi-text transition-colors">
                 <X size={20} />
               </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <h2 className="text-2xl font-serif font-bold text-morandi-text mb-2">{node.title}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">{node.content.description}</p>

              {/* Interaction: Quiz */}
              {node.type === 'quiz' && node.content.quiz && (
                <div className="space-y-3">
                  <h3 className="font-bold text-morandi-text mb-2">Quiz Time!</h3>
                  <p className="text-sm text-gray-500 mb-4">{node.content.quiz.question}</p>
                  <div className="grid grid-cols-1 gap-2">
                    {node.content.quiz.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuizSubmit(idx)}
                        disabled={feedback === 'success'}
                        className={`p-3 rounded-xl border text-left transition-all flex justify-between items-center
                          ${quizSelected === idx 
                            ? (feedback === 'success' ? 'bg-morandi-sage/20 border-morandi-sage text-morandi-text' : 'bg-red-50 border-red-200') 
                            : 'border-gray-100 hover:bg-morandi-bg hover:border-morandi-primary'
                          }
                        `}
                      >
                        <span>{option}</span>
                        {quizSelected === idx && feedback === 'success' && <CheckCircle size={18} className="text-morandi-sage" />}
                        {quizSelected === idx && feedback === 'error' && <AlertCircle size={18} className="text-red-400" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Interaction: Delivery Game */}
              {node.type === 'game' && node.content.game?.type === 'delivery' && (
                <div className="bg-morandi-bg p-4 rounded-xl border border-dashed border-morandi-primary">
                  <h3 className="font-bold text-morandi-text mb-4 text-center">Drag the Milk Tea to Her!</h3>
                  <div className="flex justify-between items-center h-32 px-4 relative">
                     {/* Boy */}
                     <div className="flex flex-col items-center">
                       <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl mb-1">👦</div>
                       <span className="text-xs text-gray-500">SJTU</span>
                     </div>
                     
                     {/* Draggable Item */}
                     {!deliveryStatus ? (
                       <motion.div 
                        drag 
                        dragConstraints={{ left: -50, right: 150, top: -50, bottom: 50 }}
                        dragElastic={0.2}
                        onDragEnd={(e, info) => {
                          // Simple distance check: if dragged far enough right
                          if (info.offset.x > 100) {
                            handleDeliveryComplete();
                          }
                        }}
                        className="cursor-grab active:cursor-grabbing z-10"
                       >
                         <div className="w-10 h-10 bg-morandi-accent rounded-full flex items-center justify-center shadow-lg text-white">
                           <ShoppingBag size={20} />
                         </div>
                       </motion.div>
                     ) : (
                       <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }}
                        className="text-morandi-sage font-bold flex items-center gap-1"
                       >
                         <CheckCircle size={16} /> Delivered!
                       </motion.div>
                     )}

                     {/* Girl */}
                     <div className="flex flex-col items-center">
                       <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-1 transition-colors ${deliveryStatus ? 'bg-morandi-accent' : 'bg-pink-100'}`}>
                         {deliveryStatus ? '😍' : '👧'}
                       </div>
                       <span className="text-xs text-gray-500">ECNU</span>
                     </div>
                  </div>
                </div>
              )}

              {/* Interaction: Story (Just read and continue) */}
              {node.type === 'story' && (
                <div className="flex justify-center mt-4">
                  <button 
                    onClick={handleStoryComplete}
                    className="bg-morandi-accent text-white px-6 py-2 rounded-full shadow-lg hover:bg-pink-400 transition-colors flex items-center gap-2"
                  >
                    <Heart size={16} fill="white" /> Remember This
                  </button>
                </div>
              )}

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InteractionModal;