import React, { useState } from 'react';
import { Plus, Minus, Check, ShoppingBag, Flame, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatRupiah } from '../utils/whatsapp';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [withLontong, setWithLontong] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const unitPrice = withLontong
    ? product.basePrice + (product.addonPrice || 0)
    : product.basePrice;

  const totalPrice = unitPrice * qty;

  const handleAddToCart = () => {
    if (!product.isAvailable) return;

    addToCart(product, qty, withLontong);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1200);
  };

  const incrementQty = () => setQty((prev) => prev + 1);
  const decrementQty = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="bg-[#FFFDF9] rounded-2xl sm:rounded-3xl border border-[#E8D2B5] shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between">
      {/* Top Image & Badges */}
      <div>
        <div className="relative h-32 sm:h-64 overflow-hidden bg-neutral-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />

          {/* Availability Badge */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-wrap gap-1 sm:gap-1.5">
            {product.isAvailable ? (
              <span className="bg-[#4A151D]/90 backdrop-blur-sm text-[#FAF4E8] text-[9px] sm:text-[11px] font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border border-[#E5A93C]/40">
                Fresh
              </span>
            ) : (
              <span className="bg-neutral-800 text-neutral-300 text-[9px] sm:text-[11px] font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full">
                Habis
              </span>
            )}
            {product.badges?.slice(0, 1).map((badge, idx) => (
              <span
                key={idx}
                className="bg-[#D33A2C] text-white text-[9px] sm:text-[11px] font-bold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-sm"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Unit tag */}
          <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-black/70 backdrop-blur-sm text-white text-[9px] sm:text-xs font-semibold px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded-md sm:rounded-lg">
            {product.unit}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-2.5 sm:p-6 space-y-2 sm:space-y-3.5">
          <div>
            <div className="flex items-center justify-between gap-1 mb-0.5">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#D33A2C]">
                {product.category}
              </span>
            </div>
            <h3 className="font-heading text-sm sm:text-2xl font-bold text-[#241718] line-clamp-1 sm:line-clamp-none">
              {product.name}
            </h3>
            <p className="text-[11px] sm:text-sm text-neutral-600 leading-snug line-clamp-2 sm:line-clamp-none mt-0.5 sm:mt-1">
              {product.description}
            </p>
          </div>

          {/* Add-on Toggle (Khusus Sate Taichan - Opsi Lontong) */}
          {product.hasAddon && (
            <div
              onClick={() => setWithLontong(!withLontong)}
              className={`p-1.5 sm:p-3.5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer select-none active:scale-[0.98] touch-manipulation ${
                withLontong
                  ? 'bg-[#F4ECE1] border-[#4A151D] shadow-2xs'
                  : 'bg-[#FAF4E8] border-[#E8D2B5] hover:border-[#D9C8B0]'
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
                  <div
                    className={`w-4 h-4 sm:w-5 sm:h-5 rounded-md flex items-center justify-center border transition-colors shrink-0 ${
                      withLontong
                        ? 'bg-[#4A151D] border-[#4A151D] text-white'
                        : 'bg-white border-[#D9C8B0]'
                    }`}
                  >
                    {withLontong && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="text-[11px] sm:text-sm font-bold text-[#241718] truncate">
                    {product.addonName || '+ Lontong'}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-black text-[#4A151D] bg-[#FFFDF9] px-1.5 py-0.5 rounded-lg border border-[#E8D2B5] shrink-0">
                  +{formatRupiah(product.addonPrice)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Stepper & CTA */}
      <div className="p-2.5 sm:p-6 pt-0 space-y-2 sm:space-y-3">
        {/* Price & Quantity Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 pt-2 border-t border-neutral-100">
          <div>
            <span className="text-[10px] sm:text-xs text-neutral-500 block leading-none">Harga:</span>
            <div className="font-heading text-sm sm:text-2xl font-extrabold text-[#4A151D] mt-0.5">
              {formatRupiah(unitPrice)}
            </div>
          </div>

          {/* Quantity Stepper (Mobile Touch Optimized) */}
          <div className="flex items-center justify-between sm:justify-start gap-1 bg-[#FAF4E8] border border-[#E8D2B5] rounded-xl p-0.5 sm:p-1 select-none w-full sm:w-auto">
            <button
              onClick={decrementQty}
              disabled={qty <= 1 || !product.isAvailable}
              aria-label="Kurangi Jumlah"
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg bg-white text-[#4A151D] hover:bg-neutral-100 active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs transition-transform touch-manipulation"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="flex-1 sm:w-7 text-center font-bold text-xs sm:text-sm text-[#241718] tabular-nums">
              {qty}
            </span>
            <button
              onClick={incrementQty}
              disabled={!product.isAvailable}
              aria-label="Tambah Jumlah"
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg bg-[#4A151D] text-white hover:bg-[#370F15] active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed shadow-2xs transition-transform touch-manipulation"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.isAvailable}
          className={`btn-tactile w-full min-h-[38px] sm:min-h-[48px] py-2 sm:py-3.5 px-2 sm:px-4 rounded-xl sm:rounded-2xl font-heading font-bold text-xs sm:text-base flex items-center justify-center gap-1.5 sm:gap-2 select-none touch-manipulation shadow-sm transition-all ${
            justAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-[#4A151D] hover:bg-[#370F15] text-[#FAF4E8]'
          } disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed`}
        >
          {justAdded ? (
            <>
              <Check className="w-4 h-4 text-white animate-scale" />
              <span>Ditambahkan!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>+ Pesan</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
