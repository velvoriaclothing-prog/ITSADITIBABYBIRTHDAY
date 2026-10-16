/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BirthdayConfig, MemoryItem, LoveCoupon } from './types';
import {
  initialBirthdayConfig,
  initialMemories,
  initialCoupons,
  initialSecretLetters,
  reasonsWhyILoveYou
} from './data/defaultData';
import { romanticAudio } from './utils/audio';
import { getAllMemoriesFromDB, saveMemoryToDB, saveMultipleMemoriesToDB, deleteMemoryFromDB } from './utils/photoStorage';
import { RomanticPetalsBackground } from './components/DuduBubuStickers';
import { PasscodeGate } from './components/PasscodeGate';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/HeroSection';
import { CutePhotoStrip } from './components/CutePhotoStrip';
import { CakeCeremony } from './components/CakeCeremony';
import { DuduBubuShowcase } from './components/DuduBubuShowcase';
import { MemoriesGallery } from './components/MemoriesGallery';
import { OpenWhenLetters } from './components/OpenWhenLetters';
import { LoveCoupons } from './components/LoveCoupons';
import { ReasonsWhy } from './components/ReasonsWhy';
import { LoveLetterModal } from './components/LoveLetterModal';
import { CustomizeModal } from './components/CustomizeModal';
import { MusicPlayerBar } from './components/MusicPlayerBar';
import { FooterSection } from './components/FooterSection';
import { fireBirthdayConfetti, fireHeartConfetti } from './utils/confetti';

export default function App() {
  // Step 1: Secret Birthday Passcode Gate (1710 for Aditi's 18th Birthday)
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    return sessionStorage.getItem('aditi_18th_unlocked') === 'true';
  });

  // Step 2: Special Birthday Envelope Gate
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState<boolean>(false);

  // Core Data States with localStorage persistence & Aditi default
  const [config, setConfig] = useState<BirthdayConfig>(() => {
    try {
      const saved = localStorage.getItem('dudu_bubu_birthday_config_v4');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialBirthdayConfig;
  });

  const [memories, setMemories] = useState<MemoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('dudu_bubu_birthday_memories_v4');
      if (saved) {
        const parsed: MemoryItem[] = JSON.parse(saved);
        // Clean out any old random AI images from earlier testing
        const cleaned = parsed.filter(
          (m) =>
            !m.url.includes('aditi_pink_saree') &&
            !m.url.includes('aditi_maroon') &&
            !m.url.includes('aditi_festive') &&
            !m.url.includes('aditi_cream') &&
            !m.url.includes('aditi_red')
        );
        if (cleaned.length > 0) return cleaned;
      }
    } catch {
      // fallback
    }
    return initialMemories;
  });

  const [coupons, setCoupons] = useState<LoveCoupon[]>(() => {
    try {
      const saved = localStorage.getItem('dudu_bubu_birthday_coupons_v4');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialCoupons;
  });

  // UI Modals
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isPresentMode, setIsPresentMode] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Restore IndexedDB photos on startup
  useEffect(() => {
    getAllMemoriesFromDB()
      .then((dbItems) => {
        if (dbItems && dbItems.length > 0) {
          // Clean out any old AI images
          const validItems = dbItems.filter(
            (m) =>
              !m.url.includes('aditi_pink_saree') &&
              !m.url.includes('aditi_maroon') &&
              !m.url.includes('aditi_festive') &&
              !m.url.includes('aditi_cream') &&
              !m.url.includes('aditi_red')
          );
          if (validItems.length > 0) {
            setMemories((prev) => {
              const existingIds = new Set(prev.map((p) => p.id));
              const newUnique = validItems.filter((item) => !existingIds.has(item.id));
              return [...newUnique, ...prev];
            });
          }
        }
      })
      .catch(() => {});
  }, []);

  // Save changes
  useEffect(() => {
    try {
      localStorage.setItem('dudu_bubu_birthday_config_v4', JSON.stringify(config));
    } catch {}
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem('dudu_bubu_birthday_memories_v4', JSON.stringify(memories));
    } catch {}
  }, [memories]);

  useEffect(() => {
    try {
      localStorage.setItem('dudu_bubu_birthday_coupons_v4', JSON.stringify(coupons));
    } catch {}
  }, [coupons]);

  const handleUnlockPasscode = () => {
    setIsUnlocked(true);
    sessionStorage.setItem('aditi_18th_unlocked', 'true');
  };

  const handleToggleMusic = () => {
    const playing = romanticAudio.toggleMusic(config.customAudioUrl);
    setIsMusicPlaying(playing);
  };

  const handleAddMemory = (newMemory: MemoryItem) => {
    setMemories((prev) => [newMemory, ...prev]);
    saveMemoryToDB(newMemory).catch(() => {});
  };

  const handleAddMultipleMemories = (newMemories: MemoryItem[]) => {
    setMemories((prev) => [...newMemories, ...prev]);
  };

  // Bulk file processor accessible from top components
  const handleUploadMultipleFiles = async (files: FileList) => {
    if (!files || files.length === 0) return;
    setIsUploading(true);

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

    const newItems: MemoryItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const dataUrl = await readAsDataUrl(file);
      const isVid = file.type.startsWith('video');
      const randomTitle = romanticTitles[i % romanticTitles.length];

      newItems.push({
        id: `mem-bulk-${Date.now()}-${i}`,
        type: isVid ? 'video' : 'image',
        url: dataUrl,
        title: `${randomTitle} #${i + 1}`,
        caption: `A cherished real moment of ${config.girlfriendName} turning 18, loved endlessly by Subhan.`,
        date: '18th Milestone (17/10)',
        location: 'In Subhan’s Heart',
        category: isVid ? 'couple' : i % 2 === 0 ? 'solo' : 'couple',
        likesCount: Math.floor(Math.random() * 200) + 50,
      });
    }

    await saveMultipleMemoriesToDB(newItems);
    setMemories((prev) => [...newItems, ...prev]);
    setIsUploading(false);
    romanticAudio.playChimeSuccess();
    fireBirthdayConfetti();
  };

  const handleDeleteMemory = (id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
    deleteMemoryFromDB(id).catch(() => {});
  };

  const handleRedeemCoupon = (id: string) => {
    setCoupons((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            isRedeemed: true,
            redeemedAt: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          };
        }
        return c;
      })
    );
  };

  const handleResetCoupons = () => {
    setCoupons((prev) => prev.map((c) => ({ ...c, isRedeemed: false, redeemedAt: undefined })));
  };

  const handleResetDefaults = () => {
    setConfig(initialBirthdayConfig);
    setMemories(initialMemories);
    setCoupons(initialCoupons);
    localStorage.removeItem('dudu_bubu_birthday_config_v4');
    localStorage.removeItem('dudu_bubu_birthday_memories_v4');
    localStorage.removeItem('dudu_bubu_birthday_coupons_v4');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-rose-50/50 via-white to-pink-50/40 text-stone-800 antialiased selection:bg-rose-200 selection:text-rose-900">
      {/* Drifting petals in background */}
      <RomanticPetalsBackground />

      {/* STEP 1: Passcode Gate (1710 for Aditi's 18th Birthday) */}
      {!isUnlocked ? (
        <PasscodeGate onUnlock={handleUnlockPasscode} correctPasscode="1710" />
      ) : !hasOpenedEnvelope ? (
        /* STEP 2: Interactive Wax-Sealed Envelope */
        <EnvelopeIntro
          recipientName={config.girlfriendNickname || config.girlfriendName}
          senderName={config.boyfriendName}
          onOpen={() => {
            setHasOpenedEnvelope(true);
            setIsMusicPlaying(true);
          }}
        />
      ) : (
        /* STEP 3: Complete Birthday Wonderland */
        <>
          <TopNav
            girlfriendNickname={config.girlfriendNickname || config.girlfriendName}
            onOpenCustomize={() => setIsCustomizeOpen(true)}
            isPresentMode={isPresentMode}
            onTogglePresentMode={() => setIsPresentMode(!isPresentMode)}
            onToggleMusic={handleToggleMusic}
            isMusicPlaying={isMusicPlaying}
          />

          <main>
            {/* Hero Section with 2 Years Long Distance Celebration */}
            <HeroSection
              config={config}
              onOpenLetter={() => setIsLetterOpen(true)}
              memories={memories}
              onUploadClick={() => {
                const galleryEl = document.getElementById('memories');
                galleryEl?.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* Cute Vintage Polaroid Photo Reel of Aditi */}
            <CutePhotoStrip
              girlfriendName={config.girlfriendName}
              memories={memories}
              onUploadMultiple={handleUploadMultipleFiles}
              isUploading={isUploading}
            />

            {/* Interactive Candle Blowing & Cake Cutting (Golden 18 Candle) */}
            <CakeCeremony
              girlfriendName={config.girlfriendName}
              turningAge={config.turningAge}
            />

            {/* Trendy Dudu & Bubu Cartoon Moments Showcase */}
            <DuduBubuShowcase
              girlfriendNickname={config.girlfriendNickname || config.girlfriendName}
            />

            {/* Aditi's Cherished Photo & Video Vault (Bento Gallery) */}
            <MemoriesGallery
              memories={memories}
              onAddMemory={handleAddMemory}
              onAddMultipleMemories={handleAddMultipleMemories}
              onDeleteMemory={handleDeleteMemory}
              girlfriendName={config.girlfriendName}
            />

            {/* Long Distance "Open When..." Letters */}
            <OpenWhenLetters
              letters={initialSecretLetters}
              girlfriendName={config.girlfriendName}
            />

            {/* 18 Reasons Why I Love You (One for each year) */}
            <ReasonsWhy
              reasons={reasonsWhyILoveYou}
              girlfriendName={config.girlfriendName}
            />

            {/* Long Distance Love Coupons */}
            <LoveCoupons
              coupons={coupons}
              onRedeemCoupon={handleRedeemCoupon}
              onResetCoupons={handleResetCoupons}
              girlfriendName={config.girlfriendName}
            />
          </main>

          <FooterSection
            config={config}
            onOpenLetter={() => setIsLetterOpen(true)}
            onOpenCustomize={() => setIsCustomizeOpen(true)}
            isPresentMode={isPresentMode}
          />

          <MusicPlayerBar
            isPlaying={isMusicPlaying}
            onTogglePlay={handleToggleMusic}
            girlfriendNickname={config.girlfriendNickname || config.girlfriendName}
          />

          <LoveLetterModal
            isOpen={isLetterOpen}
            onClose={() => setIsLetterOpen(false)}
            config={config}
          />

          <CustomizeModal
            isOpen={isCustomizeOpen}
            onClose={() => setIsCustomizeOpen(false)}
            config={config}
            onSaveConfig={(newConfig) => setConfig(newConfig)}
            memories={memories}
            onDeleteMemory={handleDeleteMemory}
            onAddMemory={handleAddMemory}
            onResetDefaults={handleResetDefaults}
            onEnterPresentMode={() => setIsPresentMode(true)}
          />
        </>
      )}
    </div>
  );
}
