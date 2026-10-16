import { BirthdayConfig, MemoryItem, LoveCoupon, SecretLetter } from '../types';

export const initialBirthdayConfig: BirthdayConfig = {
  girlfriendName: "Aditi",
  girlfriendNickname: "Jaan",
  boyfriendName: "Subhan",
  birthdayDate: "2026-10-17", // Her birthday is 17/10 (17th October)
  anniversaryDate: "2024-10-17", // 2 years together
  turningAge: 18,
  heroHeadline: "Happy 18th Birthday, My Beautiful Jaan, Aditi",
  heroSubtitle: "2 whole years of long distance love, countless miles between us, yet my heart has never felt closer to anyone. Today, tomorrow, and forever, Subhan loves Aditi with all his heart.",
  mainLoveLetter: `To my dearest Aditi (my Jaan, my Bubu),

Happy 18th Birthday, my love! 🎉✨

We have been together for 2 whole years across this long distance, and not a single mile has ever made me love you any less. If anything, every call at 12:42 AM, every screen kiss, and every sweet goodnight message has proven that our bond is unbreakable.

Seeing you turn 18 today makes my heart so full. You are the prettiest, sweetest girl in the entire world, and the absolute queen of my heart.

I know being miles apart on special days isn't easy, but close your eyes and feel my arms around you. I am sending you the biggest, warmest bear hug. Soon, all these miles will just be a story we tell while holding hands for real.

Happy 18th Birthday, Princess! Forever and always yours,
Subhan (Your Dudu) ❤️`,
  romanticVows: [
    "I promise that no distance, no matter how many miles, will ever weaken my love for you.",
    "I promise to always answer your calls, my Jaan, even at 12:42 AM.",
    "I promise to keep counting down every second until we close the distance and hold hands forever.",
    "I promise to sketch and admire your beautiful smile every single day.",
    "I promise to pamper my 18-year-old queen with endless love, snacks, and sweet cuddles."
  ]
};

export const initialMemories: MemoryItem[] = [
  {
    id: 'mem-18th-bubu',
    type: 'image',
    url: '/src/assets/images/dudu_bubu_18th_birthday_1792162420500.jpg',
    title: 'Happy 18th Birthday Princess Aditi!',
    caption: 'Bubu wearing her golden princess crown and Dudu celebrating with golden number 18 balloons and cake!',
    date: '18th Milestone',
    location: 'Wonderland',
    category: 'funny',
    likesCount: 999
  },
  {
    id: 'mem-cake-bubu',
    type: 'image',
    url: '/src/assets/images/dudu_bubu_cake_hero_1792160607810.jpg',
    title: 'Strawberry Birthday Cake Ceremony',
    caption: 'Dudu and Bubu sharing sweet strawberry cake with glowing candles and sparkles for Aditi’s 18th!',
    date: '17th October (17/10)',
    location: 'Sweetest Corner',
    category: 'funny',
    likesCount: 940
  },
  {
    id: 'mem-hug',
    type: 'image',
    url: '/src/assets/images/dudu_bubu_hug_love_1792160608866.jpg',
    title: 'Warm Bear Hug Across The Miles',
    caption: 'Distance means so little when someone means so much. Dudu & Bubu holding each other tight.',
    date: '2 Years Long Distance',
    location: 'Safe in Love',
    category: 'couple',
    likesCount: 1250
  },
  {
    id: 'mem-balloons',
    type: 'image',
    url: '/src/assets/images/dudu_bubu_balloons_gift_1792160610519.jpg',
    title: 'Special Birthday Delivery for Aditi',
    caption: 'Carrying pastel balloons and a special gift box wrapped with love from Subhan.',
    date: 'Special Delivery',
    location: 'To Aditi’s Doorstep',
    category: 'funny',
    likesCount: 880
  },
  {
    id: 'mem-sketch',
    type: 'image',
    url: '/src/assets/images/romantic_drawing_sketch_1792162421134.jpg',
    title: 'Sketching My Muse — I Love You Jaan',
    caption: 'Subhan sketching late at night under the cozy desk lamp: "You are my today and all of my tomorrows."',
    date: 'Late Night Art',
    location: 'Subhan’s Art Desk',
    category: 'couple',
    likesCount: 1100
  }
];

export const initialCoupons: LoveCoupon[] = [
  {
    id: 'c-1',
    title: 'The Long Distance Airport Hug',
    description: 'The first hug when we meet — tight, forever long, and never letting go.',
    icon: 'HeartHandshake',
    isRedeemed: false
  },
  {
    id: 'c-2',
    title: 'All-Night 12:42 AM Call & Sleep Date',
    description: 'Falling asleep on call together, zero rush, talking until morning light.',
    icon: 'IceCream',
    isRedeemed: false
  },
  {
    id: 'c-3',
    title: '18th Birthday Queen Treatment When We Meet',
    description: 'Zero chores, favorite food feast, princess treatment all day long for Aditi.',
    icon: 'Crown',
    isRedeemed: false
  },
  {
    id: 'c-4',
    title: 'Virtual Watch Party — Jaan Picks the Show',
    description: 'Synced movie date with popcorn and sweet calls, even from miles away.',
    icon: 'Film',
    isRedeemed: false
  },
  {
    id: 'c-5',
    title: 'Surprise Care Package Delivery',
    description: 'Your favorite chocolates, sweet handwritten notes, and cuddly surprises.',
    icon: 'Sparkles',
    isRedeemed: false
  },
  {
    id: 'c-6',
    title: 'The "Aditi Is Always Right" Golden Pass',
    description: 'Instant win for any silly debate. You win guaranteed, my Jaan!',
    icon: 'Smile',
    isRedeemed: false
  }
];

export const initialSecretLetters: SecretLetter[] = [
  {
    id: 'sl-1',
    triggerTitle: 'Open When The Distance Feels Too Hard',
    subtitle: 'When the miles feel heavy',
    preview: 'Take a deep breath, Jaan, and hold your phone to your heart...',
    content: `My sweet Aditi,

I know some nights the distance feels heavy and you just wish I was there to hold your hand in person. 

Please remember: this physical distance is only temporary, but what we have is forever. 2 years of loving you across the miles has only proven that nothing in this world can shake what Subhan and Aditi share.

Close your eyes. Imagine my arms wrapped around you, whispering that you are safe and loved. Send me a quick text and I'll call you right away. I love you more than all the miles between us!`,
    color: 'from-rose-50 to-pink-100',
    icon: 'Heart'
  },
  {
    id: 'sl-2',
    triggerTitle: 'Open When You Had a Tough Day',
    subtitle: 'When you need comfort',
    preview: 'You are so strong, but you never have to carry it alone...',
    content: `My brave girl Aditi,

I am so proud of how hard you try, how deeply you care, and the graceful way you handle everything. 

Today may have been exhausting, but please remember: you are not your tough days. You are pure kindness, warmth, and sunshine. Let go of whatever happened today. Slip into your comfiest clothes, drink some warm water or tea, and let Subhan take care of you over the phone tonight.

You are safe with me, always and forever.`,
    color: 'from-amber-50 to-orange-100',
    icon: 'Sun'
  },
  {
    id: 'sl-3',
    triggerTitle: 'Open Right Now On Your 18th Birthday (17/10)!',
    subtitle: '17th October 18th Birthday Message',
    preview: 'Today my whole world turns 18...',
    content: `HAPPY 18TH BIRTHDAY MY BEAUTIFUL JAAN, ADITI! 🎉🎂✨

Today is 17/10 — the most special day in the entire calendar! The day the universe blessed this world with the sweetest soul, the prettiest smile, and the girl who turned my whole life into poetry.

2 years of being in love with you has been the greatest adventure of my life. You are officially 18 now, and I couldn't be prouder of the graceful, radiant queen you are.

Even with the distance today, my entire heart is right there beside you. Eat lots of cake, smile until your cheeks hurt, and remember: Subhan loves Aditi with all his soul!`,
    color: 'from-pink-50 to-purple-100',
    icon: 'PartyPopper'
  },
  {
    id: 'sl-4',
    triggerTitle: 'Open When You Count Down to Seeing Me',
    subtitle: 'A sweet reminder of our next hug',
    preview: 'Every single second brings us closer to being together...',
    content: `My dearest Aditi,

Every day apart is one day closer to the moment I see you walking towards me, and I can finally pull you into the tightest, longest hug in the world.

No screens, no bad connection, no delays — just you and me. That day is coming, and it's going to be the most magical day of our lives.

Until then, remember that every beat of my heart belongs to you. Subhan is forever yours.`,
    color: 'from-emerald-50 to-teal-100',
    icon: 'Sparkle'
  }
];

export const reasonsWhyILoveYou = [
  "Your breathtaking smile that instantly lights up my entire universe.",
  "How you make 2 years of long distance feel so warm, safe, and deeply meaningful.",
  "Your adorable sleepy voice when we stay up talking on the phone at 12:42 AM.",
  "The cute little nose scrunch you do whenever you laugh really hard.",
  "How you call me 'Jaan' and make all my worries disappear in seconds.",
  "The kindness, purity, and gentle grace of your beautiful heart.",
  "How comfortable and at home I feel whenever I talk to you.",
  "How fiercely and sincerely you care about the people you love.",
  "The soft, sweet way you say 'I love you' over the phone that melts my heart.",
  "Your playful, cute, and goofy mood that always makes me laugh.",
  "How you are my favorite muse to sketch, write about, and dream about.",
  "The sound of your laugh — my absolute favorite melody in the world.",
  "How you stay strong and loving through all the miles between us.",
  "The cute selfies and videos you send me that brighten my darkest days.",
  "The promise written on our hearts: 'You are my today and all of my tomorrows.'",
  "How excited you get when sharing your day with me.",
  "How our bond only grows stronger despite being miles apart.",
  "Simply because you are my Aditi, my Jaan, my Bubu — 18 today and loved for eternity."
];
