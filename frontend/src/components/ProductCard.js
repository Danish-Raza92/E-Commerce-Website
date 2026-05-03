'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from './CartContext';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/product/${product._id}`} className="product-card">
      <div className="product-card-image-wrap">
        <Image src={product.image} alt={product.name} width={600} height={600} className="product-card-image" />
        {discount > 0 && <span className="product-card-badge">-{discount}%</span>}
      </div>
      <div className="product-card-body">
        <div className="product-card-category">{product.category}</div>
        <div className="product-card-name">{product.name}</div>
        <div className="product-card-rating">
          <span className="product-card-stars">{stars}</span>
          <span>({product.reviewCount})</span>
        </div>
        <div className="product-card-footer">
          <div>
            <span className="product-card-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="product-card-original">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button className="product-card-cart-btn" onClick={handleAdd} title="Add to cart">
            {added ? '✓' : '+'}
          </button>
        </div>
      </div>
    </Link>
  );
}
