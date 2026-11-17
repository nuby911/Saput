# Saput (Sate Taichan & Es Puding) - Web E-Commerce & WhatsApp Order

Website katalog interaktif dan pemesanan WhatsApp untuk kuliner **Saput** ("Made to Make You Happy"). Menampilkan kombinasi hidangan: **Sate Taichan** (gurih & pedas) dengan opsi lontong, dan **Es Puding** (dingin, manis & segar) serta **Paket Combo Hemat**.

---

## 🌟 Fitur Utama
1. **Desain Anti-AI Slop**:
   - Palet warna hangat selaras logo: Marun Klasik (`#4A151D`), Krem Hangat (`#FAF4E8`), Merah Cabai (`#D33A2C`), dan Hijau WhatsApp (`#25D366`).
   - Tipografi berkarakter (*Outfit* & *Plus Jakarta Sans*).
   - Animasi mikro taktil pada tombol (`active:scale-97`).
2. **Katalog 2 Produk Komplementer + Paket Combo**:
   - **Sate Taichan Juara**: Pilihan porsi dengan saklar/checkbox **+ Tambah Lontong Pulen (+Rp 5.000)**.
   - **Es Puding Segar**: Pilihan cup manis segar pereda pedas.
   - **Paket Puas Saput (Combo)**: 1 Sate Taichan + Lontong + Es Puding dengan diskon otomatis.
3. **Pemesanan WhatsApp Instan (1-Click Checkout)**:
   - *Sticky Floating Order Bar* di bagian bawah layar ponsel/desktop.
   - Menghitung rincian pesanan dan total harga secara *real-time*.
   - Otomatis membuka WhatsApp dengan draf pesan pesanan terformat rapi.
4. **Google Sheets CMS Integration**:
   - Data produk, harga, dan ketersediaan stok dapat dikelola langsung lewat Google Sheets tanpa perlu menyentuh kodingan.
   - Dilengkapi *offline fallback data* agar website tetap bisa berjalan cepat tanpa kendala koneksi.

---

## 🚀 Cara Menjalankan Project

### 1. Masuk ke Direktori Proyek
```bash
cd D:\Project\WEB-Ebisnis
```

### 2. Jalankan Server Development
```bash
npm run dev
```
Buka browser di alamat yang tampil di terminal (biasanya `http://localhost:5173`).

### 3. Build untuk Produksi
```bash
npm run build
```
File siap saji akan dibuat di folder `dist/`.

---

## ⚙️ Konfigurasi Nomor WhatsApp & Profil Toko

Buka file `src/data/menuData.js`:
```javascript
export const storeConfig = {
  name: "Saput",
  tagline: "Made to Make You Happy",
  whatsappNumber: "6281234567890", // Ganti dengan nomor WhatsApp kamu (format internasional diawali 62)
  openingHours: "16.00 - 23.00 WIB",
  location: "Jl. Kuliner No. 12, Sentra Kuliner Malam",
  instagram: "@saput.official",
};
```

---

## 📊 Cara Menghubungkan Google Sheets (Opsional)

1. Buat Google Sheet baru dengan urutan kolom:
   `id` | `name` | `category` | `basePrice` | `unit` | `description` | `image` | `isAvailable` | `hasAddon` | `addonName` | `addonPrice`
2. Klik menu **File > Share > Publish to web**.
3. Pilih sheet yang diinginkan dan ubah formatnya menjadi **Comma-separated values (.csv)**, lalu klik **Publish**.
4. Buat file `.env` di folder proyek dan isi:
   ```env
   VITE_GOOGLE_SHEETS_CSV_URL=URL_PUBLISH_CSV_GOOGLE_SHEETS_KAMU
   ```
5. Restart server `npm run dev`. Data produk sekarang akan langsung membaca dari spreadsheet Google kamu!
