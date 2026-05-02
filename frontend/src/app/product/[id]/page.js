'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchProductById, fetchRelatedProducts } from '../../../lib/api';
import { useCart } from '../../../components/CartContext';
import ProductCard from '../../../components/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [prod, rel] = await Promise.all([
          fetchProductById(id),
          fetchRelatedProducts(id)
        ]);
        setProduct(prod);
        setRelated(rel);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    }
    load();
  }, [id]);

  const handleAdd = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <div className="product-detail container section"><div className="loading"><div className="spinner"></div></div></div>;
  if (!product) return <div className="product-detail container section"><p>Product not found</p></div>;

  const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));

  return (
    <div className="product-detail container section">
      <div className="product-detail-grid">
        <div>
          <img src={product.image} alt={product.name} className="product-detail-image" />
        </div>
        <div className="product-detail-info">
          <div className="product-detail-category">{product.category}</div>
          <h1>{product.name}</h1>
          <div className="product-detail-rating">
            <span style={{ color: '#fbbf24' }}>{stars}</span>
            <span>{product.rating} ({product.reviewCount} reviews)</span>
          </div>
          <div className="product-detail-price">${product.price.toFixed(2)}</div>
          {product.originalPrice && (
            <div className="product-detail-original">${product.originalPrice.toFixed(2)}</div>
          )}
          <p className="product-detail-desc">{product.description}</p>
          <div className="product-detail-actions">
            <div className="quantity-control">
              <button className="quantity-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <input className="quantity-value" value={quantity} readOnly />
              <button className="quantity-btn" onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
            <button className="btn-primary" onClick={handleAdd}>
              {added ? '✓ Added to Cart' : '🛒 Add to Cart'}
            </button>
          </div>
          <div className="product-detail-features">
            <div className="feature-item"><span className="feature-icon">🚚</span> Free Shipping</div>
            <div className="feature-item"><span className="feature-icon">🔄</span> 30-Day Returns</div>
            <div className="feature-item"><span className="feature-icon">🛡️</span> 2-Year Warranty</div>
            <div className="feature-item"><span className="feature-icon">📦</span> {product.inStock ? 'In Stock' : 'Out of Stock'}</div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="section" style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div className="section-header">
            <h2>Related Products</h2>
            <p>You might also like</p>
          </div>
          <div className="product-grid">
            {related.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        </section>
      )}
      {added && <div className="toast">✓ Added to cart!</div>}
    </div>
  );
}
