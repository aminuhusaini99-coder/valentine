export type NodeType = 'story' | 'quiz' | 'game' | 'ending';

export interface LocationNode {
  id: string;
  title: string;
  x: number; // Percentage position on X axis for map
  y: number; // Percentage position on Y axis for map
  type: NodeType;
  isLocked: boolean;
  content: {
    description: string;
    image?: string;
    quiz?: {
      question: string;
      options: string[];
      correctIndex: number;
    };
    game?: {
      type: 'delivery';
      target: string;
    };
  };
}

export interface GameState {
  visitedNodes: string[];
  currentLocationId: string | null;
  isModalOpen: boolean;
  isMusicPlaying: boolean;
  gameCompleted: boolean;
}