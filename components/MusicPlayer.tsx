import React, { useState } from 'react';
import { Music, Play, Pause, SkipForward } from 'lucide-react';
import { MUSIC_PLAYLIST } from '../constants';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % MUSIC_PLAYLIST.length);
    setIsPlaying(true);
  };

  const currentTrack = MUSIC_PLAYLIST[currentTrackIndex];

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-morandi-primary flex items-center gap-3 transition-all hover:scale-105">
      <div className={`w-10 h-10 rounded-full bg-morandi-accent flex items-center justify-center text-white ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>
        <Music size={18} />
      </div>
      <div className="flex flex-col max-w-[120px]">
        <span className="text-xs font-bold text-morandi-text truncate">{currentTrack.title}</span>
        <span className="text-[10px] text-gray-500 truncate">{currentTrack.artist}</span>
      </div>
      <div className="flex items-center gap-1">
        <button 
          onClick={togglePlay} 
          className="p-1.5 rounded-full hover:bg-morandi-primary/20 text-morandi-text transition-colors"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button 
          onClick={nextTrack}
          className="p-1.5 rounded-full hover:bg-morandi-primary/20 text-morandi-text transition-colors"
        >
          <SkipForward size={16} />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;