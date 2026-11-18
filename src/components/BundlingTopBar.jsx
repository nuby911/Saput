import React from 'react';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { formatRupiah } from '../utils/whatsapp.js';

export default function BundlingTopBar({ comboProduct }) {
  if (!comboProduct) return null;

  const scrollToCombo = () => {
    const el = document.getElementById('combo-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const normalPrice = comboProduct.normalPrice || 0;
  const savings = normalPrice > comboProduct.basePrice ? normalPrice - comboProduct.basePrice : 0;

  return (
    <div
      onClick={scrollToCombo}
      className="bg-gradient-to-r from-[#D33A2C] via-[#E5A93C] to-[#D33A2C] text-[#370F15] py-2 px-4 sm:px-6 lg:px-8 shadow-md border-b border-[#E5A93C]/60 cursor-pointer hover:opacity-95 active:opacity-90 select-none transition-opacity sticky top-[68px] sm:top-[74px] z-30"
    >
      <div className="max-w-6xl xl:max-w-7xl mx-auto flex items-center justify-between text-xs sm:text-sm font-bold gap-2">
        <div className="flex items-center gap-2 truncate">
          <span className="bg-[#4A151D] text-[#E5A93C] text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full uppercase shrink-0 flex items-center gap-1 shadow-2xs">
            <Flame className="w-3 h-3 text-[#D33A2C] fill-[#D33A2C]" />
            {savings > 0 ? `Hemat ${formatRupiah(savings)}` : 'Promo Bundling'}
          </span>
          <span className="truncate text-[#370F15] font-extrabold text-[11px] sm:text-sm">
            🎉 Ada <b>{comboProduct.name}</b> Cuma <b className="text-[#4A151D] underline">{formatRupiah(comboProduct.basePrice)}</b>!
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0 text-[#4A151D] font-extrabold text-[11px] sm:text-xs bg-white/50 hover:bg-white/70 px-2.5 py-1 rounded-lg border border-white/50 transition-colors">
          <span>Lihat Paket</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
}
