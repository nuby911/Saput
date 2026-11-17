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
    <div className="bg-[#FFFDF9] rounded-3xl border border-[#E8D2B5] shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between">
      {/* Top Image & Badges */}
      <div>
        <div className="relative h-56 sm:h-64 overflow-hidden bg-neutral-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />

          {/* Availability Badge */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {product.isAvailable ? (
              <span className="bg-[#4A151D]/90 backdrop-blur-sm text-[#FAF4E8] text-[11px] font-bold px-3 py-1 rounded-full border border-[#E5A93C]/40">
                Tersedia Fresh
              </span>
            ) : (
              <span className="bg-neutral-800 text-neutral-300 text-[11px] font-bold px-3 py-1 rounded-full">
                Habis Hari Ini
              </span>
            )}
            {product.badges?.map((badge, idx) => (
              <span
                key={idx}
                className="bg-[#D33A2C] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Unit tag */}
          <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-lg">
            {product.unit}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 space-y-3.5">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D33A2C]">
                {product.category}
              </span>
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#241718] text-balance">
              {product.name}
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed mt-1">
              {product.description}
            </p>
          </div>

          {/* Add-on Toggle (Khusus Sate Taichan - Opsi Lontong) */}
          {product.hasAddon && (
            <div
              onClick={() => setWithLontong(!withLontong)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer select-none active:scale-[0.99] touch-manipulation ${
                withLontong
                  ? 'bg-[#F4ECE1] border-[#4A151D] shadow-xs'
                  : 'bg-[#FAF4E8] border-[#E8D2B5] hover:border-[#D9C8B0]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
                      withLontong
                        ? 'bg-[#4A151D] border-[#4A151D] text-white'
                        : 'bg-white border-[#D9C8B0]'
                    }`}
                  >
                    {withLontong && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#241718] block leading-tight">
                      {product.addonName}
                    </span>
                    <span className="text-xs text-neutral-500">
                      Tekstur lembut, pas pengenyang sate
                    </span>
                  </div>
                </div>
                <span className="text-xs font-extrabold text-[#4A151D] bg-[#FFFDF9] px-2.5 py-1 rounded-xl border border-[#E8D2B5] shadow-2xs">
                  +{formatRupiah(product.addonPrice)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer: Stepper & CTA */}
      <div className="p-4 sm:p-6 pt-0 space-y-3">
        {/* Price & Quantity Selector */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
          <div>
            <span className="text-xs text-neutral-500 block">Harga Satuan:</span>
            <div className="font-heading text-xl sm:text-2xl font-extrabold text-[#4A151D]">
              {formatRupiah(unitPrice)}
            </div>
          </div>

          {/* Quantity Stepper (Mobile Touch Optimized) */}
          <div className="flex items-center gap-1.5 bg-[#FAF4E8] border border-[#E8D2B5] rounded-2xl p-1 select-none">
            <button
              onClick={decrementQty}
              disabled={qty <= 1 || !product.isAvailable}
              aria-label="Kurangi Jumlah"
              className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-xl bg-white text-[#4A151D] hover:bg-neutral-100 active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-transform touch-manipulation"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-bold text-sm text-[#241718] tabular-nums">
              {qty}
            </span>
            <button
              onClick={incrementQty}
              disabled={!product.isAvailable}
              aria-label="Tambah Jumlah"
              className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-xl bg-[#4A151D] text-white hover:bg-[#370F15] active:scale-90 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-transform touch-manipulation"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.isAvailable}
          className={`btn-tactile w-full min-h-[48px] py-3.5 px-4 rounded-2xl font-heading font-bold text-sm sm:text-base flex items-center justify-center gap-2 select-none touch-manipulation shadow-sm transition-all ${
            justAdded
              ? 'bg-emerald-600 text-white'
              : 'bg-[#4A151D] hover:bg-[#370F15] text-[#FAF4E8]'
          } disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed`}
        >
          {justAdded ? (
            <>
              <Check className="w-5 h-5 text-white animate-scale" />
              <span>Berhasil Ditambahkan!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>
                + Tambah ({formatRupiah(totalPrice)})
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
