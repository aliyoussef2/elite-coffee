/* ======================================
   DOPAMINE -- WhatsApp Order
   js/order.js
   ====================================== */

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('whatsapp-order-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    if (!Basket.items.length) return;

  const name     = document.getElementById('customer-name')?.value.trim() || '';
    const phone    = document.getElementById('customer-phone')?.value.trim() || '';
    const location = document.getElementById('customer-location')?.value.trim() || '';

    if (!name || !phone || !location) {
      Basket._toast('Please enter your name, phone and location');
      return;
    }
    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

let msg = `*New Order - Dopamine*\n`;
    msg += `Date: ${dateStr} ${timeStr}\n`;
    msg += `Name: ${name}\n`;
    msg += `Phone: ${phone}\n`;
    msg += `Location: ${location}\n\n`;
    msg += `*Items:*\n`;

    let total = 0;
    Basket.items.forEach((it, idx) => {
      msg += `${idx + 1}. ${it.name} - $${it.price.toFixed(2)}`;
      if (it.note) msg += ` (Note: ${it.note})`;
      msg += `\n`;
      total += it.price;
    });

const totalLbp = Math.round(total * Data.rate).toLocaleString();
    msg += `\n*Total: $${total.toFixed(2)} (${totalLbp} LBP)*`;
    msg += `\n\n_Delivery fee depends on your location._`;

    const waNumber = Data.waNum;
    const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  });
});
