const productGrid = document.getElementById('productGrid');
const categorySelect = document.getElementById('categorySelect');
const searchInput = document.getElementById('searchInput');
const minPrice = document.getElementById('minPrice');
const maxPrice = document.getElementById('maxPrice');
const filterBtn = document.getElementById('filterBtn');

const products = [
  { id: '1', name: 'Wireless Headphones', price: 79.99, category: 'Electronics', image: 'assets/product-1.svg', rating: 4.5 },
  { id: '2', name: 'Modern Desk Lamp', price: 34.99, category: 'Home', image: 'assets/product-2.svg', rating: 4.0 },
  { id: '3', name: 'Running Sneakers', price: 59.99, category: 'Fashion', image: 'assets/product-3.svg', rating: 4.3 },
  { id: '4', name: 'Bluetooth Speaker', price: 45.0, category: 'Electronics', image: 'assets/product-4.svg', rating: 4.1 },
  { id: '5', name: 'Cozy Throw Blanket', price: 25.0, category: 'Home', image: 'assets/product-5.svg', rating: 4.7 },
];

const categories = ['', ...new Set(products.map((product) => product.category))];

const renderCategories = () => {
  if (!categorySelect) return;
  categorySelect.innerHTML = categories.map((value) => `<option value="${value}">${value || 'All'}</option>`).join('');
};

const renderProducts = (items) => {
  if (!productGrid) return;
  productGrid.innerHTML = items.map((product) => `
    <div class="col-md-6 col-xl-4">
      <div class="card product-card shadow-sm h-100">
        <img src="${product.image}" class="card-img-top" alt="${product.name}" />
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.name}</h5>
          <p class="text-muted mb-1">${product.category}</p>
          <div class="mb-3"><strong>$${product.price.toFixed(2)}</strong></div>
          <div class="mt-auto d-flex justify-content-between align-items-center">
            <a href="product-details.html?id=${product.id}" class="btn btn-sm btn-primary">Details</a>
            <span class="badge bg-success">${product.rating} ★</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
};

const applyFilters = () => {
  const categoryValue = categorySelect.value;
  const searchValue = searchInput.value.trim().toLowerCase();
  const min = Number(minPrice.value);
  const max = Number(maxPrice.value);
  const filtered = products.filter((product) => {
    const matchCategory = !categoryValue || product.category === categoryValue;
    const matchSearch = !searchValue || product.name.toLowerCase().includes(searchValue);
    const matchMin = !min || product.price >= min;
    const matchMax = !max || product.price <= max;
    return matchCategory && matchSearch && matchMin && matchMax;
  });
  renderProducts(filtered);
};

renderCategories();
renderProducts(products);
filterBtn.addEventListener('click', applyFilters);
