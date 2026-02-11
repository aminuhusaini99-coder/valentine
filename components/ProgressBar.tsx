import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number; // 0 to 100
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="fixed top-0 left-0 w-full z-40 px-4 py-4 pointer-events-none">
      <div className="relative w-full h-2 bg-morandi-primary/30 rounded-full overflow-visible">
        {/* Fill */}
        <motion.div 
          className="absolute top-0 left-0 h-full bg-morandi-accent rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, type: "spring" }}
        />
        
        {/* Train Icon */}
        <motion.div 
          className="absolute top-1/2 -mt-4"
          initial={{ left: '0%' }}
          animate={{ left: `${progress}%` }}
          transition={{ duration: 1, type: "spring" }}
        >
          <div className="relative -left-4 bg-white p-1 rounded-full shadow-md border border-morandi-accent">
            {/* Simple SVG Train */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4A5A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="12" rx="2" />
              <line x1="6" y1="17" x2="6" y2="21" />
              <line x1="18" y1="17" x2="18" y2="21" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <circle cx="6" cy="12" r="1" fill="#D4A5A5" stroke="none" />
              <circle cx="18" cy="12" r="1" fill="#D4A5A5" stroke="none" />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;