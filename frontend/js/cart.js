const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

const renderCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (!cartItems || !cartTotal) return;

  if (!cart.length) {
    cartItems.innerHTML = '<p class="alert alert-info">Your cart is empty.</p>';
    cartTotal.textContent = '$0.00';
    return;
  }

  cartItems.innerHTML = cart.map((item, index) => `
    <div class="card p-3 mb-3">
      <div class="row g-3 align-items-center">
        <div class="col-3"><img src="${item.image}" class="img-fluid rounded" alt="${item.name}" /></div>
        <div class="col-6">
          <h6>${item.name}</h6>
          <p class="mb-1">$${item.price.toFixed(2)}</p>
          <div class="input-group input-group-sm" style="max-width: 140px;">
            <button class="btn btn-outline-secondary quantity-btn" data-index="${index}" data-action="decrease">-</button>
            <input type="text" class="form-control text-center" value="${item.quantity}" readonly />
            <button class="btn btn-outline-secondary quantity-btn" data-index="${index}" data-action="increase">+</button>
          </div>
        </div>
        <div class="col-3 text-end">
          <button class="btn btn-sm btn-danger remove-btn" data-index="${index}">Remove</button>
        </div>
      </div>
    </div>
  `).join('');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
};

const updateCart = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
};

cartItems?.addEventListener('click', (event) => {
  const target = event.target;
  const index = target.dataset.index;
  const action = target.dataset.action;
  if (index === undefined) return;

  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (action === 'increase') {
    cart[index].quantity += 1;
    updateCart(cart);
  }
  if (action === 'decrease') {
    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
      updateCart(cart);
    }
  }
  if (target.classList.contains('remove-btn')) {
    cart.splice(index, 1);
    updateCart(cart);
  }
});

checkoutBtn?.addEventListener('click', () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (!cart.length) {
    alert('Your cart is empty');
    return;
  }
  localStorage.setItem('checkoutCart', JSON.stringify(cart));
  window.location.href = 'checkout.html';
});

renderCart();
