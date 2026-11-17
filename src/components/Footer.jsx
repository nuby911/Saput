import React from 'react';
import { Clock, MapPin, MessageCircle, Heart, Phone, Sparkles } from 'lucide-react';
import { storeConfig } from '../data/menuData';

export default function Footer() {
  const whatsappUrl = `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(
    `Halo Admin ${storeConfig.name}, saya ingin tanya info lokasi dan pesanan.`
  )}`;

  return (
    <footer className="bg-[#370F15] text-[#E8D2B5] pt-12 pb-28 sm:pb-20 border-t-4 border-[#4A151D]">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* 3 Step Ordering Process Guide */}
        <div className="mb-12 bg-[#4A151D] rounded-3xl p-6 sm:p-8 border border-[#5E1B25] text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#E5A93C]">
            Cara Pemesanan Mudah
          </span>
          <h3 className="font-heading text-2xl font-bold text-[#FAF4E8] mt-1 mb-6">
            Hanya 3 Langkah Cepat
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#E5A93C] text-[#370F15] font-black text-lg flex items-center justify-center mx-auto shadow-md">
                1
              </div>
              <h4 className="font-bold text-[#FAF4E8] text-base">Pilih Menu</h4>
              <p className="text-xs text-[#D9C8B0] leading-relaxed">
                Tentukan jumlah Sate Taichan (bisa + lontong) dan Es Puding yang kamu mau.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#25D366] text-white font-black text-lg flex items-center justify-center mx-auto shadow-md">
                2
              </div>
              <h4 className="font-bold text-[#FAF4E8] text-base">Klik Pesan via WA</h4>
              <p className="text-xs text-[#D9C8B0] leading-relaxed">
                Pesan WhatsApp otomatis terbuat rapi. Kamu tinggal kirim tanpa repot mengetik ulang.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#D33A2C] text-white font-black text-lg flex items-center justify-center mx-auto shadow-md">
                3
              </div>
              <h4 className="font-bold text-[#FAF4E8] text-base">Konfirmasi & Nikmati</h4>
              <p className="text-xs text-[#D9C8B0] leading-relaxed">
                Admin konfirmasi pembayaran, pesanan langsung disiapkan hangat & fresh!
              </p>
            </div>
          </div>
        </div>

        {/* Store Detail Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#5E1B25]/60 text-sm">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/logo-saput.jpg"
                alt="Logo Saput"
                className="w-10 h-10 rounded-full object-cover border border-[#E5A93C]"
              />
              <div>
                <span className="font-heading text-xl font-bold text-[#FAF4E8] block">
                  Saput
                </span>
                <span className="text-xs text-[#E5A93C]">
                  {storeConfig.tagline}
                </span>
              </div>
            </div>
            <p className="text-xs text-[#D9C8B0] leading-relaxed">
              {storeConfig.description}
            </p>
          </div>

          {/* Jam & Layanan */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="font-heading font-bold text-base text-[#FAF4E8]">
              Jam Operasional & Layanan
            </h4>
            <div className="flex items-start gap-2 text-xs">
              <Clock className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
              <span>Buka Setiap Hari: <b>{storeConfig.openingHours}</b></span>
            </div>
            <div className="flex items-start gap-2 text-xs">
              <MapPin className="w-4 h-4 text-[#E5A93C] shrink-0 mt-0.5" />
              <span>{storeConfig.location}</span>
            </div>
            <p className="text-[11px] text-neutral-400 mt-1 italic">
              {storeConfig.deliveryNote}
            </p>
          </div>

          {/* Kontak Admin */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="font-heading font-bold text-base text-[#FAF4E8]">
              Hubungi Kami
            </h4>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Admin</span>
            </a>
            <p className="text-xs text-[#D9C8B0] block">
              Instagram: <b className="text-[#FAF4E8]">{storeConfig.instagram}</b>
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#D9C8B0] gap-2">
          <p>© {new Date().getFullYear()} Saput. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Dibuat penuh selera <Heart className="w-3.5 h-3.5 text-[#D33A2C] fill-[#D33A2C]" /> untuk pecinta kuliner
          </p>
        </div>

      </div>
    </footer>
  );
}
