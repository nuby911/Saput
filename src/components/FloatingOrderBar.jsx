import React, { useState } from 'react';
import { MessageCircle, ShoppingBag, ChevronUp, ChevronDown, Trash2, Plus, Minus, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatRupiah, generateWhatsAppOrderUrl } from '../utils/whatsapp';

export default function FloatingOrderBar() {
  const { cart, totalItems, totalPrice, updateQty, removeFromCart, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  if (totalItems === 0) return null;

  const whatsappUrl = generateWhatsAppOrderUrl(cart);

  const handleCheckout = () => {
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Detail Slide-up Drawer Modal when open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-[#FFFDF9] w-full max-w-lg rounded-t-[2rem] sm:rounded-3xl border border-[#E8D2B5] shadow-2xl p-5 sm:p-6 max-h-[85vh] flex flex-col justify-between pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Drag Indicator */}
            <div className="w-12 h-1.5 rounded-full bg-neutral-300 mx-auto mb-3 sm:hidden" />
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#4A151D]" />
                <h3 className="font-heading text-lg font-bold text-[#241718]">
                  Rincian Pesanan Kamu ({totalItems} item)
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-neutral-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Item list */}
            <div className="divide-y divide-neutral-100 overflow-y-auto py-2 my-2 space-y-3">
              {cart.map((item) => (
                <div key={item.cartKey} className="pt-3 first:pt-0 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-xl object-cover bg-neutral-100"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-[#241718] leading-tight">
                        {item.name}
                      </h4>
                      {item.withAddon && (
                        <span className="text-[11px] text-[#D33A2C] font-semibold block">
                          + {item.addonName}
                        </span>
                      )}
                      <span className="text-xs text-neutral-500 font-medium">
                        {formatRupiah(item.unitPrice)} x {item.qty} = <b className="text-[#4A151D]">{formatRupiah(item.unitPrice * item.qty)}</b>
                      </span>
                    </div>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1.5 bg-[#FAF4E8] border border-[#E8D2B5] rounded-lg p-1 shrink-0">
                    <button
                      onClick={() => updateQty(item.cartKey, item.qty - 1)}
                      className="w-6 h-6 flex items-center justify-center rounded bg-white text-neutral-700 hover:bg-neutral-100 shadow-xs"
                      aria-label="Kurangi"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-[#241718]">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.cartKey, item.qty + 1)}
                      className="w-6 h-6 flex items-center justify-center rounded bg-[#4A151D] text-white hover:bg-[#370F15] shadow-xs"
                      aria-label="Tambah"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.cartKey)}
                      className="ml-1 text-neutral-400 hover:text-red-500 p-1"
                      title="Hapus"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Bottom action */}
            <div className="pt-3 border-t border-neutral-200 space-y-3">
              <div className="flex items-center justify-between">
                <button
                  onClick={clearCart}
                  className="text-xs text-neutral-400 hover:text-red-600 font-medium underline"
                >
                  Kosongkan Semua
                </button>
                <div className="text-right">
                  <span className="text-xs text-neutral-500 block">Total Akhir:</span>
                  <span className="font-heading text-xl font-black text-[#4A151D]">
                    {formatRupiah(totalPrice)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="btn-tactile w-full min-h-[50px] py-3.5 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-heading font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20 touch-manipulation select-none"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Lanjut Pesan ke WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Bar (Always fixed at bottom when items > 0) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#4A151D] text-[#FAF4E8] border-t-2 border-[#E5A93C] shadow-2xl px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
          
          {/* Left summary & toggle button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="relative bg-[#370F15] p-2 rounded-xl border border-[#E5A93C]/40">
              <ShoppingBag className="w-5 h-5 text-[#E5A93C]" />
              <span className="absolute -top-1.5 -right-1.5 bg-[#D33A2C] text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#4A151D]">
                {totalItems}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-[11px] text-[#E8D2B5] font-semibold">
                <span>Rincian Pesanan</span>
                {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
              </div>
              <div className="font-heading text-base sm:text-lg font-black text-[#FAF4E8]">
                {formatRupiah(totalPrice)}
              </div>
            </div>
          </button>

          {/* Right: Checkout Button via WA */}
          <button
            onClick={handleCheckout}
            className="btn-tactile flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-heading font-extrabold text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl shadow-lg shadow-[#25D366]/25"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Pesan via WA</span>
          </button>

        </div>
      </div>
    </>
  );
}
