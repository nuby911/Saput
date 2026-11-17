import React from 'react';
import ProductCard from './ProductCard';
import ComboSection from './ComboSection';

export default function MenuSection({ menuItems }) {
  // Filter individual hero items (Sate Taichan & Es Puding)
  const heroItems = menuItems.filter((item) => !item.isCombo);
  const comboItem = menuItems.find((item) => item.isCombo);
  const sateItem = menuItems.find((item) => item.id === 'sate-taichan') || heroItems[0];
  const pudingItem = menuItems.find((item) => item.id === 'es-puding') || heroItems[1];

  return (
    <section id="menu-section" className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-10">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-4 sm:mb-8">
        <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-widest text-[#D33A2C] bg-[#D33A2C]/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
          Daftar 2 Menu Saput
        </span>
        <h2 className="font-heading text-xl sm:text-4xl font-extrabold text-[#241718] mt-1.5">
          Pilihan Menu Utama
        </h2>
      </div>

      {/* Duo Grid: 2 Hero Products SIDE BY SIDE on Mobile & Desktop */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:gap-8 items-stretch">
        {heroItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

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
