'use client';
import Link from 'next/link';
import { useCart } from './CartContext';

export default function Navbar() {
  const { cartCount } = useCart();
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo">Daniii<span>.Store</span></Link>
        <div className="navbar-links">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/cart">Cart</Link>
        </div>
        <Link href="/cart" className="cart-btn">
          🛒 Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}
