import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, MessageCircle } from 'lucide-react';
import { DuduBubuHugSVG, DuduBirthdayPartySVG, BubuSweetFlowerSVG } from './DuduBubuStickers';
import { romanticAudio } from '../utils/audio';
import { fireHeartConfetti } from '../utils/confetti';

interface DuduBubuShowcaseProps {
  girlfriendNickname: string;
}

export const DuduBubuShowcase: React.FC<DuduBubuShowcaseProps> = ({ girlfriendNickname }) => {
  const [activeStory, setActiveStory] = useState<number>(0);

  const stories = [
    {
      id: 0,
      title: 'Our Warm Bear Cuddles',
      description: 'The world outside can get busy and loud, but in our cozy hug, everything is peaceful and safe.',
      bubuDialog: '"Dudu, hug me tighter!"',
      duduDialog: '"Always, my whole world."',
      component: <DuduBubuHugSVG size={180} />
    },
    {
      id: 1,
      title: 'The Sweet Birthday Surprise',
      description: 'Dudu rushing in early in the morning with heart-shaped balloons and strawberry treats for his favorite girl.',
      bubuDialog: '"Is all of this really for me?!"',
      duduDialog: '"Every single bit of it, Princess!"',
      component: <DuduBirthdayPartySVG size={170} />
    },
    {
      id: 2,
      title: 'Little Flower of Love',
      description: 'Bubu shyly giving a sweet scented flower that bloomed just like our love has grown.',
      bubuDialog: '"For being the best boyfriend."',
      duduDialog: '"You are my favorite flower forever."',
      component: <BubuSweetFlowerSVG size={160} />
    }
  ];

  const handleCardClick = (idx: number) => {
    setActiveStory(idx);
    romanticAudio.playHeartPop();
    fireHeartConfetti();
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-rose-500">
          Trendy Cartoon Storybook
        </span>
        <h2 className="font-romantic text-3xl sm:text-4xl font-bold text-stone-900 mt-1 mb-2">
          Dudu & {girlfriendNickname || 'Bubu'} Daily Chronicles
        </h2>
        <p className="text-stone-600 text-sm">
          Because every sweet, funny, and tender moment of our relationship feels straight out of a cute comic!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((story, idx) => (
          <motion.div
            key={story.id}
            whileHover={{ y: -6 }}
            onClick={() => handleCardClick(idx)}
            className={`rounded-3xl p-6 border transition-all cursor-pointer flex flex-col items-center text-center justify-between ${
              activeStory === idx
                ? 'bg-white border-rose-300 shadow-xl ring-2 ring-rose-200'
                : 'bg-white/80 border-rose-100 shadow-sm hover:shadow-md'
            }`}
          >
            {/* Cartoon Animation Container */}
            <div className="w-full flex items-center justify-center py-4 bg-rose-50/50 rounded-2xl mb-4 min-h-[190px]">
              {story.component}
            </div>

            {/* Story Details */}
            <div className="w-full">
              <h3 className="font-romantic text-xl font-bold text-stone-900 mb-1">
                {story.title}
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed mb-4">
                {story.description}
              </p>

              {/* Dialogue bubbles */}
              <div className="space-y-2 text-left bg-stone-50 p-3 rounded-xl border border-rose-50">
                <div className="text-[11px] text-stone-700">
                  <span className="font-bold text-rose-500 mr-1.5">{girlfriendNickname || 'Bubu'}:</span>
                  <span className="italic">{story.bubuDialog}</span>
                </div>
                <div className="text-[11px] text-stone-700">
                  <span className="font-bold text-amber-700 mr-1.5">Dudu:</span>
                  <span className="italic">{story.duduDialog}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-rose-50 w-full flex items-center justify-between text-[11px] text-rose-500 font-semibold">
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-rose-500" />
                <span>Tap for love animation</span>
              </span>
              <span>✨</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
