import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Heart, X, Sparkles, Sun, PartyPopper } from 'lucide-react';
import { SecretLetter } from '../types';
import { romanticAudio } from '../utils/audio';
import { fireHeartConfetti } from '../utils/confetti';

interface OpenWhenLettersProps {
  letters: SecretLetter[];
  girlfriendName: string;
}

export const OpenWhenLetters: React.FC<OpenWhenLettersProps> = ({ letters, girlfriendName }) => {
  const [activeLetter, setActiveLetter] = useState<SecretLetter | null>(null);

  const handleOpenLetter = (letter: SecretLetter) => {
    setActiveLetter(letter);
    romanticAudio.playWaxSealSound();
    fireHeartConfetti();
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-5 h-5 text-amber-500" />;
      case 'PartyPopper': return <PartyPopper className="w-5 h-5 text-pink-500" />;
      case 'Sparkle': return <Sparkles className="w-5 h-5 text-teal-500" />;
      default: return <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />;
    }
  };

  return (
    <section id="secret-letters" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-rose-500">
          Secret Keepsakes
        </span>
        <h2 className="font-romantic text-3xl sm:text-4xl font-bold text-stone-900 mt-1 mb-2">
          "Open When..." Letters
        </h2>
        <p className="text-stone-600 text-sm">
          A bundle of love letters for different moments, sealed with affection just for {girlfriendName}.
        </p>
      </div>

      {/* Grid of Envelope Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {letters.map((letter) => (
          <motion.div
            key={letter.id}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleOpenLetter(letter)}
            className="group relative bg-white rounded-3xl p-6 border border-rose-100 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
          >
            {/* Top icon and envelope preview */}
            <div>
              <div className="w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {getIcon(letter.icon)}
              </div>

              <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-600 block mb-1">
                {letter.subtitle}
              </span>

              <h3 className="font-romantic text-lg font-bold text-stone-900 mb-2 group-hover:text-rose-600 transition-colors">
                {letter.triggerTitle}
              </h3>

              <p className="text-stone-600 text-xs line-clamp-2 leading-relaxed">
                {letter.preview}
              </p>
            </div>

            {/* Tap to Unseal Bar */}
            <div className="mt-6 pt-3 border-t border-rose-50 flex items-center justify-between text-xs font-semibold text-rose-500 group-hover:text-rose-600">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>Tap to Unseal</span>
              </span>
              <span className="text-stone-400">→</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Open Letter Modal */}
      <AnimatePresence>
        {activeLetter && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setActiveLetter(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-amber-50/95 border-4 border-white rounded-3xl p-6 sm:p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-rose-200/60 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  {getIcon(activeLetter.icon)}
                  <h3 className="font-romantic text-xl font-bold text-stone-900">
                    {activeLetter.triggerTitle}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveLetter(null)}
                  className="p-1 rounded-full hover:bg-stone-200/60 text-stone-500 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="font-romantic text-stone-800 text-sm sm:text-base leading-relaxed whitespace-pre-line my-4 font-normal">
                {activeLetter.content}
              </div>

              <div className="mt-6 pt-4 border-t border-rose-200/60 flex items-center justify-between text-xs text-stone-500">
                <span>Keep this close to your heart 💕</span>
                <button
                  onClick={() => setActiveLetter(null)}
                  className="px-4 py-1.5 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-semibold rounded-xl text-xs cursor-pointer shadow-xs"
                >
                  Close Letter
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
