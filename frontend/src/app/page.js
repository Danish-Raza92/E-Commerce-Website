'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchProducts, fetchCategories } from '../lib/api';
import ProductCard from '../components/ProductCard';

const categoryIcons = {
  'Electronics': '⚡', 'Accessories': '👜', 'Clothing': '👕',
  'Home & Kitchen': '🏠', 'Sports': '🏋️',
};

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [prods, cats] = await Promise.all([
          fetchProducts({ featured: 'true', limit: '6' }),
          fetchCategories()
        ]);
        setFeatured(prods);
        setCategories(cats);
      } catch (err) {
        console.error('Failed to load:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">✨ New Collection 2026</div>
          <h1>
            Elevate Your<br />
            <span className="gradient">Lifestyle</span>
          </h1>
          <p>Discover curated products designed for those who appreciate quality, style, and innovation. Free shipping on orders over $100.</p>
          <div className="hero-buttons">
            <Link href="/shop" className="btn-primary">Shop Now →</Link>
            <Link href="/shop" className="btn-secondary">Browse Categories</Link>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>Find exactly what you&apos;re looking for</p>
        </div>
        <div className="categories-grid">
          {categories.map(cat => (
            <Link href={`/shop?category=${encodeURIComponent(cat)}`} key={cat} className="category-card">
              <div className="category-card-icon">{categoryIcons[cat] || '📦'}</div>
              <div className="category-card-name">{cat}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Hand-picked favorites from our collection</p>
        </div>
        {loading ? (
          <div className="loading"><div className="spinner"></div></div>
        ) : (
          <div className="product-grid">
            {featured.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/shop" className="btn-secondary">View All Products →</Link>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="section">
        <div className="newsletter">
          <h2>Stay in the Loop</h2>
          <p>Subscribe for exclusive deals, new arrivals, and style tips.</p>
          <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Enter your email" />
            <button className="btn-primary btn-sm">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}
