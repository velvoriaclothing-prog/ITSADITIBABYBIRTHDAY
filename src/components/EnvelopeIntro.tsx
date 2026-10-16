import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { romanticAudio } from '../utils/audio';
import { fireBirthdayConfetti, fireHeartConfetti } from '../utils/confetti';
import { DuduBubuHugSVG } from './DuduBubuStickers';

interface EnvelopeIntroProps {
  recipientName: string;
  senderName: string;
  onOpen: () => void;
}

export const EnvelopeIntro: React.FC<EnvelopeIntroProps> = ({
  recipientName,
  senderName,
  onOpen
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [sealCracked, setSealCracked] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpening) return;
    setIsOpening(true);
    romanticAudio.playWaxSealSound();
    setSealCracked(true);

    setTimeout(() => {
      fireHeartConfetti();
      romanticAudio.playChimeSuccess();
      romanticAudio.startBackgroundMelody();
    }, 450);

    setTimeout(() => {
      fireBirthdayConfetti();
      onOpen();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-rose-100 via-pink-50 to-amber-50/70 p-4 sm:p-6 overflow-hidden">
      {/* Background ambient glowing circles */}
      <div className="absolute w-[500px] h-[500px] bg-rose-200/40 rounded-full blur-3xl -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-3xl -bottom-20 -right-20 pointer-events-none" />

      <div className="relative max-w-lg w-full flex flex-col items-center text-center">
        {/* Adorable Dudu & Bubu preview */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <DuduBubuHugSVG size={140} />
        </motion.div>

        {/* Envelope Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-100 flex flex-col items-center"
        >
          <span className="text-xs uppercase tracking-widest text-rose-400 font-semibold mb-1">
            Special Birthday Delivery · Only For You
          </span>
          <h1 className="font-romantic text-2xl sm:text-3xl text-stone-900 font-bold mb-2">
            Dearest {recipientName || 'Bubu'}
          </h1>
          <p className="text-stone-600 text-sm max-w-sm mb-6 leading-relaxed">
            {senderName || 'Dudu'} made something special just for your birthday. Tap the wax seal below to unwrap your celebration wonderland.
          </p>

          {/* Interactive Wax Seal */}
          <div className="relative my-2">
            <motion.button
              type="button"
              onClick={handleOpenEnvelope}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center cursor-pointer transition-all duration-300 shadow-lg ${
                sealCracked
                  ? 'bg-rose-700 shadow-rose-900/40 rotate-12 scale-110'
                  : 'bg-gradient-to-br from-rose-500 via-rose-600 to-red-700 shadow-rose-500/40 hover:shadow-rose-500/60'
              }`}
            >
              {/* Gold rim effect */}
              <div className="absolute inset-1 rounded-full border border-amber-300/40 pointer-events-none" />

              <span className="text-2xl mb-0.5">💌</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-rose-100">
                {sealCracked ? 'OPENING...' : 'OPEN'}
              </span>
            </motion.button>

            {/* Pulsing ring indicator */}
            {!sealCracked && (
              <span className="absolute inset-0 rounded-full border-2 border-rose-400 animate-ping opacity-30 pointer-events-none" />
            )}
          </div>

          <span className="text-xs text-rose-600/80 mt-5 font-medium flex items-center gap-1.5">
            <span>✨</span>
            <span>Tap seal to begin with romantic music</span>
            <span>✨</span>
          </span>
        </motion.div>

        {/* Quick direct skip */}
        <button
          onClick={handleOpenEnvelope}
          className="mt-4 text-xs text-stone-600 hover:text-stone-800 underline transition-colors cursor-pointer"
        >
          Skip intro & enter website directly
        </button>
      </div>
    </div>
  );
};
