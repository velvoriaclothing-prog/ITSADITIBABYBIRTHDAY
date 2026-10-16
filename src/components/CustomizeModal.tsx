import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Save, Eye, RotateCcw, Plus, Trash2, Heart, Music, Check } from 'lucide-react';
import { BirthdayConfig, MemoryItem } from '../types';
import { romanticAudio } from '../utils/audio';

interface CustomizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: BirthdayConfig;
  onSaveConfig: (newConfig: BirthdayConfig) => void;
  memories: MemoryItem[];
  onDeleteMemory: (id: string) => void;
  onAddMemory: (memory: MemoryItem) => void;
  onResetDefaults: () => void;
  onEnterPresentMode: () => void;
}

export const CustomizeModal: React.FC<CustomizeModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  memories,
  onDeleteMemory,
  onAddMemory,
  onResetDefaults,
  onEnterPresentMode,
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'letter' | 'memories' | 'vows'>('details');

  const [formData, setFormData] = useState<BirthdayConfig>(config);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // New photo/video quick upload in modal
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newType, setNewType] = useState<'image' | 'video'>('image');

  if (!isOpen) return null;

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSaveConfig(formData);
    romanticAudio.playChimeSuccess();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVid = file.type.startsWith('video');
      setNewType(isVid ? 'video' : 'image');
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setNewUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMedia = () => {
    if (!newUrl.trim() || !newTitle.trim()) return;
    onAddMemory({
      id: `mem-${Date.now()}`,
      type: newType,
      url: newUrl,
      title: newTitle.trim(),
      caption: 'A cherished memory uploaded with love.',
      date: 'Sweet Memory',
      category: 'couple',
      likesCount: 1
    });
    setNewTitle('');
    setNewUrl('');
    romanticAudio.playChimeSuccess();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-3xl w-full bg-white rounded-3xl p-5 sm:p-8 shadow-2xl border border-rose-100 flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div>
            <h3 className="font-romantic text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
              <span>Personalize Girlfriend's Birthday Site</span>
              <span className="text-rose-500 text-lg">✏️</span>
            </h3>
            <p className="text-stone-600 text-xs mt-0.5">
              Customize her name, her photos/videos, love letter, and turning age in real-time.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onEnterPresentMode();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200 transition-colors cursor-pointer"
              title="Hide all edit buttons and preview in Girlfriend Present Mode"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Present Mode</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 py-3 border-b border-stone-100 overflow-x-auto">
          {[
            { key: 'details', label: '1. Names & Dates' },
            { key: 'letter', label: '2. Love Letter' },
            { key: 'memories', label: `3. Photos & Videos (${memories.length})` },
            { key: 'vows', label: '4. Birthday Promises' }
          ].map(tab => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-rose-500 text-white shadow-xs'
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 text-left">
          {activeTab === 'details' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Girlfriend's Name
                  </label>
                  <input
                    type="text"
                    value={formData.girlfriendName}
                    onChange={(e) => setFormData({ ...formData, girlfriendName: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-400"
                    placeholder="e.g. Emily, Priya, Jessica"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Her Pet Name / Nickname
                  </label>
                  <input
                    type="text"
                    value={formData.girlfriendNickname}
                    onChange={(e) => setFormData({ ...formData, girlfriendNickname: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-400"
                    placeholder="e.g. Bubu, Princess, My Love"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Your Name (Boyfriend)
                  </label>
                  <input
                    type="text"
                    value={formData.boyfriendName}
                    onChange={(e) => setFormData({ ...formData, boyfriendName: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-400"
                    placeholder="e.g. Dudu, Alex, David"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Turning Age
                  </label>
                  <input
                    type="number"
                    value={formData.turningAge}
                    onChange={(e) => setFormData({ ...formData, turningAge: Number(e.target.value) || 24 })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Birthday Date
                  </label>
                  <input
                    type="date"
                    value={formData.birthdayDate}
                    onChange={(e) => setFormData({ ...formData, birthdayDate: e.target.value })}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Relationship Anniversary Date (2 Years Long Distance Love)
                </label>
                <input
                  type="date"
                  value={formData.anniversaryDate}
                  onChange={(e) => setFormData({ ...formData, anniversaryDate: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Hero Subtitle Greeting
                </label>
                <textarea
                  rows={2}
                  value={formData.heroSubtitle}
                  onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-400 resize-none"
                />
              </div>
            </div>
          )}

          {activeTab === 'letter' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Main Love Letter (Displayed in the Sealed Letter Modal)
                </label>
                <textarea
                  rows={10}
                  value={formData.mainLoveLetter}
                  onChange={(e) => setFormData({ ...formData, mainLoveLetter: e.target.value })}
                  className="w-full text-xs font-romantic px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-400 leading-relaxed"
                  placeholder="Write your heartfelt birthday wishes and love note here..."
                />
              </div>
            </div>
          )}

          {activeTab === 'memories' && (
            <div className="space-y-6">
              {/* Quick Add Section */}
              <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-200">
                <h4 className="text-xs font-bold text-rose-900 mb-2">
                  Drop In Another Photo or Video
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Our First Trip"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full text-xs px-3 py-2 rounded-xl bg-white border border-stone-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Upload File
                    </label>
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      className="block w-full text-[11px] text-stone-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[11px] file:bg-rose-100 file:text-rose-700 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="url"
                    placeholder="Or paste direct image/video URL..."
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="flex-1 text-xs px-3 py-2 rounded-xl bg-white border border-stone-200"
                  />
                  <button
                    type="button"
                    onClick={handleAddMedia}
                    disabled={!newTitle || !newUrl}
                    className="px-4 py-2 bg-rose-500 disabled:opacity-50 hover:bg-rose-600 text-white text-xs font-semibold rounded-xl transition-all cursor-pointer whitespace-nowrap"
                  >
                    Add Now
                  </button>
                </div>
              </div>

              {/* Current List of Memories */}
              <div>
                <h4 className="text-xs font-bold text-stone-700 mb-2">
                  Current Gallery Items ({memories.length})
                </h4>
                <div className="space-y-2 max-h-56 overflow-y-auto">
                  {memories.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center justify-between p-2.5 bg-stone-50 rounded-xl border border-stone-200 text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-200 shrink-0">
                          {m.type === 'video' ? (
                            <video src={m.url} className="w-full h-full object-cover" />
                          ) : (
                            <img src={m.url} alt="" className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-stone-800">{m.title}</p>
                          <p className="text-[10px] text-stone-600">{m.type.toUpperCase()} · {m.date}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onDeleteMemory(m.id)}
                        className="p-1.5 text-stone-600 hover:text-red-500 transition-colors cursor-pointer"
                        title="Delete memory"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vows' && (
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Birthday Promises (One per line)
              </label>
              <textarea
                rows={6}
                value={formData.romanticVows.join('\n')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    romanticVows: e.target.value.split('\n').filter(line => line.trim().length > 0)
                  })
                }
                className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-rose-400 leading-relaxed font-mono"
              />
              <p className="text-[11px] text-stone-600">
                These will show up with cute checkmarks inside your love letter modal.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onResetDefaults}
            className="text-xs text-stone-600 hover:text-stone-800 flex items-center gap-1 underline cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Demo Defaults</span>
          </button>

          <div className="flex items-center gap-2">
            {saveSuccess && (
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Saved!</span>
              </span>
            )}
            <button
              type="button"
              onClick={() => handleSave()}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-rose-500 hover:bg-rose-600 active:scale-95 text-white text-xs font-semibold rounded-xl shadow-md shadow-rose-400/30 transition-all cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
