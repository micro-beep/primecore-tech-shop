const products = [
  {
    name: 'RTX 4070 Pro Gaming PC',
    category: 'Gaming Desktop',
    price: '$1,899',
    oldPrice: '$2,299',
    rating: '5.0',
    badge: 'Best seller',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Creator Workstation X9',
    category: 'Workstation',
    price: '$2,499',
    oldPrice: '$2,899',
    rating: '4.9',
    badge: 'New',
    image: 'https://images.unsplash.com/photo-1587202372775-98927b1f0c7c?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'UltraBook Air 14',
    category: 'Laptop',
    price: '$1,299',
    oldPrice: '$1,599',
    rating: '4.8',
    badge: 'Popular',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: '4K Studio Monitor',
    category: 'Accessories',
    price: '$649',
    oldPrice: '$799',
    rating: '4.9',
    badge: 'Bundle',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80'
  }
];

const productGrid = document.getElementById('productGrid');
const cartCount = document.getElementById('cartCount');
const contactForm = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
const yearEl = document.getElementById('year');
const salesEmail = 'sales@primecoretech.com';

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <img src="${product.image}" alt="${product.name}" />
          <div class="product-body">
            <div class="product-meta">
              <span class="product-category">${product.category}</span>
              <span class="badge">${product.badge}</span>
            </div>
            <h3>${product.name}</h3>
            <div class="product-rating">
              <span>★★★★★</span>
              <small>${product.rating}</small>
            </div>
            <div class="product-row">
              <div>
                <span class="price">${product.price}</span>
                <span class="old-price">${product.oldPrice}</span>
              </div>
              <button class="product-btn" type="button">Add</button>
            </div>
          </div>
        </article>
      `
    )
    .join('');

  const buttons = productGrid.querySelectorAll('.product-btn');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const nextCount = Number(cartCount.textContent) + 1;
      cartCount.textContent = String(nextCount);
      button.textContent = 'Added';
      button.disabled = true;
      setTimeout(() => {
        button.textContent = 'Add';
        button.disabled = false;
      }, 900);
    });
  });
}

if (productGrid) {
  renderProducts();
}

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = (formData.get('name') || 'Customer').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const project = (formData.get('project') || 'General inquiry').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    const subject = encodeURIComponent(`PrimeCore inquiry from ${name} - ${project}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject type: ${project}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:${salesEmail}?subject=${subject}&body=${body}`;
    formMsg.textContent = `Thanks, ${name}! Your inquiry is being sent to ${salesEmail}. Please confirm the email window that opens.`;
    contactForm.reset();
  });
}
