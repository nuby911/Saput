# Saput E-Commerce Web Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready, ultra-responsive, mobile-first food catalog and WhatsApp ordering website for "Saput" (Sate Taichan & Es Puding) with handcrafted, anti-AI-slop design.

**Architecture:** Single-page React application powered by Vite, Tailwind CSS, Lucide icons, and Google Sheets live integration (with robust local offline fallback). Features tactile food ordering with custom add-on toggles, instant cart calculation, and an instant WhatsApp redirect checkout bar.

**Tech Stack:** React 19, Vite, Tailwind CSS, Lucide React, Google Sheets API / CSV Fetcher.

**Spec:** `D:/Project/WEB-Ebisnis/docs/superpowers/specs/2026-11-17-saput-ebisnis-design.md`

## Global Constraints

- Project root: `D:\Project\WEB-Ebisnis`
- Primary Brand Color: Burgundy Maroon `#4A151D` / `#581825`
- Secondary Background: Warm Cream `#FDF8EE` / `#FAF4E8`
- Accent Red: `#D33A2C`
- WhatsApp Accent: `#25D366`
- Zero AI-slop: No generic purple glow, no oversized empty cards, strict 44px+ touch targets on mobile, tactile active states (`active:scale-95`).
- Mobile-first layout: Perfectly responsive on screens 360px - 1440px without any horizontal scroll.

## Review Focus

1. WhatsApp message formatting: URL encoding properly formats line breaks (`%0A`) so the WhatsApp chat displays a clean readable order receipt.
2. Lontong addon price calculation: Toggling lontong on Sate Taichan accurately updates subtotal (Rp 25.000 -> Rp 30.000).
3. Cart persistence: Reloading the webpage preserves the selected items in `localStorage`.
4. Sticky order bar visibility: Only appears when item count > 0 and does not obscure the footer or menu content.
5. Google Sheets fallback: When no Google Sheets URL is provided or network fails, fallback data loads seamlessly without error or blank screen.

---

### Task 1: Project Scaffolding & Tailwind CSS Theme Setup

**Files:**
- Create: `D:\Project\WEB-Ebisnis\package.json`
- Create: `D:\Project\WEB-Ebisnis\vite.config.js`
- Create: `D:\Project\WEB-Ebisnis\index.html`
- Create: `D:\Project\WEB-Ebisnis\src\index.css`
- Create: `D:\Project\WEB-Ebisnis\src\main.jsx`
- Assets: `D:\Project\WEB-Ebisnis\public\logo-saput.jpg`

- [ ] **Step 1: Initialize Vite React project with Tailwind CSS and Lucide React**
Run in `D:\Project\WEB-Ebisnis`:
```bash
npm create vite@latest . -- --template react
npm install lucide-react
npm install -D tailwindcss @tailwindcss/vite
```

- [ ] **Step 2: Configure Vite and Tailwind theme**
Setup `@tailwindcss/vite` in `vite.config.js` and custom font/colors in `src/index.css` matching Saput brand colors.

- [ ] **Step 3: Test dev build**
Run: `npm run build`
Expected: Successful build output in `dist/`.

---

### Task 2: Data Model, State Management & Google Sheets Service

**Files:**
- Create: `D:\Project\WEB-Ebisnis\src\data\menuData.js`
- Create: `D:\Project\WEB-Ebisnis\src\services\sheets.js`
- Create: `D:\Project\WEB-Ebisnis\src\context\CartContext.jsx`

- [ ] **Step 1: Define default menu data in `src/data/menuData.js`**
Includes:
- Sate Taichan (Rp 25.000, addon lontong: Rp 5.000, high-res photo, description, status: Tersedia)
- Es Puding (Rp 12.000, high-res photo, description, status: Tersedia)
- Paket Komplit Saput (Rp 38.000, includes Sate + Lontong + Es Puding)
- Store Info (Nama: "Saput", No WA: "628xxxxxxxx", Jam Buka: "16.00 - 23.00 WIB", Alamat).

- [ ] **Step 2: Create Google Sheets reader in `src/services/sheets.js`**
Fetches published CSV/JSON from Google Sheets if configured; returns default `menuData` on error or empty URL.

- [ ] **Step 3: Implement `CartContext` with localStorage persistence**
State: `items` (array with id, name, price, hasLontong, qty).
Methods: `addToCart`, `updateQty`, `removeFromCart`, `clearCart`, `getTotalPrice`, `getTotalItems`.

- [ ] **Step 4: Verify calculation tests**
Verify that adding 1 Sate (+ Lontong) and 1 Es Puding produces exactly Rp 42.000.

---

### Task 3: Navbar & Hero Section (Brand Atmosphere)

**Files:**
- Create: `D:\Project\WEB-Ebisnis\src\components\Navbar.jsx`
- Create: `D:\Project\WEB-Ebisnis\src\components\Hero.jsx`

- [ ] **Step 1: Implement `Navbar.jsx`**
- Brand logo `/logo-saput.jpg` with circular badge.
- Name "Saput" with subtitle "Made to Make You Happy".
- Operating status pill badge: "🟢 Buka • 16.00 - 23.00 WIB".
- Direct WhatsApp call/chat button.

- [ ] **Step 2: Implement `Hero.jsx`**
- Rich, handcrafted typography: "Pedas Gurihnya Taichan, Dingin Segarnya Es Puding".
- Appetizing side-by-side product spotlight.
- Value badges: "Daging Ayam Juicy", "100% Cabai Asli", "Puding Sutra Lembut".
- Smooth scroll button to `#menu`.

---

### Task 4: Menu Section & Interactive Product Cards

**Files:**
- Create: `D:\Project\WEB-Ebisnis\src\components\ProductCard.jsx`
- Create: `D:\Project\WEB-Ebisnis\src\components\MenuSection.jsx`

- [ ] **Step 1: Implement `ProductCard.jsx`**
- High quality image container with status badge ("Tersedia" / "Habis").
- Price in Rupiah (`Intl.NumberFormat`).
- For Sate Taichan: Custom toggle checkbox `[✓] Tambah Lontong (+Rp 5.000)`.
- Stepper button for quantity: `[-] [1] [+]`.
- Tactile CTA button: `+ Tambah ke Pesanan` with active press animation.

- [ ] **Step 2: Implement `MenuSection.jsx`**
- Two-column responsive grid (1 column on mobile, 2 columns on desktop).
- Clean spacing, clear typography, zero clutter.

---

### Task 5: Paket Combo Section (Upselling Card)

**Files:**
- Create: `D:\Project\WEB-Ebisnis\src\components\ComboSection.jsx`

- [ ] **Step 1: Implement `ComboSection.jsx`**
- Highlight banner: "🌟 Paket Puas Saput (Sate Taichan + Lontong + Es Puding)".
- Original price crossed out (`Rp 42.000`), Special combo price `Rp 38.000` with "Hemat Rp 4.000" pill badge.
- One-click "Ambil Paket Combo" button that adds the bundle directly to the cart.

---

### Task 6: Sticky Bottom Floating Order Bar & WhatsApp Checkout

**Files:**
- Create: `D:\Project\WEB-Ebisnis\src\components\FloatingOrderBar.jsx`
- Create: `D:\Project\WEB-Ebisnis\src\utils\whatsapp.js`

- [ ] **Step 1: Implement WhatsApp Message Generator in `src/utils/whatsapp.js`**
Constructs clean URL:
```text
https://wa.me/628XXXXXXXXXX?text=Halo%20Admin%20Saput%2C%20saya%20mau%20pesan%3A%0A-%201x%20Sate%20Taichan%20(%2B%20Lontong)%20%3D%20Rp%2030.000%0A-%201x%20Es%20Puding%20%3D%20Rp%2012.000%0A%0ATotal%3A%20Rp%2042.000%0A%0AMohon%20diproses%20ya.%20Terima%20kasih!
```

- [ ] **Step 2: Implement `FloatingOrderBar.jsx`**
- Fixed bottom container on mobile/desktop with smooth slide-up entrance when totalItems > 0.
- Left side: Item count badge and Total Rupiah.
- Expandable order drawer to adjust quantities or remove items.
- Right side: Prominent WhatsApp green `#25D366` button with WhatsApp icon: "Pesan Sekarang via WA".

---

### Task 7: Footer & Store Information

**Files:**
- Create: `D:\Project\WEB-Ebisnis\src\components\Footer.jsx`

- [ ] **Step 1: Implement `Footer.jsx`**
- Location address & map link.
- Hours of operation (16.00 - 23.00 WIB).
- Order guide (3 langkah mudah: Pilih Menu -> Pesan via WA -> Siap Diantar / Diambil).
- Copyright & branding Saput.

---

### Task 8: Integration, Full Build & Verification

**Files:**
- Modify: `D:\Project\WEB-Ebisnis\src\App.jsx`

- [ ] **Step 1: Assemble all components in `App.jsx` wrapped in `CartProvider`**
- [ ] **Step 2: Run build and lint verification**
Run: `npm run build`
Expected: Clean build without errors or warnings.
- [ ] **Step 3: Verify preview in browser**
Run: `npm run preview` / test rendering.
