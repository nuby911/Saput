import React, { useState } from 'react';
import { Plus, Minus, Check, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { formatRupiah } from '../utils/whatsapp.js';

export default function ExtraAddonCard({ addonItem }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  if (!addonItem) return null;

  const handleAddToCart = () => {
    addToCart(addonItem, qty);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1200);
  };

  const incrementQty = () => setQty((prev) => prev + 1);
  const decrementQty = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="mt-4 sm:mt-6 bg-[#FFFDF9] rounded-2xl sm:rounded-3xl border border-[#E8D2B5] p-3.5 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
        
        {/* Left: Info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#FAF4E8] border border-[#E8D2B5] flex items-center justify-center text-2xl sm:text-3xl shrink-0 shadow-2xs">
            🍚
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#D33A2C]">
                Menu Tambahan
              </span>
              <span className="bg-[#4A151D] text-[#E5A93C] text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full">
                Bisa Tambah Berapapun
              </span>
            </div>
            <h4 className="font-heading text-sm sm:text-lg font-bold text-[#241718]">
              {addonItem.name || 'Tambah Lontong Pulen'}
            </h4>
            <p className="text-[11px] sm:text-xs text-neutral-500 leading-snug">
              Porsi sate sudah dapat 1 lontong. Tambah ekstra lontong satuan jika ingin lebih kenyang!
            </p>
          </div>
        </div>

        {/* Right: Price, Stepper & Button */}
        <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-4 pt-2.5 md:pt-0 border-t md:border-t-0 border-neutral-100 shrink-0">
          <div>
            <span className="text-[10px] sm:text-xs text-neutral-400 block leading-none">Harga Satuan:</span>
            <div className="font-heading text-sm sm:text-xl font-black text-[#4A151D] mt-0.5">
              {formatRupiah(addonItem.basePrice || 3000)}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-1 bg-[#FAF4E8] border border-[#E8D2B5] rounded-xl p-0.5 select-none">
              <button
                onClick={decrementQty}
                disabled={qty <= 1}
                aria-label="Kurangi Lontong"
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg bg-white text-[#4A151D] hover:bg-neutral-100 active:scale-90 disabled:opacity-40 shadow-2xs transition-transform"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center font-bold text-xs sm:text-sm text-[#241718] tabular-nums">
                {qty}
              </span>
              <button
                onClick={incrementQty}
                aria-label="Tambah Lontong"
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg bg-[#4A151D] text-white hover:bg-[#370F15] active:scale-90 shadow-2xs transition-transform"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>

            {/* Add Button */}
            <button
              onClick={handleAddToCart}
              className={`btn-tactile min-h-[36px] sm:min-h-[42px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm transition-all select-none touch-manipulation ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#4A151D] hover:bg-[#370F15] text-[#FAF4E8]'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white animate-scale" />
                  <span>+{qty} Ditambahkan!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>+ Tambah Lontong</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
