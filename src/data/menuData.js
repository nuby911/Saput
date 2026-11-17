export const storeConfig = {
  name: "Saput",
  tagline: "Made to Make You Happy",
  description: "Sensasi pedas gurihnya Sate Taichan berpadu sempurna dengan dingin segarnya Es Puding. Dibuat fresh setiap hari dengan bahan berkualitas pilihan.",
  whatsappNumber: "6285783000970",
  whatsappDisplay: "+62 857-8300-0970",
  openingHours: "Buka Perdana 16 Desember Di GSG Polinela",
  location: "Politeknik Negeri Lampung",
  instagram: "@saput.official",
  deliveryNote: "Melayani Dine-in, Takeaway, dan Antar Langsung area Polinela & sekitarnya.",
};

export const initialMenu = [
  {
    id: "sate-taichan",
    name: "Sate Taichan Juara",
    category: "Makanan Utama",
    basePrice: 25000,
    unit: "1 Porsi (10 Tusuk)",
    description: "Daging ayam fillet paha & dada pilihan yang dibakar empuk gurih, disajikan dengan sambal taichan pedas nampol, taburan kaldu gurih, dan perasan jeruk nipis segar.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1000&auto=format&fit=crop", // close-up skewers
    isAvailable: true,
    badges: ["🔥 Best Seller", "100% Cabai Asli"],
    hasAddon: true,
    addonName: "Tambah Lontong Pulen",
    addonPrice: 5000,
  },
  {
    id: "es-puding",
    name: "Es Puding Segar",
    category: "Minuman & Dessert",
    basePrice: 12000,
    unit: "1 Cup Besar",
    description: "Puding sutra lembut homemade dengan kuah susu racikan spesial Saput, es serut dingin, dan sentuhan sirup manis yang langsung meredakan pedas.",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=1000&auto=format&fit=crop", // iced pudding dessert
    isAvailable: true,
    badges: ["❄️ Pereda Pedas", "Puding Sutra"],
    hasAddon: false,
  },
  {
    id: "paket-komplit",
    name: "Paket Puas Saput (Combo)",
    category: "Paket Hemat",
    basePrice: 38000,
    normalPrice: 42000,
    unit: "1 Sate + Lontong + 1 Es Puding",
    description: "Kombinasi paling pas untuk perut kenyang dan lidah puas! 1 Porsi Sate Taichan (10 tusuk) + Lontong Pulen + 1 Cup Es Puding Segar.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop",
    isAvailable: true,
    badges: ["⭐ Paling Hemat", "Diskon Rp 4.000"],
    hasAddon: false,
    isCombo: true,
  }
];
