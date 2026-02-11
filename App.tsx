import React, { useState, useEffect } from 'react';
import { NODES } from './constants';
import { LocationNode } from './types';
import TimelineMap from './components/TimelineMap';
import ProgressBar from './components/ProgressBar';
import MusicPlayer from './components/MusicPlayer';
import InteractionModal from './components/InteractionModal';
import EndingScene from './components/EndingScene';

const App: React.FC = () => {
  const [visitedNodes, setVisitedNodes] = useState<string[]>([]);
  const [activeNode, setActiveNode] = useState<LocationNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEnding, setShowEnding] = useState(false);

  // Calculate progress based on visited nodes count vs total unlockable nodes (excluding ending initially)
  const progress = Math.min(100, (visitedNodes.length / (NODES.length - 1)) * 100);

  const handleNodeClick = (node: LocationNode) => {
    if (node.type === 'ending') {
       if (visitedNodes.length >= NODES.length - 1) {
         setShowEnding(true);
       }
    } else {
      setActiveNode(node);
      setIsModalOpen(true);
    }
  };

  const handleInteractionComplete = (nodeId: string) => {
    if (!visitedNodes.includes(nodeId)) {
      setVisitedNodes(prev => [...prev, nodeId]);
    }
    // Close modal after short delay handled in component, or manually here
    setIsModalOpen(false);
    setActiveNode(null);
  };

  // Check if we should unlock the ending implicitly or if the user clicks it
  // In this design, the user clicks the ending node on the map.
  
  return (
    <div className="w-full h-screen font-sans text-morandi-text overflow-hidden selection:bg-morandi-accent selection:text-white">
      {/* UI Overlay */}
      <ProgressBar progress={progress} />
      <MusicPlayer />

      {/* Main Map */}
      <div className="w-full h-full">
        <TimelineMap 
          nodes={NODES} 
          visitedNodes={visitedNodes} 
          onNodeClick={handleNodeClick}
          updateProgress={() => {}} 
        />
      </div>

      {/* Modals */}
      <InteractionModal 
        isOpen={isModalOpen} 
        node={activeNode} 
        onClose={() => setIsModalOpen(false)}
        onComplete={handleInteractionComplete}
      />

      {/* Ending Scene Overlay */}
      {showEnding && <EndingScene isActive={showEnding} />}
    </div>
  );
};

export default App;