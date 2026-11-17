import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Check, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatRupiah } from '../utils/whatsapp';

export default function ComboSection({ comboProduct }) {
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  if (!comboProduct) return null;

  const normalPrice = comboProduct.normalPrice || 0;
  const savings = normalPrice > comboProduct.basePrice ? normalPrice - comboProduct.basePrice : 0;

  const handleAddCombo = () => {
    addToCart(comboProduct, 1, false);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1200);
  };

  return (
    <section className="my-8 sm:my-10">
      <div className="relative overflow-hidden bg-gradient-to-r from-[#4A151D] via-[#5D1B26] to-[#4A151D] text-[#FAF4E8] rounded-3xl p-5 sm:p-8 border-2 border-[#E5A93C] shadow-xl">
        {/* Decorative corner tag */}
        <div className="absolute -top-1 -right-1 bg-[#E5A93C] text-[#370F15] text-[11px] sm:text-xs font-black px-3.5 sm:px-4 py-1.5 rounded-bl-2xl shadow-md uppercase tracking-wider">
          {savings > 0 ? `⭐ Lebih Hemat ${formatRupiah(savings)}` : '⭐ Rekomendasi Menu Komplit'}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left: Info & Description */}
          <div className="md:col-span-7 space-y-3">
            <div className="flex items-center gap-2">
              {savings > 0 ? (
                <span className="bg-[#D33A2C] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Flame className="w-3 h-3 fill-white" />
                  HEMAT {formatRupiah(savings)}
                </span>
              ) : (
                <span className="bg-[#E5A93C] text-[#370F15] text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Paket Komplit
                </span>
              )}
              <span className="text-xs text-[#E5A93C] font-semibold">
                Menu Bundling Favorit
              </span>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-black text-[#FAF4E8]">
              {comboProduct.name}
            </h3>

            <p className="text-sm text-[#E8D2B5] leading-relaxed">
              {comboProduct.description}
            </p>

            {/* Content Pills */}
            <div className="flex flex-wrap gap-2 text-xs font-medium text-[#FAF4E8]">
              <span className="bg-black/30 border border-white/10 px-3 py-1 rounded-lg">
                🍢 1 Porsi Sate Taichan (10 Tusuk)
              </span>
              <span className="bg-black/30 border border-white/10 px-3 py-1 rounded-lg">
                🍚 1 Lontong Pulen
              </span>
              <span className="bg-black/30 border border-white/10 px-3 py-1 rounded-lg">
                🍧 1 Cup Es Puding Segar
              </span>
            </div>
          </div>

          {/* Right: Pricing & CTA */}
          <div className="md:col-span-5 bg-[#370F15]/90 border border-[#E5A93C]/30 p-5 rounded-2xl flex flex-col justify-between items-center text-center space-y-3">
            <div>
              {normalPrice > comboProduct.basePrice && (
                <span className="text-xs text-neutral-400 line-through block">
                  Harga Normal: {formatRupiah(normalPrice)}
                </span>
              )}
              <div className="font-heading text-3xl font-black text-[#E5A93C]">
                {formatRupiah(comboProduct.basePrice)}
              </div>
              <span className="text-[11px] text-[#FAF4E8] opacity-80">
                Sudah komplit makan + minum
              </span>
            </div>

            <button
              onClick={handleAddCombo}
              className={`btn-tactile w-full min-h-[48px] py-3 px-4 rounded-xl font-heading font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md select-none touch-manipulation active:scale-[0.98] ${
                justAdded
                  ? 'bg-emerald-500 text-white'
                  : 'bg-[#E5A93C] hover:bg-[#d4962c] text-[#370F15]'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Combo Masuk Keranjang!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Pesan Paket Combo Sekarang</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
