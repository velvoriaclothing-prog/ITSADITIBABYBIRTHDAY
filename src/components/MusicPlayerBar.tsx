import React from 'react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';

interface MusicPlayerBarProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  girlfriendNickname: string;
}

export const MusicPlayerBar: React.FC<MusicPlayerBarProps> = ({
  isPlaying,
  onTogglePlay,
  girlfriendNickname
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="bg-white/95 backdrop-blur-md border border-rose-200/80 rounded-full px-4 py-2.5 shadow-lg flex items-center gap-3">
        {/* Animated equalizer waves when playing */}
        <div className="flex items-end gap-0.5 h-4 w-5">
          <span
            className={`w-1 bg-rose-400 rounded-full transition-all ${
              isPlaying ? 'animate-[bounce_0.8s_ease-in-out_infinite] h-3.5' : 'h-1.5'
            }`}
          />
          <span
            className={`w-1 bg-rose-500 rounded-full transition-all ${
              isPlaying ? 'animate-[bounce_0.6s_ease-in-out_infinite_0.2s] h-4' : 'h-2'
            }`}
          />
          <span
            className={`w-1 bg-rose-400 rounded-full transition-all ${
              isPlaying ? 'animate-[bounce_0.9s_ease-in-out_infinite_0.4s] h-3' : 'h-1.5'
            }`}
          />
        </div>

        <div className="text-left hidden sm:block">
          <p className="text-[11px] font-semibold text-stone-800 leading-tight">
            Romantic Music Box
          </p>
          <p className="text-[10px] text-stone-600">
            For {girlfriendNickname || 'Bubu'}
          </p>
        </div>

        <button
          type="button"
          onClick={onTogglePlay}
          className="p-1.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
          title={isPlaying ? "Mute music" : "Play music"}
        >
          {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
