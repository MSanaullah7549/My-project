const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');
const productImages = document.getElementById('productImages');
const productDetails = document.getElementById('productDetails');
const reviewList = document.getElementById('reviewList');

const products = [
  { id: '1', name: 'Wireless Headphones', description: 'High-quality wireless headphones for music and calls.', price: 79.99, category: 'Electronics', images: ['assets/product-1.svg'], rating: 4.5, reviews: [{ user: 'Julia', rating: 5, comment: 'Great sound!' }] },
  { id: '2', name: 'Modern Desk Lamp', description: 'Stylish LED desk lamp with adjustable brightness.', price: 34.99, category: 'Home', images: ['assets/product-2.svg'], rating: 4.0, reviews: [{ user: 'Alex', rating: 4, comment: 'Very sleek.' }] },
  { id: '3', name: 'Running Sneakers', description: 'Comfortable running shoes for everyday workouts.', price: 59.99, category: 'Fashion', images: ['assets/product-3.svg'], rating: 4.3, reviews: [{ user: 'Mia', rating: 4, comment: 'Super comfy.' }] },
];

const product = products.find((item) => item.id === productId) || products[0];

if (productImages && productDetails) {
  productImages.innerHTML = `
    <div class="card shadow-sm border-0">
      <img src="${product.images[0]}" class="card-img-top" alt="${product.name}" />
    </div>
  `;

  productDetails.innerHTML = `
    <div class="card p-4 shadow-sm border-0">
      <h2>${product.name}</h2>
      <p class="text-muted">${product.category}</p>
      <div class="mb-3"><strong>$${product.price.toFixed(2)}</strong></div>
      <p>${product.description}</p>
      <div class="d-flex gap-2 mb-3">
        <button id="addToCartBtn" class="btn btn-primary">Add to Cart</button>
        <a href="cart.html" class="btn btn-outline-secondary">View Cart</a>
      </div>
      <div><span class="badge bg-success">${product.rating} ★</span></div>
    </div>
  `;

  const reviewsHTML = product.reviews.map((review) => `
    <div class="card p-3 mb-3">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <strong>${review.user}</strong>
        <span class="badge bg-warning text-dark">${review.rating} ★</span>
      </div>
      <p>${review.comment}</p>
    </div>
  `).join('');
  reviewList.innerHTML = reviewsHTML;

  const addToCartBtn = document.getElementById('addToCartBtn');
  addToCartBtn.addEventListener('click', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1, image: product.images[0] });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart');
  });
}
