import React from 'react';
import { Sparkles, Edit3, Eye, Music } from 'lucide-react';

interface TopNavProps {
  girlfriendNickname: string;
  onOpenCustomize: () => void;
  isPresentMode: boolean;
  onTogglePresentMode: () => void;
  onToggleMusic: () => void;
  isMusicPlaying: boolean;
}

export const TopNav: React.FC<TopNavProps> = ({
  girlfriendNickname,
  onOpenCustomize,
  isPresentMode,
  onTogglePresentMode,
  onToggleMusic,
  isMusicPlaying,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-rose-100/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#"
          className="font-romantic text-lg sm:text-xl font-bold tracking-tight text-rose-950 whitespace-nowrap shrink-0 hover:text-rose-600 transition-colors flex items-center gap-2"
        >
          <span className="text-xl">🎂</span>
          <span>Happy Birthday, {girlfriendNickname || 'Bubu'}</span>
        </a>

        {/* Zone 2: 4-5 concise nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          <a href="#cake-ceremony" className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
            Cake Ceremony
          </a>
          <a href="#memories" className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
            Our Memories
          </a>
          <a href="#love-letter" className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
            Love Letter
          </a>
          <a href="#secret-letters" className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
            Open When
          </a>
          <a href="#coupons" className="hover:text-rose-600 transition-colors whitespace-nowrap shrink-0">
            Love Coupons
          </a>
        </nav>

        {/* Zone 3: 1 primary action area */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Music quick button */}
          <button
            type="button"
            onClick={onToggleMusic}
            title={isMusicPlaying ? "Mute romantic music" : "Play romantic music"}
            className={`p-2 rounded-full border transition-colors cursor-pointer ${
              isMusicPlaying
                ? 'bg-rose-50 text-rose-600 border-rose-200'
                : 'bg-stone-50 text-stone-400 border-stone-200 hover:text-stone-700'
            }`}
          >
            <Music className="w-4 h-4" />
          </button>

          {/* If in edit/customization mode, allow entering girlfriend present mode or opening customize */}
          {!isPresentMode ? (
            <button
              type="button"
              onClick={onOpenCustomize}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-rose-500 hover:bg-rose-600 active:scale-95 rounded-xl shadow-sm transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Customize Site</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onTogglePresentMode}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-100 hover:bg-rose-200 active:scale-95 rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer"
              title="Exit girlfriend present mode to edit photos & text"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Present Mode</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
