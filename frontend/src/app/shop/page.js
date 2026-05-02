'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { fetchProducts, fetchCategories } from '../../lib/api';
import ProductCard from '../../components/ProductCard';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCats() {
      try {
        const cats = await fetchCategories();
        setCategories(['All', ...cats]);
      } catch (err) { console.error(err); }
    }
    loadCats();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const params = {};
        if (activeCategory !== 'All') params.category = activeCategory;
        if (search) params.search = search;
        const data = await fetchProducts(params);
        setProducts(data);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    }
    const timer = setTimeout(loadProducts, search ? 300 : 0);
    return () => clearTimeout(timer);
  }, [activeCategory, search]);

  return (
    <div className="shop-page container section">
      <div className="shop-header">
        <h1>Shop</h1>
        <p>{products.length} products available</p>
      </div>
      <div className="shop-filters">
        <input
          className="search-input"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >{cat}</button>
        ))}
      </div>
      {loading ? (
        <div className="loading"><div className="spinner"></div></div>
      ) : products.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon">🔍</div>
          <h2>No products found</h2>
          <p>Try a different search or category</p>
        </div>
      ) : (
        <div className="product-grid">
          {products.map(p => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
}
