const latestProductsContainer = document.getElementById('latestProducts');

const products = [
  { id: '1', name: 'Wireless Headphones', price: 79.99, image: 'assets/product-1.svg', category: 'Electronics' },
  { id: '2', name: 'Modern Desk Lamp', price: 34.99, image: 'assets/product-2.svg', category: 'Home' },
  { id: '3', name: 'Running Sneakers', price: 59.99, image: 'assets/product-3.svg', category: 'Fashion' },
];

const renderLatest = () => {
  if (!latestProductsContainer) return;
  latestProductsContainer.innerHTML = products.map((product) => `
    <div class="col-md-4">
      <div class="card shadow-sm h-100 product-card">
        <img src="${product.image}" class="card-img-top" alt="${product.name}" />
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text text-muted">${product.category}</p>
          <div class="d-flex justify-content-between align-items-center">
            <span class="fw-bold">$${product.price.toFixed(2)}</span>
            <a href="product-details.html?id=${product.id}" class="btn btn-sm btn-primary">View</a>
          </div>
        </div>
      </div>
    </div>
  `).join('');
};

renderLatest();
