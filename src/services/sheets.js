import { initialMenu } from '../data/menuData.js';

const CACHE_KEY = 'saput_cached_menu_v1';

/**
 * Mengambil data cadangan:
 * 1. Coba dari cache lokal terbaru di browser (Last Known Good data)
 * 2. Jika tidak ada, gunakan initialMenu bawaan
 */
function getFallbackMenu() {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Gagal membaca cache menu:', e);
    }
  }
  return initialMenu;
}

/**
 * Normalisasi URL gambar:
 * 1. Mendukung file lokal di folder public/ (contoh: sate.jpg atau /sate.jpg)
 * 2. Mendukung link share Google Drive (otomatis dikonversi ke direct image link)
 * 3. Mendukung URL publik standar (https://...)
 */
export function normalizeImageUrl(url) {
  if (!url || typeof url !== 'string') return '';
  const trimmed = url.trim();

  // Jika link Google Drive (https://drive.google.com/file/d/ID/view...)
  const gDriveMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/) || trimmed.match(/id=([a-zA-Z0-9_-]+)/);
  if (trimmed.includes('drive.google.com') && gDriveMatch && gDriveMatch[1]) {
    return `https://lh3.googleusercontent.com/d/${gDriveMatch[1]}`;
  }

  // Jika berupa nama file gambar lokal di folder public/ (misal: sate.jpg atau sate.png)
  if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
    return trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  }

  return trimmed;
}

/**
 * Service to fetch menu items from a Google Sheets document published as CSV.
 * To use: Publish Google Sheet -> File > Share > Publish to web > CSV.
 * Put the URL into VITE_GOOGLE_SHEETS_CSV_URL in .env or configure here.
 */
export async function fetchMenuFromSheets() {
  const sheetUrl =
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_SHEETS_CSV_URL) ||
    process.env?.VITE_GOOGLE_SHEETS_CSV_URL;

  if (!sheetUrl) {
    return getFallbackMenu();
  }

  try {
    const response = await fetch(sheetUrl);
    if (!response.ok) {
      throw new Error(`Gagal mengambil data dari Google Sheets: ${response.statusText}`);
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    if (rows.length < 2) {
      return getFallbackMenu();
    }

    // Mapping baris spreadsheet ke model menu
    // Format kolom yang diharapkan:
    // id, name, category, basePrice, unit, description, image, isAvailable, hasAddon, addonName, addonPrice
    const parsedMenu = rows.slice(1).map((cols) => {
      const id = cols[0]?.trim();
      const name = cols[1]?.trim();
      const category = cols[2]?.trim();
      const basePrice = parseInt(cols[3]?.replace(/[^0-9]/g, '') || '0', 10);
      const unit = cols[4]?.trim();
      const description = cols[5]?.trim();
      const image = normalizeImageUrl(cols[6]);
      const isAvailable = cols[7]?.toLowerCase() === 'tersedia' || cols[7]?.toLowerCase() === 'true';
      const hasAddon = cols[8]?.toLowerCase() === 'true' || cols[8]?.toLowerCase() === 'ya';
      const addonName = cols[9]?.trim() || '';
      const addonPrice = parseInt(cols[10]?.replace(/[^0-9]/g, '') || '0', 10);

      // Cari badges / combo status dari data awal jika ada
      const defaultItem = initialMenu.find((m) => m.id === id);

      // Opsi normalPrice manual dari kolom ke-12 (index 11) jika ada
      const manualNormalPrice = cols[11] ? parseInt(cols[11]?.replace(/[^0-9]/g, '') || '0', 10) : 0;

      return {
        id: id || defaultItem?.id || `item-${Math.random().toString(36).substr(2, 9)}`,
        name: name || defaultItem?.name || 'Menu',
        category: category || defaultItem?.category || 'Menu',
        basePrice: basePrice || defaultItem?.basePrice || 0,
        unit: unit || defaultItem?.unit || '1 Porsi',
        description: description || defaultItem?.description || '',
        image: image || defaultItem?.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop',
        isAvailable: cols[7] !== undefined ? isAvailable : (defaultItem?.isAvailable ?? true),
        badges: defaultItem?.badges || [],
        hasAddon: cols[8] !== undefined ? hasAddon : (defaultItem?.hasAddon ?? false),
        addonName: addonName || defaultItem?.addonName || '',
        addonPrice: cols[10] !== undefined && cols[10] !== '' ? addonPrice : (defaultItem?.addonPrice || 0),
        isCombo: defaultItem?.isCombo || false,
        normalPrice: manualNormalPrice > 0 ? manualNormalPrice : 0,
      };
    });

    // Pisahkan addon Lontong menjadi produk menu independen (harga & jumlah terpisah dari sate)
    const sateWithAddon = parsedMenu.find((m) => (m.id === 'sate-taichan' || m.hasAddon) && m.addonPrice > 0);
    const existingLontong = parsedMenu.find((m) => m.id === 'tambah-lontong');

    if (sateWithAddon && !existingLontong) {
      parsedMenu.push({
        id: 'tambah-lontong',
        name: sateWithAddon.addonName || 'Tambah Lontong Pulen',
        category: 'Menu Tambahan',
        basePrice: sateWithAddon.addonPrice || 3000,
        unit: '1 Pcs',
        description: 'Lontong pulen ekstra jika 1 porsi bawaan sate dirasa kurang.',
        image: sateWithAddon.image,
        isAvailable: true,
        badges: ['🍚 Ekstra'],
        hasAddon: false,
        isAddon: true,
        isCombo: false,
      });
      // Sate 15k sudah termasuk lontong bawaan, nonaktifkan hasAddon agar tidak menggabungkan harga secara paksa
      sateWithAddon.hasAddon = false;
    }

    // Hitung normalPrice secara dinamis: Harga Sate + Harga Minuman (Es Puding)
    const sateItem = parsedMenu.find((m) => m.id === 'sate-taichan');
    const pudingItem = parsedMenu.find((m) => m.id === 'es-puding');
    const autoNormalPrice = 
      (sateItem ? sateItem.basePrice : 15000) +
      (pudingItem ? pudingItem.basePrice : 10000);

    parsedMenu.forEach((m) => {
      if (m.isCombo || m.id === 'paket-komplit') {
        // Otomatis hasil penjumlahan sate dan minuman jika tidak diisi manual di kolom 12
        if (!m.normalPrice || m.normalPrice === 0) {
          m.normalPrice = autoNormalPrice;
        }
      }
    });

    if (parsedMenu.length > 0) {
      // Simpan data sukses terbaru ke cache browser
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(parsedMenu));
        } catch {
          // Abaikan jika quota localStorage penuh
        }
      }
      return parsedMenu;
    }

    return getFallbackMenu();
  } catch (err) {
    console.warn('Google Sheets bermasalah atau offline, menggunakan data cadangan (fallback):', err.message);
    return getFallbackMenu();
  }
}

/**
 * Simple CSV parser handling quotes and commas
 */
function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim() !== '');
  return lines.map((line) => {
    const matches = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        matches.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    matches.push(current);
    return matches;
  });
}
