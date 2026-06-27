const checkoutForm = document.getElementById('checkoutForm');
const orderSummary = document.getElementById('orderSummary');

const cart = JSON.parse(localStorage.getItem('checkoutCart')) || [];
const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

const renderSummary = () => {
  if (!orderSummary) return;
  if (!cart.length) {
    orderSummary.innerHTML = '<p class="alert alert-info">No items to checkout.</p>';
    return;
  }
  orderSummary.innerHTML = `
    ${cart.map((item) => `
      <div class="d-flex justify-content-between mb-2">
        <div>
          <strong>${item.name}</strong>
          <div class="text-muted">Qty ${item.quantity}</div>
        </div>
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    `).join('')}
    <hr />
    <div class="d-flex justify-content-between fw-bold">
      <span>Total</span>
      <span>$${total.toFixed(2)}</span>
    </div>
  `;
};

checkoutForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!cart.length) {
    alert('No items to checkout');
    return;
  }

  const shippingAddress = `${document.getElementById('address').value}, ${document.getElementById('city').value}, ${document.getElementById('state').value} ${document.getElementById('postalCode').value}`;
  const paymentMethod = document.getElementById('paymentMethod').value;

  const order = {
    shippingAddress,
    paymentMethod,
    cartItems: cart,
  };
  localStorage.setItem('orderConfirmation', JSON.stringify(order));
  localStorage.removeItem('checkoutCart');
  window.location.href = 'order-confirmation.html';
});

renderSummary();
