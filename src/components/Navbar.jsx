import React from 'react';
import { MessageCircle } from 'lucide-react';
import { storeConfig } from '../data/menuData.js';

export default function Navbar() {
  const whatsappUrl = `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(
    `Halo Admin ${storeConfig.name}, saya ingin tanya informasi pesanan.`
  )}`;

  return (
    <header className="sticky top-0 z-40 bg-[#4A151D] text-[#FAF4E8] shadow-md border-b border-[#5E1B25]">
      {/* Main Navbar */}
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src="/logo-saput.jpg"
              alt="Logo Saput"
              className="w-12 h-12 rounded-full object-cover border-2 border-[#E5A93C] shadow-sm transition-transform duration-200 group-hover:scale-105"
            />
            <div className="absolute -bottom-1 -right-1 bg-[#D33A2C] text-[10px] font-bold px-1.5 py-0.2 rounded-full text-white border border-[#4A151D]">
              🔥
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading text-2xl font-black tracking-tight text-[#FAF4E8]">
                Saput
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-[#E5A93C] text-[#370F15] px-1.5 py-0.5 rounded">
                Official
              </span>
            </div>
            <p className="text-xs text-[#E8D2B5] font-medium tracking-wide">
              {storeConfig.tagline}
            </p>
          </div>
        </a>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-sm font-bold px-3.5 py-2 rounded-full shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span className="hidden sm:inline">Chat Admin</span>
          </a>
        </div>
      </div>
    </header>
  );
}
