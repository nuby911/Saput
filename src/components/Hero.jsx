import React from 'react';
import { Flame, Sparkles, ArrowDown, ShieldCheck, Heart } from 'lucide-react';
import { formatRupiah } from '../utils/whatsapp.js';

export default function Hero({ menuItems = [] }) {
  const sateItem = menuItems.find((m) => m.id === 'sate-taichan') || menuItems[0];
  const pudingItem = menuItems.find((m) => m.id === 'es-puding') || menuItems[1];

  const scrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#4A151D] via-[#5A1B24] to-[#FAF4E8] pt-5 pb-8 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20 px-4 sm:px-6 lg:px-8">
      {/* Decorative background subtle elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D33A2C]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#E5A93C]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl xl:max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Content (7 cols on md/lg) */}
          <div className="md:col-span-7 text-center md:text-left space-y-3.5 sm:space-y-5 lg:space-y-6">
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 bg-[#370F15]/90 border border-[#E5A93C]/40 text-[#E5A93C] px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wide shadow-sm">
              <Flame className="w-3.5 h-3.5 text-[#D33A2C] fill-[#D33A2C]" />
              <span>Duo Kuliner Paling Nagih</span>
              <span className="w-1 h-1 rounded-full bg-[#E5A93C]"></span>
              <span className="text-[#FAF4E8]">Fresh Tiap Hari</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#FAF4E8] tracking-tight leading-[1.12] text-balance">
              Pedas Gurihnya <span className="text-[#E5A93C] underline decoration-[#D33A2C] decoration-wavy decoration-2">Taichan</span>,{' '}
              Dingin Segarnya <span className="text-amber-200">Es Puding</span>.
            </h1>

            {/* Body Description */}
            <p className="text-[#E8D2B5] text-xs sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0 text-balance">
              Perpaduan legendaris yang bikin ketagihan! Daging ayam bakar lembut berpadu sambal pedas nampol khas Saput, langsung dibilas manisnya puding sutra dingin.
            </p>

            {/* Quick Feature Badges */}
            <div className="hidden sm:flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-1 text-xs text-[#FAF4E8]">
              <span className="bg-[#370F15]/70 border border-[#E5A93C]/30 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs">
                🍢 100% Fillet Daging Ayam
              </span>
              <span className="bg-[#370F15]/70 border border-[#E5A93C]/30 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs">
                🌶️ Sambal Asli Jeruk Nipis
              </span>
              <span className="bg-[#370F15]/70 border border-[#E5A93C]/30 px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xs">
                🍮 Puding Sutra Homemade
              </span>
            </div>

            {/* Call To Action Buttons */}
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
              <button
                onClick={scrollToMenu}
                className="btn-tactile w-full sm:w-auto flex items-center justify-center gap-2 bg-[#D33A2C] hover:bg-[#B3281C] text-white font-heading font-bold text-sm sm:text-base px-6 py-3.5 rounded-2xl shadow-lg shadow-[#D33A2C]/25"
              >
                <span>Lihat 2 Menu & Pesan</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>
            </div>
          </div>

          {/* Right Visual Spotlight (Shown on md & lg, hidden on mobile to keep scroll fast) */}
          <div className="hidden md:flex md:col-span-5 justify-center">
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Main Card Spotlight */}
              <div className="bg-[#FFFDF9] p-4 lg:p-5 rounded-3xl shadow-2xl border-4 border-[#FAF4E8] rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="relative h-64 sm:h-72 lg:h-80 rounded-2xl overflow-hidden bg-neutral-900 flex items-center justify-center">
                  <img
                    src={sateItem?.image || "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop"}
                    alt={sateItem?.name || "Sate Taichan"}
                    className="w-full h-full object-contain bg-black/40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-4 text-white pointer-events-none">
                    <span className="text-[11px] font-bold text-[#E5A93C] uppercase tracking-wider">
                      Signature Menu
                    </span>
                    <h3 className="font-heading text-lg lg:text-xl font-bold">
                      {sateItem?.name || "Sate Taichan"}
                    </h3>
                  </div>
                </div>

                {/* Overlapping Floating Drink Badge */}
                <div className="absolute -bottom-4 -left-2 lg:-left-4 bg-[#4A151D] text-[#FAF4E8] p-3 rounded-2xl shadow-xl border-2 border-[#E5A93C] flex items-center gap-3">
                  <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl overflow-hidden bg-[#FAF4E8] shrink-0 flex items-center justify-center p-0.5">
                    <img
                      src={pudingItem?.image || "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=300&auto=format&fit=crop"}
                      alt={pudingItem?.name || "Es Puding"}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="pr-2">
                    <p className="text-[10px] text-[#E5A93C] font-bold uppercase">Pereda Pedas</p>
                    <p className="font-heading text-sm lg:text-base font-bold">{pudingItem?.name || "Es Puding"}</p>
                    <p className="text-xs text-amber-200 font-semibold">
                      Cuma {formatRupiah(pudingItem?.basePrice || 10000)}
                    </p>
                  </div>
                </div>

                {/* Rating stamp */}
                <div className="absolute -top-3 -right-3 bg-[#E5A93C] text-[#370F15] px-3.5 py-1.5 rounded-full font-bold text-xs shadow-md border-2 border-white flex items-center gap-1">
                  <span>⭐ 4.9/5</span>
                  <span className="text-[10px] font-medium opacity-80">(Puas!)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
