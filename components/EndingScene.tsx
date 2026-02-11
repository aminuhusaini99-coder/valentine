import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThreeHeart from './ThreeHeart';
import { X } from 'lucide-react';

const ConfessionLetter: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <motion.div
    className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <motion.div
      className="relative bg-[#fffbf0] w-full max-w-2xl h-[80vh] overflow-y-auto rounded-lg shadow-2xl p-8 md:p-12 border-2 border-[#e6d0c3]"
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
       <button onClick={onClose} className="absolute top-4 right-4 text-morandi-text hover:text-red-400">
         <X size={24} />
       </button>
       
       <div className="font-serif text-morandi-text space-y-6 text-center">
         <h2 className="text-3xl font-bold mb-8">致我最爱的你</h2>
         
         <p className="leading-loose text-lg">
           亲爱的，<br/><br/>
           当你看到这封信的时候，我们已经在“治愈旅程”里重温了那么多美好的瞬间。
           从华师大到交大，从第一次羞涩的约会到迪士尼绚烂的烟花，每一步都因为有你而变得闪闪发光。
         </p>
         
         <p className="leading-loose text-lg">
           这个小小的网页，是我为你准备的情人节惊喜。它不仅仅是代码的堆砌，更是我心里一点一滴的爱意。
           我想把我们的回忆具象化，想让你知道，无论未来怎样，我都想和你一起，去探索更多未知的地图。
         </p>
         
         <p className="leading-loose text-lg">
           虽然生活有时会有烦恼，但只要想到你，我就觉得被治愈了。
           你就是我生活中最温暖的那个“Hook”。
         </p>

         <p className="mt-12 font-bold text-xl">
           情人节快乐！我爱你！
         </p>

         <div className="mt-12 flex justify-center">
           <div className="w-64 h-40 bg-gray-200 rounded-lg shadow-inner flex items-center justify-center text-gray-400 text-sm overflow-hidden">
             {/* Placeholder for group photo */}
             <img src="https://picsum.photos/400/300?grayscale" alt="Us" className="w-full h-full object-cover opacity-80" />
           </div>
         </div>
       </div>
    </motion.div>
  </motion.div>
);

const EndingScene: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const [showLetter, setShowLetter] = useState(false);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 bg-morandi-bg flex flex-col items-center justify-center">
      {/* Background Fireworks Effect (CSS-based simple particles for demo) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-4 h-4 bg-red-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-75 delay-300"></div>
        <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-pink-400 rounded-full animate-ping opacity-75 delay-700"></div>
      </div>

      <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
        <h1 className="absolute top-10 w-full text-center text-3xl font-serif text-morandi-text animate-pulse z-10">
          点击爱心
        </h1>
        <ThreeHeart onClick={() => setShowLetter(true)} />
      </div>

      <AnimatePresence>
        {showLetter && <ConfessionLetter onClose={() => setShowLetter(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default EndingScene;