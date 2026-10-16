import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Cake, Compass, PhoneCall, Award, UploadCloud } from 'lucide-react';
import { BirthdayConfig, MemoryItem } from '../types';
import { fireHeartConfetti } from '../utils/confetti';
import { romanticAudio } from '../utils/audio';
import { DuduBubuHugSVG, BubuSweetFlowerSVG } from './DuduBubuStickers';

interface HeroSectionProps {
  config: BirthdayConfig;
  onOpenLetter: () => void;
  memories?: MemoryItem[];
  onUploadClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  onOpenLetter,
  memories = [],
  onUploadClick,
}) => {
  const [tapHeartCount, setTapHeartCount] = useState<number>(0);

  const handleHeroHeartClick = () => {
    setTapHeartCount((prev) => prev + 1);
    romanticAudio.playHeartPop();
    fireHeartConfetti();
  };

  // Find user's authentic uploaded photos
  const userPhotos = memories.filter(
    (m) =>
      m.url.startsWith('data:') ||
      m.url.startsWith('blob:') ||
      m.id.startsWith('mem-bulk') ||
      m.id.startsWith('mem-user')
  );

  const firstPhoto = userPhotos[0];
  const secondPhoto = userPhotos[1] || userPhotos[0];

  return (
    <section className="relative pt-6 pb-14 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* 2-Column Split: Typographic Hierarchy & Visual Anchor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        {/* Left Column: Typographic Hierarchy */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Unboxed clean metadata kicker */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-500 mb-3">
            <span>2 Years Long Distance Love</span>
            <span aria-hidden="true">·</span>
            <span>Aditi's 18th Birthday (17/10)</span>
            <span aria-hidden="true">·</span>
            <span>Subhan ❤️ Aditi</span>
          </div>

          <h1 className="font-romantic text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 leading-[1.15] tracking-tight mb-5 max-w-xl text-balance">
            Happy 18th Birthday to My Whole World,{' '}
            <span className="text-rose-500 underline decoration-rose-300 decoration-wavy decoration-2">
              {config.girlfriendName}
            </span>
          </h1>

          <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl mb-7">
            {config.heroSubtitle}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#cake-ceremony"
              className="px-6 py-3.5 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-sm font-semibold rounded-2xl shadow-md shadow-rose-500/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Cake className="w-4 h-4" />
              <span>Blow 18th Birthday Candles</span>
            </a>

            <button
              type="button"
              onClick={onOpenLetter}
              className="px-6 py-3.5 bg-white hover:bg-rose-50 active:scale-95 text-rose-700 text-sm font-semibold rounded-2xl border border-rose-200 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Read Long Distance Love Letter</span>
            </button>
          </div>

          {/* Interactive Kisses to Aditi across the miles */}
          <div className="mt-7 flex items-center gap-3 text-xs text-stone-500 bg-white/80 backdrop-blur-xs px-4 py-2.5 rounded-2xl border border-rose-100 shadow-2xs">
            <button
              onClick={handleHeroHeartClick}
              className="hover:scale-125 transition-transform text-rose-500 active:scale-90 cursor-pointer"
              title="Click to send virtual kisses across the distance"
            >
              💖
            </button>
            <span>
              Send virtual kisses across the miles to {config.girlfriendNickname || 'Aditi'} (
              <span className="font-mono font-bold text-rose-600 tabular-nums">{tapHeartCount}</span> sent today!)
            </span>
          </div>
        </div>

        {/* Right Column: Cute Dual Visual with Dudu Bubu 18th Birthday Art & Aditi's Polaroids */}
        <div className="lg:col-span-5 relative flex flex-col items-center">
          {/* Main 18th Birthday Cartoon Art */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] w-full group"
          >
            <img
              src="/src/assets/images/dudu_bubu_18th_birthday_1792162420500.jpg"
              alt="Dudu and Bubu 18th Birthday Celebration with Aditi"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between pointer-events-none">
              <div>
                <span className="text-xs font-medium text-rose-200">Subhan's Princess</span>
                <p className="font-romantic text-base font-bold">Happy 18th Birthday, {config.girlfriendName}!</p>
              </div>
              <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
                👑 Turning 18
              </span>
            </div>
          </motion.div>

          {/* Cute Floating Polaroid #1 */}
          <motion.div
            initial={{ rotate: -6, y: 15 }}
            animate={{ rotate: [-6, -4, -6], y: [15, 10, 15] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            onClick={onUploadClick}
            className="absolute -bottom-8 -left-6 bg-white p-2.5 pb-4 rounded-2xl shadow-xl border border-rose-200 max-w-[170px] z-20 hidden sm:block cursor-pointer hover:scale-105 transition-transform"
          >
            {/* Cute washi tape sticker */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 h-4 bg-rose-200/80 rounded-xs rotate-2 shadow-2xs" />
            <div className="rounded-xl overflow-hidden aspect-[3/4] bg-rose-50 mb-1.5 flex items-center justify-center">
              {firstPhoto ? (
                firstPhoto.type === 'video' ? (
                  <video src={firstPhoto.url} className="w-full h-full object-cover" muted />
                ) : (
                  <img
                    src={firstPhoto.url}
                    alt="Aditi"
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                <div className="p-3 text-center flex flex-col items-center">
                  <BubuSweetFlowerSVG size={50} />
                  <span className="text-[10px] text-rose-500 font-bold mt-1">📸 Photo #1</span>
                </div>
              )}
            </div>
            <p className="font-romantic text-xs font-bold text-center text-stone-800 truncate">
              {firstPhoto?.title || 'My Pretty Jaan ❤️'}
            </p>
          </motion.div>

          {/* Cute Floating Polaroid #2 */}
          <motion.div
            initial={{ rotate: 8, y: -10 }}
            animate={{ rotate: [8, 6, 8], y: [-10, -5, -10] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            onClick={onUploadClick}
            className="absolute -top-6 -right-5 bg-white p-2.5 pb-4 rounded-2xl shadow-xl border border-rose-200 max-w-[155px] z-20 hidden sm:block cursor-pointer hover:scale-105 transition-transform"
          >
            {/* Cute washi tape sticker */}
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 h-4 bg-amber-200/80 rounded-xs -rotate-2 shadow-2xs" />
            <div className="rounded-xl overflow-hidden aspect-[3/4] bg-rose-50 mb-1.5 flex items-center justify-center">
              {secondPhoto ? (
                secondPhoto.type === 'video' ? (
                  <video src={secondPhoto.url} className="w-full h-full object-cover" muted />
                ) : (
                  <img
                    src={secondPhoto.url}
                    alt="Aditi"
                    className="w-full h-full object-cover"
                  />
                )
              ) : (
                <div className="p-3 text-center flex flex-col items-center">
                  <DuduBubuHugSVG size={50} />
                  <span className="text-[10px] text-rose-500 font-bold mt-1">📸 Photo #2</span>
                </div>
              )}
            </div>
            <p className="font-romantic text-xs font-bold text-center text-stone-800 truncate">
              {secondPhoto?.title || 'Royal 18th Queen ✨'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* 2-Year Long Distance Relationship Milestones Strip */}
      <div className="mt-16 pt-8 border-t border-rose-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-rose-100 shadow-2xs">
            <div className="flex items-center justify-center gap-1.5 text-xs text-rose-500 font-semibold mb-1">
              <Award className="w-4 h-4" />
              <span>2 Years Together</span>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-stone-900 font-romantic">
              2 Years
            </p>
            <p className="text-[11px] text-stone-500 mt-1">730+ Days of true love</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-rose-100 shadow-2xs">
            <div className="flex items-center justify-center gap-1.5 text-xs text-rose-500 font-semibold mb-1">
              <Compass className="w-4 h-4" />
              <span>Long Distance</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-stone-900 font-romantic">
              Miles Apart
            </p>
            <p className="text-[11px] text-stone-500 mt-1">Never apart at heart</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-rose-100 shadow-2xs">
            <div className="flex items-center justify-center gap-1.5 text-xs text-rose-500 font-semibold mb-1">
              <PhoneCall className="w-4 h-4" />
              <span>12:42 AM Calls</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-stone-900 font-romantic">
              Every Night
            </p>
            <p className="text-[11px] text-stone-500 mt-1">Sleeping on FaceTime</p>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-rose-100 shadow-2xs">
            <div className="flex items-center justify-center gap-1.5 text-xs text-rose-500 font-semibold mb-1">
              <Heart className="w-4 h-4 fill-rose-500" />
              <span>Next Big Step</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-stone-900 font-romantic">
              Close Distance
            </p>
            <p className="text-[11px] text-stone-500 mt-1">Subhan & Aditi forever</p>
          </div>
        </div>
      </div>
    </section>
  );
};
