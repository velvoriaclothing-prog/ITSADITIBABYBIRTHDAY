import React from 'react';
import { Heart } from 'lucide-react';
import { BirthdayConfig } from '../types';
import { DuduBubuHugSVG } from './DuduBubuStickers';

interface FooterSectionProps {
  config: BirthdayConfig;
  onOpenLetter: () => void;
  onOpenCustomize: () => void;
  isPresentMode: boolean;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  config,
  onOpenLetter,
  onOpenCustomize,
  isPresentMode
}) => {
  return (
    <footer className="mt-20 border-t border-rose-100 bg-white/60 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <DuduBubuHugSVG size={100} className="mb-4" />

        <h3 className="font-romantic text-2xl font-bold text-stone-900 mb-2">
          Happy Birthday, My Beloved {config.girlfriendName}
        </h3>

        <p className="text-stone-600 text-xs sm:text-sm max-w-md leading-relaxed mb-6">
          Every memory we make is my favorite treasure. Thank you for being the sunshine in my life.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-stone-600 mb-6">
          <button
            onClick={onOpenLetter}
            className="hover:text-rose-600 underline cursor-pointer"
          >
            Read Love Letter
          </button>
          <span aria-hidden="true">·</span>
          <a href="#cake-ceremony" className="hover:text-rose-600 underline">
            Birthday Cake Ceremony
          </a>
          <span aria-hidden="true">·</span>
          <a href="#memories" className="hover:text-rose-600 underline">
            Photo & Video Gallery
          </a>
          {!isPresentMode && (
            <>
              <span aria-hidden="true">·</span>
              <button
                onClick={onOpenCustomize}
                className="text-rose-600 hover:text-rose-700 underline font-semibold cursor-pointer"
              >
                Customize Site
              </button>
            </>
          )}
        </div>

        <div className="text-[11px] text-stone-600 flex items-center gap-1.5">
          <span>Crafted with endless love by {config.boyfriendName} for {config.girlfriendName}</span>
          <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
        </div>
      </div>
    </footer>
  );
};
