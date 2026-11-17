import { storeConfig } from '../data/menuData';

export function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
}

export function generateWhatsAppOrderUrl(cart, customConfig = {}) {
  const config = { ...storeConfig, ...customConfig };
  const phone = config.whatsappNumber.replace(/[^0-9]/g, '');

  if (!cart || cart.length === 0) {
    const defaultMsg = `Halo Admin ${config.name}, saya ingin tanya-tanya tentang menu Sate Taichan dan Es Puding.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(defaultMsg)}`;
  }

  const itemsList = cart
    .map((item) => {
      const addonLabel = item.withAddon && item.addonName ? ` (+ ${item.addonName})` : '';
      const subtotal = item.unitPrice * item.qty;
      return `• ${item.qty}x ${item.name}${addonLabel} = ${formatRupiah(subtotal)}`;
    })
    .join('\n');

  const grandTotal = cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);

  const text = 
`Halo Admin ${config.name}! 👋
Saya ingin memesan:

${itemsList}

💰 *Total Pembayaran: ${formatRupiah(grandTotal)}*

Mohon konfirmasi ketersediaan dan nomor rekening pembayarannya ya. Terima kasih! 🙏`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
