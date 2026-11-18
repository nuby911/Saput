import React from 'react';
import ProductCard from './ProductCard';
import ExtraAddonCard from './ExtraAddonCard';
import ComboSection from './ComboSection';

export default function MenuSection({ menuItems }) {
  // Filter individual hero items (Sate Taichan & Es Puding)
  const heroItems = menuItems.filter((item) => !item.isCombo && !item.isAddon && item.id !== 'tambah-lontong');
  const addonItem = menuItems.find((item) => item.isAddon || item.id === 'tambah-lontong');
  const comboItem = menuItems.find((item) => item.isCombo);
  const sateItem = menuItems.find((item) => item.id === 'sate-taichan') || heroItems[0];
  const pudingItem = menuItems.find((item) => item.id === 'es-puding') || heroItems[1];

  return (
    <section id="menu-section" className="max-w-6xl xl:max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-10 lg:py-14">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-8 lg:mb-10">
        <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-[#D33A2C] bg-[#D33A2C]/10 px-3 py-1 rounded-full">
          Daftar 2 Menu Saput
        </span>
        <h2 className="font-heading text-xl sm:text-4xl lg:text-5xl font-extrabold text-[#241718] mt-2">
          Pilihan Menu Utama
        </h2>
        <p className="hidden sm:block text-xs sm:text-sm text-neutral-600 mt-2">
          Pilih porsi favoritmu, tambahkan ekstra lontong satuan jika perlu, dan langsung pesan via WhatsApp!
        </p>
      </div>

      {/* Duo Grid: 2 Hero Products SIDE BY SIDE on Mobile & Desktop */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 items-stretch">
        {heroItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Menu Tambahan / Ekstra Lontong Satuan */}
      {addonItem && (
        <ExtraAddonCard addonItem={addonItem} />
      )}

      {/* Combo Upselling Section */}
      {comboItem && (
        <ComboSection
          comboProduct={comboItem}
          sateItem={sateItem}
          pudingItem={pudingItem}
        />
      )}
    </section>
  );
}
