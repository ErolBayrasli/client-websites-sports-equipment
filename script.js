const menuToggle = document.querySelector('.toggle');
const showcase = document.querySelector('.showcase');

if (menuToggle && showcase) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    showcase.classList.toggle('active');
  });
}

// Add-to-cart toast behavior
document.addEventListener('DOMContentLoaded', () => {
  const toast = document.getElementById('cart-toast');
  const addButtons = Array.from(document.querySelectorAll('.add-cart'));

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      toast.hidden = true;
    }, 1800);
  }

  addButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.currentTarget.closest('.product-card');
      const name = card ? card.dataset.name || card.querySelector('.product-title')?.textContent : 'Item';
  // try to include quantity if present
  const qtyInput = card ? card.querySelector('#quantity') : document.getElementById('quantity');
  const qty = qtyInput ? Math.max(1, parseInt(qtyInput.value) || 1) : 1;
  showToast(`${name} (x${qty}) added to cart`);
    });
  });
});
// simple filter buttons
      (function(){
        const buttons = document.querySelectorAll('[data-filter]');
        const cards = document.querySelectorAll('.product-card');
        buttons.forEach(b=>b.addEventListener('click', e=>{
          buttons.forEach(x=>x.classList.remove('active'));
          b.classList.add('active');
          const f = b.getAttribute('data-filter');
          cards.forEach(c=>{
            if(f==='all' || c.dataset.category===f) c.style.display='flex'; else c.style.display='none';
          });
        }));

        // populate modal
        const modalEl = document.getElementById('productModal');
        if (modalEl) {
          modalEl.addEventListener('show.bs.modal', function (event) {
            const btn = event.relatedTarget;
            const card = btn.closest('.product-card');
            const title = card.dataset.title || card.querySelector('h3').innerText;
            const price = card.dataset.price || card.querySelector('.price').innerText;
            const desc = card.dataset.desc || card.querySelector('p').innerText;
            modalEl.querySelector('.modal-name').innerText = title;
            modalEl.querySelector('.modal-price').innerText = price;
            modalEl.querySelector('.modal-desc').innerText = desc;
          });
        }
      })();

// product page helpers (thumbnails + quantity controls outside the earlier DOMContentLoaded)
(function(){
  const thumbs = document.querySelectorAll('.modal-thumb');
  const main = document.getElementById('mainProductImg');
  if (thumbs && main) {
    thumbs.forEach(t=>t.addEventListener('click', ()=>{
      const src = t.getAttribute('data-large') || t.src;
      main.src = src;
      thumbs.forEach(x=>x.classList.remove('active'));
      t.classList.add('active');
    }));
  }

  const qty = document.getElementById('quantity');
  const up = document.getElementById('qtyUp');
  const down = document.getElementById('qtyDown');
  if (qty && up && down) {
    up.addEventListener('click', ()=>{ qty.value = Math.max(1, (parseInt(qty.value)||1) + 1); });
    down.addEventListener('click', ()=>{ qty.value = Math.max(1, (parseInt(qty.value)||1) - 1); });
    qty.addEventListener('input', ()=>{ if(!/^[0-9]*$/.test(qty.value)) qty.value = qty.value.replace(/[^0-9]/g,''); if(qty.value==='') qty.value='1'; });
  }
})();

// swatches, share, and UI polish
(function(){
  const swatches = document.querySelectorAll('.swatch');
  const main = document.getElementById('mainProductImg');
  if(swatches && swatches.length && main){
    swatches.forEach(s => s.addEventListener('click', ()=>{
      swatches.forEach(x=>x.classList.remove('selected'));
      s.classList.add('selected');
      const img = s.dataset.img;
      if(img) main.src = img;
    }));
  }

  const shareBtn = document.getElementById('shareBtn');
  if(shareBtn){
    shareBtn.addEventListener('click', async ()=>{
      const shareData = { title: document.title, text: 'Check out this product', url: location.href };
      if(navigator.share){
        try { await navigator.share(shareData); } catch(e) { /* user canceled */ }
      } else {
        // fallback: copy link
        try { await navigator.clipboard.writeText(location.href); alert('Link copied to clipboard'); } catch(e){ alert(location.href); }
      }
    });
  }

  // pulse animation on add-to-cart
  const addBtns = document.querySelectorAll('.add-cart');
  addBtns.forEach(b=>b.addEventListener('click', ()=>{
    b.animate([
      { transform: 'scale(1)' },
      { transform: 'scale(1.03)' },
      { transform: 'scale(1)' }
    ], { duration: 220, easing: 'ease-out' });
  }));
})();
