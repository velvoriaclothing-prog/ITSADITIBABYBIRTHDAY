import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, RotateCcw } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { fireBirthdayConfetti, fireHeartConfetti } from '../utils/confetti';
import { DuduBubuHugSVG, BubuSweetFlowerSVG } from './DuduBubuStickers';

interface CakeCeremonyProps {
  girlfriendName: string;
  turningAge: number;
}

export const CakeCeremony: React.FC<CakeCeremonyProps> = ({ girlfriendName, turningAge }) => {
  // 3 candles state
  const [candlesLit, setCandlesLit] = useState<[boolean, boolean, boolean]>([true, true, true]);
  const [isCakeCut, setIsCakeCut] = useState<boolean>(false);
  const [wishMade, setWishMade] = useState<boolean>(false);

  const areAllCandlesOut = !candlesLit[0] && !candlesLit[1] && !candlesLit[2];

  const handleBlowSingleCandle = (index: number) => {
    if (!candlesLit[index]) return;
    romanticAudio.playCandleBlowSound();
    const nextLit = [...candlesLit] as [boolean, boolean, boolean];
    nextLit[index] = false;
    setCandlesLit(nextLit);

    if (nextLit.every(lit => !lit)) {
      setWishMade(true);
      fireHeartConfetti();
      romanticAudio.playChimeSuccess();
    }
  };

  const handleBlowAllCandles = () => {
    romanticAudio.playCandleBlowSound();
    setCandlesLit([false, false, false]);
    setWishMade(true);
    setTimeout(() => {
      fireHeartConfetti();
      romanticAudio.playChimeSuccess();
    }, 200);
  };

  const handleCutCake = () => {
    if (isCakeCut) return;
    setIsCakeCut(true);
    romanticAudio.playHeartPop();
    fireBirthdayConfetti();
    setTimeout(() => {
      romanticAudio.playChimeSuccess();
    }, 400);
  };

  const handleResetCeremony = () => {
    setCandlesLit([true, true, true]);
    setIsCakeCut(false);
    setWishMade(false);
  };

  return (
    <section id="cake-ceremony" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-xl relative overflow-hidden">
        {/* Subtle decorative background circle */}
        <div className="absolute -right-24 -top-24 w-80 h-80 bg-rose-100/50 rounded-full blur-2xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-500">
            Interactive Birthday Ceremony
          </span>
          <h2 className="font-romantic text-3xl sm:text-4xl font-bold text-stone-900 mt-1 mb-3">
            Blow the Candles & Cut Your Cake
          </h2>
          <p className="text-stone-600 text-sm">
            Close your eyes, make the sweetest wish in your heart, blow out the candles, and cut a slice of your birthday cake!
          </p>
        </div>

        {/* Cake Stage */}
        <div className="flex flex-col items-center justify-center my-4">
          <div className="relative w-72 sm:w-80 h-72 flex flex-col items-center justify-end select-none">
            {/* Cut slice animation */}
            <AnimatePresence>
              {isCakeCut && (
                <motion.div
                  initial={{ x: 0, y: 0, opacity: 0 }}
                  animate={{ x: 75, y: -20, rotate: 12, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="absolute z-20 top-20 right-4"
                >
                  <div className="bg-rose-100 border-2 border-rose-300 rounded-lg p-2 shadow-xl flex flex-col items-center text-center">
                    <span className="text-2xl">🍰</span>
                    <span className="text-[10px] font-bold text-rose-700 whitespace-nowrap">For {girlfriendName}!</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SVG Interactive Tiered Birthday Cake */}
            <svg width="280" height="240" viewBox="0 0 280 240" fill="none" className="filter drop-shadow-md">
              {/* Stand */}
              <ellipse cx="140" cy="225" rx="100" ry="12" fill="#E2E8F0" />
              <path d="M125 210 L155 210 L160 225 L120 225 Z" fill="#CBD5E1" />
              <ellipse cx="140" cy="210" rx="90" ry="10" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2" />

              {/* Bottom Tier (Pink Strawberry Layer) */}
              <rect x="55" y="160" width="170" height="48" rx="8" fill="#FFCCD5" />
              {/* Layer frosting cream */}
              <path d="M55 172 Q70 185 85 172 Q100 185 115 172 Q130 185 145 172 Q160 185 205 172 Q215 185 225 172 L225 160 L55 160 Z" fill="#FFF0F3" />
              {/* Cute strawberry decorations */}
              <circle cx="75" cy="188" r="4" fill="#FF4D6D" />
              <circle cx="115" cy="188" r="4" fill="#FF4D6D" />
              <circle cx="140" cy="188" r="4" fill="#FF4D6D" />
              <circle cx="165" cy="188" r="4" fill="#FF4D6D" />
              <circle cx="205" cy="188" r="4" fill="#FF4D6D" />

              {/* Top Tier (Vanilla / Cream Layer) */}
              <rect x="80" y="112" width="120" height="48" rx="6" fill="#FFF0F5" stroke="#FFE5EC" strokeWidth="1" />
              <path d="M80 124 Q95 135 110 124 Q125 135 140 124 Q155 135 170 124 Q185 135 200 124 L200 112 L80 112 Z" fill="#FFB3C1" />

              {/* Little strawberries on top */}
              <path d="M96 112 C96 106, 92 102, 88 106 C84 112, 96 118, 96 118 C96 118, 108 112, 104 106 C100 102, 96 106, 96 112 Z" fill="#E63946" />
              <path d="M140 112 C140 106, 136 102, 132 106 C128 112, 140 118, 140 118 C140 118, 152 112, 148 106 C144 102, 140 106, 140 112 Z" fill="#E63946" />
              <path d="M184 112 C184 106, 180 102, 176 106 C172 112, 184 118, 184 118 C184 118, 196 112, 192 106 C188 102, 184 106, 184 112 Z" fill="#E63946" />

              {/* 18th Birthday Golden Badge Plaque on Cake */}
              <rect x="112" y="132" width="56" height="20" rx="4" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="1.5" />
              <text x="140" y="146" textAnchor="middle" fill="#B45309" fontSize="11" fontWeight="bold" fontFamily="sans-serif">
                18th Sweet
              </text>

              {/* CANDLE 1 (Left) */}
              <rect x="108" y="75" width="6" height="35" rx="2" fill="#A0C4FF" />
              <path d="M108 82 L114 85 M108 92 L114 95 M108 102 L114 105" stroke="#FFFFFF" strokeWidth="1.5" />
              {/* Candle 1 Wick */}
              <line x1="111" y1="75" x2="111" y2="70" stroke="#475569" strokeWidth="1.5" />

              {/* CANDLE 2 (Center - Golden 18 Candle) */}
              <rect x="137" y="68" width="6" height="42" rx="2" fill="#F59E0B" />
              <path d="M137 76 L143 79 M137 86 L143 89 M137 96 L143 99" stroke="#FEF3C7" strokeWidth="1.5" />
              {/* Golden 18 Emblem */}
              <circle cx="140" cy="85" r="9" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
              <text x="140" y="89" textAnchor="middle" fill="#92400E" fontSize="9" fontWeight="bold" fontFamily="sans-serif">
                18
              </text>
              {/* Candle 2 Wick */}
              <line x1="140" y1="68" x2="140" y2="62" stroke="#475569" strokeWidth="1.5" />

              {/* CANDLE 3 (Right) */}
              <rect x="166" y="75" width="6" height="35" rx="2" fill="#B9FBC0" />
              <path d="M166 82 L172 85 M166 92 L172 95 M166 102 L172 105" stroke="#FFFFFF" strokeWidth="1.5" />
              {/* Candle 3 Wick */}
              <line x1="169" y1="75" x2="169" y2="70" stroke="#475569" strokeWidth="1.5" />
            </svg>

            {/* CANDLE FLAMES (Absolute positioned interactive overlays) */}
            {/* Flame 1 */}
            <div
              onClick={() => handleBlowSingleCandle(0)}
              className="absolute left-[38%] top-[56px] -translate-x-1/2 cursor-pointer z-10"
              title="Click to blow out candle"
            >
              <AnimatePresence>
                {candlesLit[0] ? (
                  <motion.div
                    animate={{ scale: [1, 1.15, 0.9, 1], y: [0, -2, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative flex items-center justify-center"
                  >
                    <div className="w-4 h-6 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full blur-[0.5px] shadow-sm shadow-amber-400" />
                    <div className="absolute w-2 h-3 bg-white rounded-full bottom-0.5" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0.8, y: 0 }}
                    animate={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.8 }}
                    className="text-stone-400 text-xs"
                  >
                    💨
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Flame 2 (Center) */}
            <div
              onClick={() => handleBlowSingleCandle(1)}
              className="absolute left-[50%] top-[48px] -translate-x-1/2 cursor-pointer z-10"
              title="Click to blow out candle"
            >
              <AnimatePresence>
                {candlesLit[1] ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 0.95, 1], y: [0, -3, 0] }}
                    transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative flex items-center justify-center"
                  >
                    <div className="w-4 h-7 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full blur-[0.5px] shadow-sm shadow-amber-400" />
                    <div className="absolute w-2 h-3.5 bg-white rounded-full bottom-0.5" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0.8, y: 0 }}
                    animate={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.8 }}
                    className="text-stone-400 text-xs"
                  >
                    💨
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Flame 3 */}
            <div
              onClick={() => handleBlowSingleCandle(2)}
              className="absolute left-[62%] top-[56px] -translate-x-1/2 cursor-pointer z-10"
              title="Click to blow out candle"
            >
              <AnimatePresence>
                {candlesLit[2] ? (
                  <motion.div
                    animate={{ scale: [1, 1.15, 0.9, 1], y: [0, -2, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative flex items-center justify-center"
                  >
                    <div className="w-4 h-6 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full blur-[0.5px] shadow-sm shadow-amber-400" />
                    <div className="absolute w-2 h-3 bg-white rounded-full bottom-0.5" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0.8, y: 0 }}
                    animate={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.8 }}
                    className="text-stone-400 text-xs"
                  >
                    💨
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Status Prompt & Interactive Controls */}
        <div className="flex flex-col items-center justify-center text-center mt-4">
          <AnimatePresence mode="wait">
            {!areAllCandlesOut ? (
              <motion.div
                key="candles-lit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-3"
              >
                <p className="text-sm font-medium text-stone-700">
                  ✨ Make a wish for your {turningAge}th year, then tap below or click each candle flame!
                </p>
                <button
                  type="button"
                  onClick={handleBlowAllCandles}
                  className="px-6 py-2.5 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-semibold text-sm rounded-xl shadow-md shadow-rose-400/30 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>🌬️</span>
                  <span>Blow Out All Candles</span>
                </button>
              </motion.div>
            ) : !isCakeCut ? (
              <motion.div
                key="cut-cake-prompt"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="bg-rose-50 text-rose-700 px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-rose-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Your birthday wish has been locked in the stars! ⭐</span>
                </div>
                <button
                  type="button"
                  onClick={handleCutCake}
                  className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 active:scale-95 text-white font-bold text-sm rounded-2xl shadow-lg shadow-rose-500/30 transition-all flex items-center gap-2 cursor-pointer animate-pulse-gentle"
                >
                  <span>🔪</span>
                  <span>Cut Your Birthday Cake</span>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="cake-cut-complete"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center gap-4 bg-rose-50/70 p-6 rounded-2xl border border-rose-200 max-w-lg"
              >
                <div className="flex items-center gap-4">
                  <DuduBubuHugSVG size={90} />
                  <div className="text-left">
                    <h3 className="font-romantic text-xl font-bold text-rose-950">
                      Happy Birthday, My Sweetest Girl!
                    </h3>
                    <p className="text-xs text-stone-600 mt-1">
                      May every day of your new age be filled with delicious treats, peaceful happiness, and endless warm love.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleResetCeremony}
                  className="text-xs text-stone-600 hover:text-stone-800 flex items-center gap-1.5 underline cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Relive the candle & cake ceremony</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
