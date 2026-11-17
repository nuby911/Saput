import React from 'react';
import ProductCard from './ProductCard';
import ComboSection from './ComboSection';

export default function MenuSection({ menuItems }) {
  // Filter individual hero items (Sate Taichan & Es Puding)
  const heroItems = menuItems.filter((item) => !item.isCombo);
  const comboItem = menuItems.find((item) => item.isCombo);

  return (
    <section id="menu-section" className="max-w-5xl mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <span className="text-xs uppercase font-extrabold tracking-widest text-[#D33A2C] bg-[#D33A2C]/10 px-3 py-1 rounded-full">
          Daftar Menu Saput
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#241718] mt-2">
          Pilihan Menu Terbaik
        </h2>
        <p className="text-sm text-neutral-600 mt-2">
          Kombinasi juara sate taichan gurih pedas dan kesegaran es puding yang siap dipesan kapan saja.
        </p>
      </div>

      {/* Duo Grid: 2 Hero Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
        {heroItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Combo Upselling Section */}
      {comboItem && <ComboSection comboProduct={comboItem} />}
    </section>
  );
}
