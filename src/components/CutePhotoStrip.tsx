import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Sparkles, UploadCloud, X, Heart, Film } from 'lucide-react';
import { MemoryItem } from '../types';
import { romanticAudio } from '../utils/audio';
import { fireHeartConfetti } from '../utils/confetti';
import { DuduBubuHugSVG, BubuSweetFlowerSVG } from './DuduBubuStickers';

interface CutePhotoStripProps {
  girlfriendName: string;
  memories: MemoryItem[];
  onUploadMultiple: (files: FileList) => void;
  isUploading?: boolean;
}

export const CutePhotoStrip: React.FC<CutePhotoStripProps> = ({
  girlfriendName,
  memories,
  onUploadMultiple,
  isUploading = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryItem | null>(null);

  // Filter for actual user photos/videos (data URLs, blob URLs, or custom uploaded)
  const userMedia = memories.filter(
    (m) =>
      m.url.startsWith('data:') ||
      m.url.startsWith('blob:') ||
      m.id.startsWith('mem-bulk') ||
      m.id.startsWith('mem-user')
  );

  // If user has uploaded media, take the first 5; otherwise use cute cartoon placeholders
  const displayItems: Array<{
    item?: MemoryItem;
    url?: string;
    tag: string;
    subtitle: string;
    rotate: string;
    sticker: string;
    isVideo?: boolean;
  }> = [
    {
      item: userMedia[0],
      url: userMedia[0]?.url,
      tag: userMedia[0]?.title || `${girlfriendName}'s Radiant Smile`,
      subtitle: userMedia[0] ? 'Her True Glow' : 'Photo #1',
      rotate: '-2.5deg',
      sticker: '🌸',
      isVideo: userMedia[0]?.type === 'video',
    },
    {
      item: userMedia[1],
      url: userMedia[1]?.url,
      tag: userMedia[1]?.title || 'Subhan’s 18th Queen',
      subtitle: userMedia[1] ? 'Pure Magic' : 'Photo #2',
      rotate: '2deg',
      sticker: '👑',
      isVideo: userMedia[1]?.type === 'video',
    },
    {
      item: userMedia[2],
      url: userMedia[2]?.url,
      tag: userMedia[2]?.title || 'Cute Selfies & Moments',
      subtitle: userMedia[2] ? 'Cherished Forever' : 'Photo #3',
      rotate: '-3deg',
      sticker: '✨',
      isVideo: userMedia[2]?.type === 'video',
    },
    {
      item: userMedia[3],
      url: userMedia[3]?.url,
      tag: userMedia[3]?.title || 'Sweet Little Expressions',
      subtitle: userMedia[3] ? 'Subhan’s Jaan' : 'Photo #4',
      rotate: '1.5deg',
      sticker: '🕊️',
      isVideo: userMedia[3]?.type === 'video',
    },
    {
      item: userMedia[4],
      url: userMedia[4]?.url,
      tag: userMedia[4]?.title || 'Celebrating 18 Years',
      subtitle: userMedia[4] ? '2 Years In Love' : 'Photo #5',
      rotate: '-1.5deg',
      sticker: '🌹',
      isVideo: userMedia[4]?.type === 'video',
    },
  ];

  const handleCardClick = (entry: (typeof displayItems)[0]) => {
    if (entry.item) {
      setSelectedPhoto(entry.item);
      romanticAudio.playHeartPop();
      fireHeartConfetti();
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onUploadMultiple(e.target.files);
    }
  };

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Hidden bulk file input for instantaneous selection of all 38 files */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="bg-gradient-to-r from-rose-100/60 via-pink-100/40 to-amber-100/40 rounded-3xl p-5 sm:p-7 border border-rose-200/80 shadow-sm relative overflow-hidden">
        {/* Section title and fast upload CTA */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white text-rose-500 flex items-center justify-center shadow-xs">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-romantic text-xl font-bold text-stone-900">
                  {girlfriendName}’s Cute 18th Birthday Photo Reel
                </h3>
                <span className="text-[11px] font-semibold text-rose-600 bg-white/90 px-2.5 py-0.5 rounded-full border border-rose-200 shadow-2xs">
                  {userMedia.length > 0 ? `${userMedia.length} Uploaded` : 'Ready to Load'}
                </span>
              </div>
              <p className="text-stone-600 text-xs">
                {userMedia.length > 0
                  ? `Featuring your authentic photos of ${girlfriendName} across the miles ❤️`
                  : 'Select your 38 photos and videos to display them instantly in cute polaroid frames!'}
              </p>
            </div>
          </div>

          {/* Quick 1-Click Upload Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-4 py-2.5 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xs font-semibold rounded-2xl shadow-md shadow-rose-400/30 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <UploadCloud className="w-4 h-4" />
            <span>
              {isUploading
                ? 'Importing Files...'
                : userMedia.length > 0
                ? 'Add More Photos / Videos'
                : 'Select All 38 Photos & Videos'}
            </span>
          </button>
        </div>

        {/* Horizontal Cute Polaroids Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {displayItems.map((entry, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => handleCardClick(entry)}
              style={{ rotate: entry.rotate }}
              className="group bg-white p-2.5 pb-4 rounded-2xl shadow-md hover:shadow-xl border border-rose-100 transition-all cursor-pointer relative flex flex-col justify-between"
            >
              {/* Cute Washi Tape at top */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3.5 bg-rose-200/90 rounded-xs shadow-2xs z-10" />

              {/* Photo Area */}
              <div className="relative rounded-xl overflow-hidden aspect-[3/4] bg-stone-50 mb-2.5 flex items-center justify-center">
                {entry.url ? (
                  entry.isVideo ? (
                    <div className="relative w-full h-full bg-stone-900 flex items-center justify-center">
                      <video
                        src={entry.url}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Film className="w-8 h-8 text-white/90" />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={entry.url}
                      alt={entry.tag}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-rose-50/50 group-hover:bg-rose-100/60 transition-colors">
                    <BubuSweetFlowerSVG size={60} />
                    <span className="text-[11px] font-semibold text-rose-500 mt-1">
                      + Add Photo #{idx + 1}
                    </span>
                    <span className="text-[9px] text-stone-400">Click to choose</span>
                  </div>
                )}
                <span className="absolute top-2 right-2 text-base filter drop-shadow-xs">
                  {entry.sticker}
                </span>
              </div>

              {/* Caption */}
              <div className="text-center px-1">
                <p className="font-romantic text-xs font-bold text-stone-800 truncate">
                  {entry.tag}
                </p>
                <p className="text-[10px] text-stone-500 font-medium truncate mt-0.5">
                  {entry.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox for clicked polaroid */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xl w-full bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-rose-100"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center z-10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-stone-900 mb-4 flex items-center justify-center">
                {selectedPhoto.type === 'video' ? (
                  <video
                    src={selectedPhoto.url}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={selectedPhoto.url}
                    alt={selectedPhoto.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-romantic text-lg font-bold text-stone-900">
                    {selectedPhoto.title}
                  </h4>
                  <p className="text-xs text-stone-500">{selectedPhoto.caption}</p>
                </div>
                <div className="flex items-center gap-1.5 text-rose-500 font-bold text-xs bg-rose-50 px-3 py-1.5 rounded-full">
                  <Heart className="w-4 h-4 fill-rose-500" />
                  <span>Subhan’s Queen</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
