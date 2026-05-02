const API_BASE = 'http://localhost:5000/api';

export async function fetchProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE}/products${query ? '?' + query : ''}`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export async function fetchProductById(id) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export async function fetchRelatedProducts(id) {
  const res = await fetch(`${API_BASE}/products/${id}/related`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch related products');
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/products/categories`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

export async function createOrder(orderData) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  if (!res.ok) throw new Error('Failed to create order');
  return res.json();
}

export async function fetchOrder(id) {
  const res = await fetch(`${API_BASE}/orders/${id}`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch order');
  return res.json();
}
