export interface MemoryItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  title: string;
  caption: string;
  date: string;
  location?: string;
  category: 'solo' | 'couple' | 'trips' | 'funny';
  likesCount?: number;
}

export interface LoveCoupon {
  id: string;
  title: string;
  description: string;
  icon: string;
  isRedeemed: boolean;
  redeemedAt?: string;
}

export interface SecretLetter {
  id: string;
  triggerTitle: string;
  subtitle: string;
  preview: string;
  content: string;
  color: string;
  icon: string;
}

export interface BirthdayConfig {
  girlfriendName: string;
  girlfriendNickname: string;
  boyfriendName: string;
  birthdayDate: string; // YYYY-MM-DD
  anniversaryDate: string; // YYYY-MM-DD
  turningAge: number;
  heroHeadline: string;
  heroSubtitle: string;
  mainLoveLetter: string;
  romanticVows: string[];
  customAudioUrl?: string;
}
