import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { LocationNode } from '../types';
import { Lock, MapPin, Star } from 'lucide-react';

interface TimelineMapProps {
  nodes: LocationNode[];
  visitedNodes: string[];
  onNodeClick: (node: LocationNode) => void;
  updateProgress: (val: number) => void;
}

const TimelineMap: React.FC<TimelineMapProps> = ({ nodes, visitedNodes, onNodeClick, updateProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });
  
  // Convert scroll progress to percentage (0-100)
  useEffect(() => {
    return scrollXProgress.onChange((latest) => {
      // We base progress on both scroll and unlocked nodes, 
      // but for the visual bar, let's use the visited count primarily in App.tsx.
      // This scroll listener is just for effects if needed.
    });
  }, [scrollXProgress]);

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full overflow-x-auto overflow-y-hidden hide-scrollbar bg-morandi-bg cursor-grab active:cursor-grabbing"
    >
      {/* Map Content Container - wider than screen */}
      <div className="relative min-w-[300vw] h-full flex items-center">
        
        {/* Decorative Path Line */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
          <path 
            d="M 0,50 Q 25,20 50,50 T 100,50 T 150,80 T 200,40" // Simplified wave
            fill="none" 
            stroke="#D4A5A5" 
            strokeWidth="4"
            strokeDasharray="10 10"
            className="w-full h-full"
            // Note: A real responsive SVG path would need more complex logic based on window width
            // For this demo, we use a simple dashed line concept via CSS or just absolute positioning dots
          />
           {/* Connecting lines between nodes simply */}
           {nodes.map((node, i) => {
             if (i === nodes.length - 1) return null;
             const next = nodes[i + 1];
             // This is a rough approximation for the line since we are using % positioning
             // In a real app, we'd calculate pixel coordinates.
             return null; 
           })}
        </svg>

        {/* Nodes */}
        {nodes.map((node) => {
          const isVisited = visitedNodes.includes(node.id);
          const isLocked = node.isLocked && !isVisited && visitedNodes.length < nodes.indexOf(node); 
          // Simple logic: locked if not visited and previous not visited? 
          // Actually, App.tsx handles unlocking logic. Here we just display 'locked' state visually.
          const effectivelyLocked = node.isLocked && !visitedNodes.includes(nodes[Math.max(0, nodes.indexOf(node) - 1)].id) && nodes.indexOf(node) > 0;

          return (
            <motion.div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 group"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + nodes.indexOf(node) * 0.1, type: "spring" }}
            >
              <button
                onClick={() => !effectivelyLocked && onNodeClick(node)}
                disabled={effectivelyLocked}
                className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300
                  ${isVisited 
                    ? 'bg-morandi-accent text-white scale-110' 
                    : effectivelyLocked 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-white text-morandi-accent hover:bg-morandi-primary/20 animate-bounce'
                  }
                `}
                style={{ animationDuration: '3s' }}
              >
                {effectivelyLocked ? (
                  <Lock size={24} />
                ) : node.type === 'ending' ? (
                  <Star size={28} fill={isVisited ? "white" : "none"} />
                ) : (
                  <MapPin size={28} fill={isVisited ? "currentColor" : "none"} />
                )}

                {/* Ripple effect for active next node */}
                {!effectivelyLocked && !isVisited && (
                  <span className="absolute inset-0 rounded-full bg-morandi-accent opacity-20 animate-ping"></span>
                )}
              </button>

              <div className={`px-3 py-1 bg-white/80 backdrop-blur-sm rounded-lg text-sm font-bold shadow-sm whitespace-nowrap
                ${effectivelyLocked ? 'text-gray-400' : 'text-morandi-text'}
              `}>
                {node.title}
              </div>
            </motion.div>
          );
        })}

        {/* Ending Area Decorations */}
        <div className="absolute left-[85%] top-[20%] opacity-50 pointer-events-none">
          <div className="w-64 h-64 bg-pink-200 rounded-full blur-3xl mix-blend-multiply filter"></div>
        </div>

      </div>
    </div>
  );
};

export default TimelineMap;