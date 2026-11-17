# Design Specification: Web E-Commerce "Saput" (Sate Taichan & Es Puding)

**Date:** 2026-11-17  
**Brand:** Saput - "Made to Make You Happy"  
**Project Location:** `D:\Project\WEB-Ebisnis`  
**Target Platform:** Mobile-First Responsive Web (React + Vite + Tailwind CSS)  

---

## 1. Overview & Brand Identity

**Saput** adalah brand kuliner yang memadukan dua hidangan komplementer yang sangat digemari:
1. **Sate Taichan**: Gurih, pedas, juicy dengan perasan jeruk nipis dan sambal khas taichan.
2. **Es Puding**: Manis, lembut, dingin, dan menyegarkan sebagai pereda pedas instan.

### Visual Identity & Theme
* **Logo**: Karakter retro kartun Saput memegang tusuk sate taichan dan gelas es puding dingin dengan topi cabai berapi.
* **Tagline**: *"Made to Make You Happy"*
* **Color Palette**:
  * **Primary Maroon/Burgundy**: `#4A151D` / `#581825` (warna dasar logo & header)
  * **Warm Cream / Vanilla**: `#FDF8EE` / `#F8ECC9` (latar belakang bersih dan hangat)
  * **Chili Accent Red**: `#D33A2C` (aksen promo & pedas)
  * **WhatsApp Brand Green**: `#25D366` / `#128C7E` (tombol utama checkout)
  * **Charcoal / Slate**: `#2D2D2D` (teks utama yang kontras dan mudah dibaca)

---

## 2. Core Architecture & Concept

Website ini dirancang sebagai **High-Converting Single-Page Food Landing Page**:
* **Zero Friction**: Pengunjung tidak perlu login, tanpa navigasi rumit antar halaman, dan tanpa formulir panjang.
* **Instant Ordering via WhatsApp**: Keranjang pesanan langsung menghasilkan pesan WhatsApp terformat rapi dan membuka aplikasi WhatsApp pelanggan.
* **Google Sheets CMS Ready**: Data harga, deskripsi, foto, dan status ketersediaan (Tersedia/Habis) dapat dikontrol langsung dari Google Sheets, dengan *offline fallback* lokal.

---

## 3. Product Catalog & Options

### Menu 1: Sate Taichan
* **Harga Dasar**: Rp 25.000 / porsi (10 tusuk daging ayam juicy + sambal taichan khas + kaldu bubuk & jeruk nipis).
* **Kustomisasi**:
  * Opsi Tambahan: Checkbox `[✓] Tambah Lontong (+Rp 5.000)`
* **Level Pedas**: Tidak ada tingkatan (sambal standar khas taichan).

### Menu 2: Es Puding
* **Harga**: Rp 12.000 / cup (puding sutra lembut dengan kuah susu segar dan es batu).

### Menu 3: Paket Combo Hemat ("Paket Puas Saput")
* **Isi**: 1 Porsi Sate Taichan + 1 Lontong + 1 Cup Es Puding.
* **Harga Spesial**: Rp 38.000 (hemat dari harga normal Rp 42.000).

---

## 4. UI/UX Component Specifications

### 4.1 Navbar & Header
* Menampilkan logo resmi Saput (`/logo-saput.jpg`) dan tagline.
* Badge Status Operasional: *"🟢 Buka Sekarang (16.00 - 23.00 WIB)"*.
* Tombol cepat *"Hubungi Admin"*.

### 4.2 Hero Section
* Headline selera makan: *"Pedas Gurihnya Taichan, Dingin Segarnya Es Puding"*.
* Banner visual perpaduan sate taichan dan es puding.
* Tombol CTA: *"Lihat Menu & Pesan Sekarang"*.

### 4.3 Menu Cards Section
* Dua kartu menu utama bersanding dengan foto makanan menggugah selera:
  * Indikator stok (*Tersedia / Habis*).
  * Tombol kontrol jumlah pesanan (`-` / `+`).
  * Pada kartu Sate Taichan: Tombol toggle/checkbox *"Tambah Lontong (+Rp 5.000)"*.
  * Tombol interaktif *"+ Tambah ke Pesanan"*.

### 4.4 Paket Combo Section
* Banner promosi khusus untuk upselling bundling Sate + Lontong + Es Puding dengan satu klik.

### 4.5 Sticky Floating Order Bar
* Menempel di bagian bawah layar (*bottom sticky bar*), aktif saat total pesanan > 0.
* Menampilkan:
  * Jumlah total item terpilih.
  * Ringkasan total harga dalam format Rupiah.
  * Tombol utama berwarna hijau WhatsApp dengan ikon WhatsApp: **"Pesan Sekarang via WA"**.

### 4.6 Template Pesan WhatsApp
Saat diklik, membuka URL `https://wa.me/{PHONE_NUMBER}?text={ENCODED_MESSAGE}`:
```text
Halo Admin Saput, saya ingin memesan:
- 1x Sate Taichan (+ Lontong) = Rp 30.000
- 1x Es Puding = Rp 12.000

Total: Rp 42.000

Mohon info ketersediaan dan nomor rekening pembayarannya. Terima kasih!
```

---

## 5. Technical Implementation Details

* **Directory**: `D:\Project\WEB-Ebisnis`
* **Stack**:
  * React 19 (Functional Components, Hooks)
  * Vite (Fast HMR & build tool)
  * Tailwind CSS v4 (Modern utility-first styling)
  * Lucide React (Icons: ShoppingCart, Flame, Sparkles, MessageCircle, Clock, MapPin, Plus, Minus, Check)
* **State Management**:
  * `cartState`: Tersimpan di React State dan disinkronisasi ke `localStorage` agar tidak hilang saat refresh.
* **Data Layer (`src/data/menuData.js` & `src/services/sheets.js`)**:
  * Menyediakan default data statis lengkap agar aplikasi langsung siap jalan.
  * Mendukung pembacaan dinamis dari URL Google Sheets (format CSV publik / Google Visualization API).
