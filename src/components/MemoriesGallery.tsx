import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Plus,
  Play,
  X,
  MapPin,
  Calendar,
  Film,
  Image as ImageIcon,
  UploadCloud,
  Sparkles,
  Trash2,
  CheckCircle2,
  FolderOpen
} from 'lucide-react';
import { MemoryItem } from '../types';
import { romanticAudio } from '../utils/audio';
import { fireHeartConfetti, fireBirthdayConfetti } from '../utils/confetti';
import { saveMultipleMemoriesToDB } from '../utils/photoStorage';
import { DuduBubuHugSVG, BubuSweetFlowerSVG } from './DuduBubuStickers';

interface MemoriesGalleryProps {
  memories: MemoryItem[];
  onAddMemory: (newMemory: MemoryItem) => void;
  onAddMultipleMemories: (newMemories: MemoryItem[]) => void;
  onDeleteMemory?: (id: string) => void;
  girlfriendName: string;
}

export const MemoriesGallery: React.FC<MemoriesGalleryProps> = ({
  memories,
  onAddMemory,
  onAddMultipleMemories,
  onDeleteMemory,
  girlfriendName,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<MemoryItem | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [isProcessingBulk, setIsProcessingBulk] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Form states for single quick add
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [mediaUrl, setMediaUrl] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [caption, setCaption] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [category, setCategory] = useState<'solo' | 'couple' | 'trips' | 'funny'>('solo');
  const [likesState, setLikesState] = useState<{ [id: string]: number }>({});

  const userPhotosCount = memories.filter(
    (m) =>
      m.url.startsWith('data:') ||
      m.url.startsWith('blob:') ||
      m.id.startsWith('mem-bulk') ||
      m.id.startsWith('mem-user')
  ).length;

  const filteredMemories = memories.filter((item) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'video') return item.type === 'video';
    if (activeCategory === 'photos') return item.type === 'image';
    return item.category === activeCategory;
  });

  const handleHeartLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    romanticAudio.playHeartPop();
    fireHeartConfetti();
    setLikesState((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // High-performance bulk upload of all 38 files
  const processFiles = async (fileList: FileList | File[]) => {
    if (!fileList || fileList.length === 0) return;

    setIsProcessingBulk(true);
    setUploadProgress({ current: 0, total: fileList.length });
    const newItems: MemoryItem[] = [];

    const readAsDataUrl = (file: File): Promise<string> => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target?.result as string);
        reader.readAsDataURL(file);
      });
    };

    const romanticTitles = [
      'My Breathtaking Jaan',
      'The Sweetest Smile in the World',
      'Subhan’s Forever Queen',
      'Aditi Turning 18 Magic',
      'Pure Angel Radiance',
      'Cute Selfies & Giggles',
      'Her Eyes Sparkle Like Stars',
      'Subhan & Aditi Forever Love',
      'Late Night 12:42 AM Call Smiles',
      'Subhan’s Cherished Muse',
      'Every Moment With You is Heaven',
      '2 Years Across The Miles and Counting'
    ];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      setUploadProgress({ current: i + 1, total: fileList.length });
      const dataUrl = await readAsDataUrl(file);
      const isVid = file.type.startsWith('video');
      const randomTitle = romanticTitles[i % romanticTitles.length];

      newItems.push({
        id: `mem-bulk-${Date.now()}-${i}`,
        type: isVid ? 'video' : 'image',
        url: dataUrl,
        title: `${randomTitle} #${i + 1}`,
        caption: `A real cherished moment of ${girlfriendName} turning 18, loved endlessly by Subhan.`,
        date: '18th Milestone (17/10)',
        location: 'In Subhan’s Heart',
        category: isVid ? 'couple' : i % 2 === 0 ? 'solo' : 'couple',
        likesCount: Math.floor(Math.random() * 200) + 50,
      });
    }

    await saveMultipleMemoriesToDB(newItems);
    onAddMultipleMemories(newItems);
    setIsProcessingBulk(false);
    setUploadProgress(null);
    romanticAudio.playChimeSuccess();
    fireBirthdayConfetti();
  };

  const handleBulkUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleSingleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVid = file.type.startsWith('video');
      setMediaType(isVid ? 'video' : 'image');
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setMediaUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitNewMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaUrl.trim() || !title.trim()) return;

    const newItem: MemoryItem = {
      id: `mem-user-${Date.now()}`,
      type: mediaType,
      url: mediaUrl,
      title: title.trim(),
      caption: caption.trim() || `A cherished memory of ${girlfriendName} that makes my heart flutter.`,
      date: date.trim() || '18th Milestone',
      location: location.trim() || 'In My Heart',
      category: category,
      likesCount: 1,
    };

    onAddMemory(newItem);
    romanticAudio.playChimeSuccess();
    setShowAddModal(false);
    setMediaUrl('');
    setTitle('');
    setCaption('');
  };

  return (
    <section id="memories" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={handleBulkUploadChange}
        className="hidden"
      />

      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-500 mb-2">
            <span>Our Cherished Vault</span>
            <span aria-hidden="true">·</span>
            <span>{girlfriendName}'s 18th Birthday Gallery</span>
          </div>
          <h2 className="font-romantic text-3xl sm:text-4xl font-bold text-stone-900">
            Treasured Memories of {girlfriendName}
          </h2>
          <p className="text-stone-600 text-sm mt-1 max-w-lg">
            Every snapshot and video captures your laugh, your sweet expressions, and the beauty of being Subhan’s Jaan.
          </p>
        </div>

        {/* Action Button & Bulk Upload */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessingBulk}
            className="flex items-center gap-2 px-5 py-3 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xs font-semibold rounded-2xl shadow-md shadow-rose-400/25 transition-all cursor-pointer"
          >
            <UploadCloud className="w-4 h-4" />
            <span>
              {isProcessingBulk
                ? `Loading ${uploadProgress?.current || 0}/${uploadProgress?.total || 0}...`
                : userPhotosCount > 0
                ? `Upload More Files (${userPhotosCount} active)`
                : 'Select All 38 Photos & Videos'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-3 bg-white hover:bg-rose-50 text-rose-700 text-xs font-semibold rounded-2xl border border-rose-200 shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Single Memory</span>
          </button>
        </div>
      </div>

      {/* Prominent Drag & Drop Zone / 1-Click Multi Upload Box */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`mb-10 rounded-3xl p-6 sm:p-8 border-2 border-dashed transition-all cursor-pointer relative overflow-hidden flex flex-col items-center justify-center text-center ${
          isDragging
            ? 'border-rose-500 bg-rose-100/70 scale-[1.01]'
            : 'border-rose-300/80 bg-gradient-to-r from-rose-50/70 via-pink-50/50 to-amber-50/60 hover:border-rose-400'
        }`}
      >
        <div className="flex items-center gap-4 mb-3">
          <DuduBubuHugSVG size={70} />
          <div className="w-12 h-12 rounded-2xl bg-white text-rose-500 flex items-center justify-center shadow-md">
            <FolderOpen className="w-6 h-6" />
          </div>
        </div>

        <h3 className="font-romantic text-lg sm:text-xl font-bold text-stone-900 mb-1">
          {userPhotosCount > 0
            ? `${userPhotosCount} Photos & Videos Loaded in Vault ❤️`
            : 'Click Here to Select All 38 Photos & Videos from Your Device'}
        </h3>

        <p className="text-xs sm:text-sm text-stone-600 max-w-md mb-3">
          {userPhotosCount > 0
            ? 'Need to add more? Drop files here or click to select more photos or video clips anytime.'
            : 'Tap anywhere in this box to select all 38 files at once, or simply drag and drop them here. They are saved permanently to your vault!'}
        </p>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold text-rose-600 bg-white px-3 py-1 rounded-full border border-rose-200 shadow-2xs flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Supports Multiple Photos & Video Clips
          </span>
          {isProcessingBulk && (
            <span className="text-[11px] font-bold text-rose-700 bg-rose-200 px-3 py-1 rounded-full animate-pulse">
              Processing {uploadProgress?.current} / {uploadProgress?.total}...
            </span>
          )}
        </div>
      </div>

      {/* Interactive Segmented Filter Controls */}
      <div className="flex items-center gap-1.5 p-1.5 bg-rose-100/60 rounded-2xl max-w-fit mb-8 overflow-x-auto">
        {[
          { key: 'all', label: `All Memories (${memories.length})` },
          { key: 'photos', label: `Photos (${memories.filter((m) => m.type === 'image').length})` },
          { key: 'video', label: `Videos 🎬 (${memories.filter((m) => m.type === 'video').length})` },
          { key: 'solo', label: 'Her Radiance' },
          { key: 'couple', label: 'Subhan & Aditi' },
          { key: 'funny', label: 'Dudu & Bubu Cute' },
        ].map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveCategory(tab.key)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer ${
              activeCategory === tab.key
                ? 'bg-white text-rose-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bento / Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMemories.map((item, idx) => {
          const currentLikes = (item.likesCount || 0) + (likesState[item.id] || 0);

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: Math.min(idx * 0.04, 0.5) }}
              onClick={() => setSelectedItem(item)}
              className="group bg-white rounded-3xl p-3 border border-rose-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between relative"
            >
              {/* Media Container */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 mb-3">
                {item.type === 'video' ? (
                  <div className="relative w-full h-full bg-stone-900 flex items-center justify-center">
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                      preload="metadata"
                      muted
                      playsInline
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 text-rose-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 ml-0.5 fill-rose-600" />
                      </div>
                    </div>
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-[10px] text-white font-medium flex items-center gap-1 backdrop-blur-xs">
                      <Film className="w-3 h-3 text-rose-400" />
                      Video Memory
                    </span>
                  </div>
                ) : (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                )}

                {/* Like Button */}
                <button
                  type="button"
                  onClick={(e) => handleHeartLike(item.id, e)}
                  className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/90 backdrop-blur-xs text-rose-500 hover:text-rose-600 hover:scale-110 active:scale-90 transition-all shadow-md z-10 cursor-pointer"
                  title="Send love"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      likesState[item.id] ? 'fill-rose-500' : 'fill-rose-500/20'
                    }`}
                  />
                </button>

                {/* Optional Delete Button */}
                {onDeleteMemory && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Delete this memory from the vault?')) {
                        onDeleteMemory(item.id);
                      }
                    }}
                    className="absolute top-2.5 left-2.5 p-2 rounded-full bg-black/40 hover:bg-red-500 text-white transition-all opacity-0 group-hover:opacity-100 shadow-md z-10 cursor-pointer"
                    title="Remove from vault"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Text Metadata */}
              <div className="px-1.5 pb-1">
                <div className="flex items-center justify-between text-[11px] text-stone-400 font-medium mb-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-rose-400" />
                    <span>{item.date}</span>
                  </div>
                  <span className="text-rose-500 font-semibold">{currentLikes} ❤️</span>
                </div>

                <h3 className="font-romantic text-base font-bold text-stone-900 group-hover:text-rose-600 transition-colors line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-stone-500 text-xs mt-1 line-clamp-2 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Lightbox / Video Player Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-stone-900/60 text-white hover:bg-stone-900 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Media Preview Column */}
              <div className="md:w-3/5 bg-stone-950 flex items-center justify-center min-h-[300px]">
                {selectedItem.type === 'video' ? (
                  <video
                    src={selectedItem.url}
                    controls
                    autoPlay
                    className="max-h-[75vh] w-full object-contain"
                  />
                ) : (
                  <img
                    src={selectedItem.url}
                    alt={selectedItem.title}
                    className="max-h-[75vh] w-full object-contain"
                  />
                )}
              </div>

              {/* Details Column */}
              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-white overflow-y-auto">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700">
                      {selectedItem.category}
                    </span>
                    <span className="text-xs text-stone-400">{selectedItem.date}</span>
                  </div>

                  <h3 className="font-romantic text-2xl font-bold text-stone-900 mb-2">
                    {selectedItem.title}
                  </h3>

                  <p className="text-stone-600 text-sm leading-relaxed mb-6 font-light">
                    {selectedItem.caption}
                  </p>

                  <div className="p-3 bg-rose-50/70 rounded-2xl border border-rose-100 flex items-center gap-3">
                    <BubuSweetFlowerSVG size={45} />
                    <p className="text-xs text-rose-900 font-medium">
                      Subhan’s precious memory of {girlfriendName} turning 18 ❤️
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-100 flex items-center justify-between mt-6">
                  <button
                    type="button"
                    onClick={(e) => handleHeartLike(selectedItem.id, e)}
                    className="flex items-center gap-2 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-rose-500" />
                    <span>
                      {(selectedItem.likesCount || 0) + (likesState[selectedItem.id] || 0)} Loves
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    className="text-xs text-stone-500 hover:text-stone-800 font-medium cursor-pointer"
                  >
                    Close Memory
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Single Memory Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-romantic text-xl font-bold text-stone-900">
                  Add a Special Photo or Video
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center hover:bg-stone-200 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmitNewMemory} className="space-y-4">
                {/* File picker */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Select File from Device (Image or Video)
                  </label>
                  <input
                    type="file"
                    accept="image/*,video/*"
                    onChange={handleSingleFileUpload}
                    className="block w-full text-xs text-stone-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-rose-50 file:text-rose-700 hover:file:bg-rose-100 cursor-pointer"
                  />
                </div>

                {/* Or URL */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Or Direct URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={mediaUrl}
                    onChange={(e) => setMediaUrl(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-400"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aditi's Sweet Laugh"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-400"
                  />
                </div>

                {/* Caption */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                    Caption
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Why this moment makes your heart flutter..."
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-400 resize-none"
                  />
                </div>

                {/* Category & Date */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-rose-400"
                    >
                      <option value="solo">Her Radiance (Solo)</option>
                      <option value="couple">Subhan & Aditi (Couple)</option>
                      <option value="trips">Memories & Dates</option>
                      <option value="funny">Cute & Funny</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1.5">
                      Date Tag
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 17th Oct"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-400"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={!mediaUrl.trim() || !title.trim()}
                    className="w-full py-3 bg-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white text-xs font-bold rounded-2xl shadow-md transition-all cursor-pointer"
                  >
                    Save Memory to Vault
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
