import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import BundlingTopBar from './components/BundlingTopBar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import FloatingOrderBar from './components/FloatingOrderBar';
import Footer from './components/Footer';
import { fetchMenuFromSheets } from './services/sheets';
import { initialMenu } from './data/menuData';

export default function App() {
  const [menuItems, setMenuItems] = useState(initialMenu);
  const [loading, setLoading] = useState(true);
  const comboProduct = menuItems.find((m) => m.isCombo);

  useEffect(() => {
    async function loadMenu() {
      try {
        const data = await fetchMenuFromSheets();
        if (data && data.length > 0) {
          setMenuItems(data);
        }
      } catch (err) {
        console.warn('Gagal memuat menu dari Google Sheets, menggunakan data lokal:', err);
      } finally {
        setLoading(false);
      }
    }
    loadMenu();
  }, []);

  return (
    <CartProvider>
      <div className="min-h-[100dvh] flex flex-col bg-[#FAF4E8] text-[#241718]">
        {/* Navigation Bar */}
        <Navbar />

        {/* Top Bundling Announcement Notice */}
        <BundlingTopBar comboProduct={comboProduct} />

        {/* Hero Section */}
        <Hero menuItems={menuItems} />

        {/* Main Content Area */}
        <main className="flex-grow">
          {loading ? (
            <div className="py-20 text-center">
              <div className="w-8 h-8 border-4 border-[#4A151D] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-sm font-semibold text-[#4A151D]">Memuat menu lezat Saput...</p>
            </div>
          ) : (
            <MenuSection menuItems={menuItems} />
          )}
        </main>

        {/* Footer */}
        <Footer />

        {/* Floating Order Bar (Pesan via WhatsApp) */}
        <FloatingOrderBar />
      </div>
    </CartProvider>
  );
}
