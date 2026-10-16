import React, { useState } from 'react';
import { motion } from 'motion/react';
import { romanticAudio } from '../utils/audio';

interface StickerProps {
  className?: string;
  size?: number;
  onClick?: () => void;
  showCaption?: boolean;
}

/**
 * Animated SVG of White Bear Bubu & Brown Bear Dudu hugging with floating hearts
 */
export const DuduBubuHugSVG: React.FC<StickerProps> = ({ className = '', size = 180, onClick }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    romanticAudio.playHeartPop();
    if (onClick) onClick();
    setTimeout(() => setClicked(false), 800);
  };

  return (
    <div
      onClick={handleClick}
      className={`relative inline-block cursor-pointer select-none group ${className}`}
      title="Click Bubu & Dudu for love!"
    >
      <motion.div
        animate={clicked ? { scale: [1, 1.15, 0.95, 1] } : { y: [0, -4, 0] }}
        transition={{ duration: clicked ? 0.4 : 3, repeat: clicked ? 0 : Infinity, ease: 'easeInOut' }}
        className="relative"
      >
        <svg
          width={size}
          height={size * 0.85}
          viewBox="0 0 200 170"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm filter"
        >
          {/* Shadow */}
          <ellipse cx="100" cy="158" rx="75" ry="10" fill="#000000" fillOpacity="0.06" />

          {/* DUDU (Brown Bear - Right) */}
          <g id="dudu">
            {/* Body */}
            <path
              d="M105 75 C105 50, 165 50, 165 75 C165 110, 175 145, 145 152 C120 152, 105 135, 105 75 Z"
              fill="#A27B5C"
            />
            {/* Ears */}
            <circle cx="120" cy="52" r="14" fill="#A27B5C" />
            <circle cx="120" cy="52" r="8" fill="#DCD7C9" />
            <circle cx="162" cy="58" r="14" fill="#A27B5C" />
            <circle cx="162" cy="58" r="8" fill="#DCD7C9" />

            {/* Dudu Head */}
            <ellipse cx="138" cy="85" rx="32" ry="28" fill="#A27B5C" />
            {/* Snout */}
            <ellipse cx="130" cy="94" rx="14" ry="11" fill="#E8D8C8" />
            <ellipse cx="128" cy="90" rx="5" ry="3.5" fill="#3F2E23" />
            {/* Smile */}
            <path d="M125 94 Q128 98 132 94" stroke="#3F2E23" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Eyes (happy curves) */}
            <path d="M120 80 Q124 76 128 80" stroke="#3F2E23" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M142 82 Q146 78 150 82" stroke="#3F2E23" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Blush */}
            <ellipse cx="118" cy="88" rx="6" ry="4" fill="#E28787" fillOpacity="0.6" />
            <ellipse cx="152" cy="90" rx="6" ry="4" fill="#E28787" fillOpacity="0.6" />
            {/* Arm hugging Bubu */}
            <path
              d="M125 105 C100 105, 80 115, 85 125 C90 135, 120 125, 130 120 Z"
              fill="#8F6B4F"
            />
          </g>

          {/* BUBU (White Bear - Left) */}
          <g id="bubu">
            {/* Body */}
            <path
              d="M45 75 C45 50, 105 50, 105 75 C105 135, 90 152, 65 152 C35 145, 45 110, 45 75 Z"
              fill="#FFFFFF"
              stroke="#F0EBE6"
              strokeWidth="2"
            />
            {/* Ears */}
            <circle cx="50" cy="54" r="14" fill="#FFFFFF" stroke="#F0EBE6" strokeWidth="1.5" />
            <circle cx="50" cy="54" r="7" fill="#FFCCD5" />
            <circle cx="92" cy="52" r="14" fill="#FFFFFF" stroke="#F0EBE6" strokeWidth="1.5" />
            <circle cx="92" cy="52" r="7" fill="#FFCCD5" />

            {/* Bubu Head */}
            <ellipse cx="72" cy="85" rx="32" ry="28" fill="#FFFFFF" stroke="#F0EBE6" strokeWidth="1.5" />
            {/* Snout */}
            <ellipse cx="80" cy="94" rx="12" ry="10" fill="#FFF5F7" />
            <ellipse cx="82" cy="90" rx="4.5" ry="3" fill="#2D2727" />
            {/* Smile */}
            <path d="M78 94 Q82 98 86 94" stroke="#2D2727" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Eyes */}
            <path d="M60 82 Q64 78 68 82" stroke="#2D2727" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M82 80 Q86 76 90 80" stroke="#2D2727" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            {/* Cute Rosy Cheeks */}
            <ellipse cx="58" cy="90" rx="6.5" ry="4.5" fill="#FF8FA3" fillOpacity="0.75" />
            <ellipse cx="92" cy="88" rx="6.5" ry="4.5" fill="#FF8FA3" fillOpacity="0.75" />
            {/* Little party bow */}
            <path d="M46 45 L54 50 L46 55 Z" fill="#FF758C" />
            <path d="M62 45 L54 50 L62 55 Z" fill="#FF758C" />
            <circle cx="54" cy="50" r="3" fill="#FFE5EC" />
            {/* Arm around Dudu */}
            <path
              d="M78 112 C95 110, 120 115, 115 125 C110 133, 90 128, 75 124 Z"
              fill="#F5F0EB"
            />
          </g>

          {/* Floating Heart between them */}
          <g className="animate-pulse">
            <path
              d="M100 48 C100 42, 92 36, 86 42 C78 50, 100 64, 100 64 C100 64, 122 50, 114 42 C108 36, 100 42, 100 48 Z"
              fill="#FF4D6D"
            />
          </g>
        </svg>

        {/* Dynamic heart burst on click */}
        {clicked && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <motion.span
              initial={{ scale: 0, y: 0, opacity: 1 }}
              animate={{ scale: 1.8, y: -45, opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="text-2xl text-rose-500"
            >
              💖
            </motion.span>
          </div>
        )}
      </motion.div>
    </div>
  );
};

/**
 * Animated Dudu waving with Birthday Balloon
 */
export const DuduBirthdayPartySVG: React.FC<{ size?: number; className?: string }> = ({ size = 160, className = '' }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width={size} height={size * 1.1} viewBox="0 0 160 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Balloon string */}
          <path d="M42 42 Q30 75 52 105" stroke="#C4B5A5" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
          {/* Heart Balloon */}
          <motion.g
            animate={{ rotate: [-4, 6, -4], y: [-2, 3, -2] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path
              d="M40 38 C40 26, 26 15, 16 26 C4 38, 40 58, 40 58 C40 58, 76 38, 64 26 C54 15, 40 26, 40 38 Z"
              fill="#FF6584"
            />
            {/* Balloon shine */}
            <ellipse cx="28" cy="28" rx="4" ry="2" transform="rotate(-30 28 28)" fill="#FFFFFF" fillOpacity="0.6" />
          </motion.g>

          {/* Dudu Bear Body */}
          <ellipse cx="88" cy="142" rx="35" ry="30" fill="#A27B5C" />
          <circle cx="62" cy="85" r="13" fill="#A27B5C" />
          <circle cx="62" cy="85" r="7" fill="#DCD7C9" />
          <circle cx="114" cy="85" r="13" fill="#A27B5C" />
          <circle cx="114" cy="85" r="7" fill="#DCD7C9" />
          <circle cx="88" cy="108" r="32" fill="#A27B5C" />

          {/* Birthday Hat */}
          <polygon points="88,60 74,90 102,90" fill="#FFD166" />
          <polygon points="88,60 80,90 96,90" fill="#FF758C" />
          <circle cx="88" cy="58" r="5" fill="#FFE5EC" />

          {/* Face */}
          <ellipse cx="88" cy="116" rx="15" ry="11" fill="#E8D8C8" />
          <ellipse cx="88" cy="113" rx="5" ry="3.5" fill="#3F2E23" />
          <path d="M84 117 Q88 122 92 117" stroke="#3F2E23" strokeWidth="2" strokeLinecap="round" fill="none" />
          {/* Sparkly Happy Eyes */}
          <circle cx="76" cy="106" r="3.5" fill="#3F2E23" />
          <circle cx="100" cy="106" r="3.5" fill="#3F2E23" />
          <circle cx="75" cy="104.5" r="1.2" fill="#FFFFFF" />
          <circle cx="99" cy="104.5" r="1.2" fill="#FFFFFF" />
          {/* Rosy Cheeks */}
          <circle cx="70" cy="115" r="6" fill="#E28787" fillOpacity="0.7" />
          <circle cx="106" cy="115" r="6" fill="#E28787" fillOpacity="0.7" />

          {/* Paw holding string */}
          <circle cx="56" cy="110" r="8" fill="#8F6B4F" />
          {/* Waving paw */}
          <motion.g
            style={{ transformOrigin: '90% 90%' }}
            animate={{ rotate: [-8, 12, -8] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ellipse cx="125" cy="118" rx="8" ry="11" transform="rotate(35 125 118)" fill="#8F6B4F" />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
};

/**
 * Animated Bubu offering a birthday flower/heart
 */
export const BubuSweetFlowerSVG: React.FC<{ size?: number; className?: string }> = ({ size = 150, className = '' }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <motion.div
        animate={{ y: [0, -5, 0], rotate: [-1, 1, -1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width={size} height={size} viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Bubu White Bear */}
          <ellipse cx="75" cy="120" rx="36" ry="28" fill="#FFFFFF" stroke="#F0EBE6" strokeWidth="1.5" />
          <circle cx="48" cy="65" r="13" fill="#FFFFFF" stroke="#F0EBE6" strokeWidth="1.5" />
          <circle cx="48" cy="65" r="7" fill="#FFCCD5" />
          <circle cx="102" cy="65" r="13" fill="#FFFFFF" stroke="#F0EBE6" strokeWidth="1.5" />
          <circle cx="102" cy="65" r="7" fill="#FFCCD5" />
          <circle cx="75" cy="85" r="32" fill="#FFFFFF" stroke="#F0EBE6" strokeWidth="1.5" />

          {/* Little Birthday Flower in hair */}
          <circle cx="98" cy="62" r="5" fill="#FF758C" />
          <circle cx="104" cy="58" r="4" fill="#FFB7C5" />
          <circle cx="98" cy="54" r="4" fill="#FFB7C5" />
          <circle cx="92" cy="58" r="4" fill="#FFB7C5" />
          <circle cx="98" cy="58" r="2.5" fill="#FFE5EC" />

          {/* Snout & Face */}
          <ellipse cx="75" cy="94" rx="12" ry="9" fill="#FFF5F7" />
          <ellipse cx="75" cy="91" rx="4" ry="2.8" fill="#2D2727" />
          <path d="M72 95 Q75 99 78 95" stroke="#2D2727" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M62 84 Q66 80 70 84" stroke="#2D2727" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M80 84 Q84 80 88 84" stroke="#2D2727" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          {/* Rosy Cheeks */}
          <ellipse cx="58" cy="92" rx="7" ry="5" fill="#FF8FA3" fillOpacity="0.8" />
          <ellipse cx="92" cy="92" rx="7" ry="5" fill="#FF8FA3" fillOpacity="0.8" />

          {/* Paws holding a glowing red strawberry / rose */}
          <circle cx="66" cy="116" r="8" fill="#F5F0EB" />
          <circle cx="84" cy="116" r="8" fill="#F5F0EB" />
          <path
            d="M75 110 C75 104, 69 99, 64 104 C58 110, 75 120, 75 120 C75 120, 92 110, 86 104 C81 99, 75 104, 75 110 Z"
            fill="#FF3366"
          />
        </svg>
      </motion.div>
    </div>
  );
};

/**
 * Floating decorative petals that drift across background
 */
export const RomanticPetalsBackground: React.FC = () => {
  const petals = [
    { left: '8%', delay: 0, dur: 12, size: 14 },
    { left: '22%', delay: 3, dur: 15, size: 18 },
    { left: '38%', delay: 1, dur: 14, size: 12 },
    { left: '55%', delay: 5, dur: 16, size: 20 },
    { left: '72%', delay: 2, dur: 13, size: 16 },
    { left: '88%', delay: 4, dur: 17, size: 14 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {petals.map((p, idx) => (
        <motion.div
          key={idx}
          initial={{ y: -40, opacity: 0, rotate: 0 }}
          animate={{
            y: ['0vh', '105vh'],
            x: [0, Math.sin(idx) * 35, 0],
            rotate: [0, 360],
            opacity: [0, 0.45, 0.6, 0]
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: 'linear'
          }}
          style={{ left: p.left }}
          className="absolute text-rose-300/60 select-none"
        >
          <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
