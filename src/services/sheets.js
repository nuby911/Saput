import { initialMenu } from '../data/menuData';

/**
 * Service to fetch menu items from a Google Sheets document published as CSV.
 * To use: Publish Google Sheet -> File > Share > Publish to web > CSV.
 * Put the URL into VITE_GOOGLE_SHEETS_CSV_URL in .env or configure here.
 */
export async function fetchMenuFromSheets() {
  const sheetUrl = import.meta.env.VITE_GOOGLE_SHEETS_CSV_URL;

  if (!sheetUrl) {
    // Gunakan initialMenu default jika URL Google Sheet belum diset
    return initialMenu;
  }

  try {
    const response = await fetch(sheetUrl);
    if (!response.ok) {
      throw new Error(`Gagal mengambil data dari Google Sheets: ${response.statusText}`);
    }

    const csvText = await response.text();
    const rows = parseCSV(csvText);

    if (rows.length < 2) {
      return initialMenu;
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
      const image = cols[6]?.trim();
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
        normalPrice: manualNormalPrice > 0 ? manualNormalPrice : (defaultItem?.normalPrice || 0),
      };
    });

    // Hitung normalPrice secara dinamis untuk paket combo jika tidak diset manual
    const sateItem = parsedMenu.find((m) => m.id === 'sate-taichan');
    const pudingItem = parsedMenu.find((m) => m.id === 'es-puding');
    const autoNormalPrice = 
      (sateItem ? sateItem.basePrice + (sateItem.addonPrice || 0) : 30000) +
      (pudingItem ? pudingItem.basePrice : 12000);

    parsedMenu.forEach((m) => {
      if (m.isCombo || m.id === 'paket-komplit') {
        // Jika kolom ke-12 kosong atau 0, gunakan total harga satuan sate + lontong + puding otomatis
        if (!m.normalPrice || m.normalPrice === 0) {
          m.normalPrice = autoNormalPrice;
        }
      }
    });

    return parsedMenu.length > 0 ? parsedMenu : initialMenu;
  } catch (err) {
    console.warn('Menggunakan menu cadangan (fallback) karena:', err.message);
    return initialMenu;
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
