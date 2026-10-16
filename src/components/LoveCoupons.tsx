import React, { useState } from 'react';
import { motion } from 'motion/react';
import { HeartHandshake, IceCream, Crown, Film, Sparkles, Smile, Check, RotateCcw } from 'lucide-react';
import { LoveCoupon } from '../types';
import { romanticAudio } from '../utils/audio';
import { fireHeartConfetti } from '../utils/confetti';

interface LoveCouponsProps {
  coupons: LoveCoupon[];
  onRedeemCoupon: (id: string) => void;
  onResetCoupons: () => void;
  girlfriendName: string;
}

export const LoveCoupons: React.FC<LoveCouponsProps> = ({
  coupons,
  onRedeemCoupon,
  onResetCoupons,
  girlfriendName
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-rose-500" />;
      case 'IceCream': return <IceCream className="w-5 h-5 text-amber-500" />;
      case 'Crown': return <Crown className="w-5 h-5 text-yellow-500" />;
      case 'Film': return <Film className="w-5 h-5 text-indigo-500" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-pink-500" />;
      case 'Smile': return <Smile className="w-5 h-5 text-emerald-500" />;
      default: return <Sparkles className="w-5 h-5 text-rose-500" />;
    }
  };

  const handleRedeem = (id: string, isAlreadyRedeemed: boolean) => {
    if (isAlreadyRedeemed) return;
    romanticAudio.playHeartPop();
    fireHeartConfetti();
    onRedeemCoupon(id);
  };

  return (
    <section id="coupons" className="py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-rose-500">
            Redeemable Any Day
          </span>
          <h2 className="font-romantic text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
            Love Coupons for {girlfriendName}
          </h2>
          <p className="text-stone-600 text-sm mt-1">
            Valid forever with no expiration date. Click any coupon to redeem it on demand!
          </p>
        </div>

        <button
          onClick={onResetCoupons}
          className="text-xs text-stone-600 hover:text-stone-800 flex items-center gap-1.5 underline cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset redeemed coupons</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className={`relative rounded-3xl p-6 border transition-all duration-300 flex flex-col justify-between overflow-hidden ${
              coupon.isRedeemed
                ? 'bg-stone-50 border-stone-200/80 opacity-75'
                : 'bg-white border-rose-100 shadow-sm hover:shadow-lg hover:-translate-y-1'
            }`}
          >
            {/* Cutout notch effect like real tickets */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-rose-50/50 border-r border-rose-100 pointer-events-none" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-rose-50/50 border-l border-rose-100 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                  {getIcon(coupon.icon)}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-600 font-semibold">
                  #LOVE-PASS
                </span>
              </div>

              <h3 className="font-romantic text-xl font-bold text-stone-900 mb-2">
                {coupon.title}
              </h3>
              <p className="text-stone-600 text-xs leading-relaxed">
                {coupon.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-dashed border-rose-200/80 flex items-center justify-between">
              {coupon.isRedeemed ? (
                <div className="w-full flex items-center justify-between">
                  <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Redeemed With Love!</span>
                  </span>
                  <span className="text-[10px] text-stone-600 font-mono">
                    {coupon.redeemedAt || 'Today'}
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => handleRedeem(coupon.id, coupon.isRedeemed)}
                  className="w-full py-2.5 bg-rose-50 hover:bg-rose-500 hover:text-white text-rose-700 font-semibold text-xs rounded-xl border border-rose-200 hover:border-transparent transition-all cursor-pointer text-center"
                >
                  Redeem Coupon
                </button>
              )}
            </div>

            {/* Red stamp if redeemed */}
            {coupon.isRedeemed && (
              <div className="absolute top-4 right-4 pointer-events-none transform rotate-12 border-2 border-rose-600 rounded px-2 py-0.5 text-[10px] font-black text-rose-600 uppercase tracking-widest opacity-80">
                REDEEMED
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
