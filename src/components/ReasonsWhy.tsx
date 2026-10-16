import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { fireHeartConfetti } from '../utils/confetti';
import { BubuSweetFlowerSVG, DuduBubuHugSVG } from './DuduBubuStickers';

interface ReasonsWhyProps {
  reasons: string[];
  girlfriendName: string;
}

export const ReasonsWhy: React.FC<ReasonsWhyProps> = ({ reasons, girlfriendName }) => {
  const [revealedIndices, setRevealedIndices] = useState<number[]>([0, 1]); // first two revealed by default

  const handleReveal = (idx: number) => {
    if (revealedIndices.includes(idx)) return;
    romanticAudio.playHeartPop();
    setRevealedIndices(prev => [...prev, idx]);
    if (revealedIndices.length + 1 === reasons.length) {
      fireHeartConfetti();
      romanticAudio.playChimeSuccess();
    }
  };

  const handleRevealAll = () => {
    romanticAudio.playChimeSuccess();
    fireHeartConfetti();
    setRevealedIndices(reasons.map((_, i) => i));
  };

  return (
    <section id="reasons" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-500">
            A Million Little Details
          </span>
          <h2 className="font-romantic text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
            Reasons Why I Love You
          </h2>
          <p className="text-stone-600 text-sm mt-1">
            Tap each card to unlock one more thing that makes you the center of my world.
          </p>
        </div>

        <button
          onClick={handleRevealAll}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 px-3.5 py-2 rounded-xl border border-rose-200 transition-colors self-start sm:self-auto cursor-pointer"
        >
          Reveal All Reasons ✨
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {reasons.map((reason, idx) => {
          const isRevealed = revealedIndices.includes(idx);

          return (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleReveal(idx)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer min-h-[140px] flex flex-col justify-between select-none ${
                isRevealed
                  ? 'bg-white border-rose-200 shadow-sm'
                  : 'bg-rose-100/40 border-dashed border-rose-300 hover:bg-rose-100/70'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono font-bold text-rose-400">
                  #{String(idx + 1).padStart(2, '0')}
                </span>
                {isRevealed ? (
                  <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-rose-300" />
                )}
              </div>

              {isRevealed ? (
                <motion.p
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="font-romantic text-stone-800 text-sm leading-relaxed"
                >
                  "{reason}"
                </motion.p>
              ) : (
                <div className="flex flex-col items-center justify-center my-auto py-2 text-center text-rose-400">
                  <span className="text-xl mb-1">🎁</span>
                  <span className="text-[11px] font-semibold">Tap to reveal</span>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between text-[10px] text-stone-600">
                <span>{isRevealed ? 'Unlocked with love' : 'Mystery note'}</span>
                {isRevealed && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sweet celebratory note when all revealed */}
      {revealedIndices.length === reasons.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-4 bg-rose-50 rounded-2xl border border-rose-200 text-center text-rose-800 text-xs font-medium"
        >
          💖 And there are a million more reasons that words can never hold. Happy Birthday, my love!
        </motion.div>
      )}
    </section>
  );
};
