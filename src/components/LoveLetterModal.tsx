import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Sparkles, Check } from 'lucide-react';
import { BirthdayConfig } from '../types';
import { DuduBubuHugSVG } from './DuduBubuStickers';

interface LoveLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BirthdayConfig;
}

export const LoveLetterModal: React.FC<LoveLetterModalProps> = ({
  isOpen,
  onClose,
  config
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-2xl w-full bg-amber-50/95 border-8 border-white rounded-3xl p-6 sm:p-10 shadow-2xl my-8 text-stone-800"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-stone-200/60 text-stone-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with Dudu & Bubu hug */}
        <div className="flex flex-col items-center text-center border-b border-rose-200/60 pb-6 mb-6">
          <DuduBubuHugSVG size={120} />
          <span className="text-xs uppercase tracking-widest text-rose-500 font-semibold mt-2">
            An Eternal Birthday Promise
          </span>
          <h2 className="font-romantic text-3xl font-bold text-stone-900 mt-1">
            To My Precious {config.girlfriendName}
          </h2>
          <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
            <span>Written with all my heart</span>
            <span aria-hidden="true">·</span>
            <span>By {config.boyfriendName}</span>
          </div>
        </div>

        {/* Letter Body in elegant romantic handwritten style */}
        <div className="prose prose-stone max-w-none text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line font-romantic font-normal">
          {config.mainLoveLetter}
        </div>

        {/* Romantic Promises / Vows */}
        {config.romanticVows && config.romanticVows.length > 0 && (
          <div className="mt-8 pt-6 border-t border-rose-200/60">
            <h4 className="font-semibold text-xs uppercase tracking-wider text-rose-600 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>My Birthday Promises to You</span>
            </h4>
            <div className="space-y-2.5">
              {config.romanticVows.map((vow, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                  <div className="w-4 h-4 rounded-full bg-rose-200/80 text-rose-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{vow}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer sign off */}
        <div className="mt-8 pt-6 border-t border-rose-200/60 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1.5 text-rose-500 font-semibold">
            <Heart className="w-4 h-4 fill-rose-500" />
            <span>Forever yours, Dudu & Bubu</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-medium rounded-xl shadow-xs transition-all cursor-pointer"
          >
            Keep in My Heart
          </button>
        </div>
      </motion.div>
    </div>
  );
};
