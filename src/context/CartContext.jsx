import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const STORAGE_KEY = 'saput_cart_v1';

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Gagal menyimpan keranjang ke localStorage:', e);
    }
  }, [cart]);

  // Tambah produk ke keranjang
  const addToCart = (product, qty = 1, withAddon = false) => {
    if (qty <= 0) return;

    const unitPrice = withAddon ? (product.basePrice + (product.addonPrice || 0)) : product.basePrice;
    const cartKey = `${product.id}_${withAddon ? 'with_addon' : 'standard'}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartKey === cartKey);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          qty: updated[existingIndex].qty + qty,
        };
        return updated;
      }

      return [
        ...prevCart,
        {
          cartKey,
          id: product.id,
          name: product.name,
          basePrice: product.basePrice,
          withAddon,
          addonName: withAddon ? product.addonName : null,
          addonPrice: withAddon ? product.addonPrice : 0,
          unitPrice,
          unit: product.unit,
          qty,
          image: product.image,
        },
      ];
    });
  };

  // Ubah kuantiti item
  const updateQty = (cartKey, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartKey);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.cartKey === cartKey ? { ...item, qty: newQty } : item
      )
    );
  };

  // Hapus item dari keranjang
  const removeFromCart = (cartKey) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartKey !== cartKey));
  };

  // Kosongkan keranjang
  const clearCart = () => {
    setCart([]);
  };

  // Hitung total item & total harga
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
