import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, Heart, Sparkles, Delete } from 'lucide-react';
import { romanticAudio } from '../utils/audio';
import { fireBirthdayConfetti, fireHeartConfetti } from '../utils/confetti';
import { DuduBubuHugSVG } from './DuduBubuStickers';

interface PasscodeGateProps {
  onUnlock: () => void;
  correctPasscode?: string;
}

export const PasscodeGate: React.FC<PasscodeGateProps> = ({
  onUnlock,
  correctPasscode = '1710'
}) => {
  const [pin, setPin] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleKeyPress = (num: string) => {
    if (pin.length >= 4 || isSuccess) return;
    const nextPin = pin + num;
    setPin(nextPin);
    romanticAudio.playHeartPop();

    if (nextPin.length === 4) {
      if (nextPin === correctPasscode) {
        setIsSuccess(true);
        romanticAudio.playChimeSuccess();
        fireHeartConfetti();
        setTimeout(() => {
          fireBirthdayConfetti();
          onUnlock();
        }, 800);
      } else {
        setIsError(true);
        romanticAudio.playWaxSealSound();
        setTimeout(() => {
          setPin('');
          setIsError(false);
        }, 900);
      }
    }
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      setPin(prev => prev.slice(0, -1));
      romanticAudio.playHeartPop();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-rose-100 via-pink-50 to-amber-50 p-4 select-none overflow-y-auto">
      {/* Ambient background glows */}
      <div className="absolute w-96 h-96 bg-rose-200/50 rounded-full blur-3xl -top-10 -left-10 pointer-events-none" />
      <div className="absolute w-96 h-96 bg-pink-200/40 rounded-full blur-3xl -bottom-10 -right-10 pointer-events-none" />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative max-w-sm w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 flex flex-col items-center text-center my-auto"
      >
        {/* Dudu & Bubu lock keeper */}
        <div className="mb-2">
          <DuduBubuHugSVG size={120} />
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-500 mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Secret 18th Birthday Vault</span>
        </div>

        <h2 className="font-romantic text-2xl font-bold text-stone-900 mb-1">
          Aditi's Birthday Passcode
        </h2>

        <p className="text-stone-500 text-xs mb-5">
          Enter your special birthday date to unlock Subhan's surprise (DDMM)
        </p>

        {/* 4-Digit Display Indicator with shake on error */}
        <motion.div
          animate={isError ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          {[0, 1, 2, 3].map((idx) => {
            const hasDigit = pin.length > idx;
            return (
              <div
                key={idx}
                className={`w-12 h-14 rounded-2xl flex items-center justify-center text-xl font-bold transition-all duration-200 ${
                  hasDigit
                    ? isSuccess
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-300'
                      : isError
                      ? 'bg-red-100 border-2 border-red-400 text-red-600'
                      : 'bg-rose-50 border-2 border-rose-300 text-rose-600'
                    : 'bg-stone-50 border border-stone-200 text-stone-300'
                }`}
              >
                {hasDigit ? (isSuccess ? '❤️' : '♥') : '·'}
              </div>
            );
          })}
        </motion.div>

        {/* Status message */}
        <div className="h-6 mb-4 flex items-center justify-center">
          {isSuccess ? (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-xs font-bold text-rose-600 flex items-center gap-1"
            >
              <Unlock className="w-3.5 h-3.5" />
              <span>Passcode Verified! Welcome, my Jaan! 🎉</span>
            </motion.span>
          ) : isError ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-semibold text-red-500"
            >
              Oops! That's not your birthday, Jaan! Try again 💕
            </motion.span>
          ) : (
            <span className="text-[11px] text-stone-400 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              <span>Hint: October 17th (1710)</span>
            </span>
          )}
        </div>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-2.5 w-full max-w-[240px]">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleKeyPress(digit)}
              className="h-12 rounded-2xl bg-stone-50 hover:bg-rose-50 hover:text-rose-600 active:scale-95 text-stone-800 text-lg font-semibold transition-all shadow-2xs border border-stone-100 flex items-center justify-center cursor-pointer"
            >
              {digit}
            </button>
          ))}
          <div className="flex items-center justify-center text-xs text-rose-400">
            💖
          </div>
          <button
            type="button"
            onClick={() => handleKeyPress('0')}
            className="h-12 rounded-2xl bg-stone-50 hover:bg-rose-50 hover:text-rose-600 active:scale-95 text-stone-800 text-lg font-semibold transition-all shadow-2xs border border-stone-100 flex items-center justify-center cursor-pointer"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="h-12 rounded-2xl bg-stone-50 hover:bg-red-50 hover:text-red-600 active:scale-95 text-stone-500 text-sm font-semibold transition-all shadow-2xs border border-stone-100 flex items-center justify-center cursor-pointer"
            title="Delete digit"
          >
            <Delete className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
