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
      showToast(`${name} added to cart`);
    });
  });
});