'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../components/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <div className="cart-page container section">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven&apos;t added anything yet.</p>
          <Link href="/shop" className="btn-primary">Start Shopping →</Link>
        </div>
      </div>
    );
  }

  const shipping = cartTotal >= 100 ? 0 : 9.99;
  const total = cartTotal + shipping;

  return (
    <div className="cart-page container section">
      <h1>Shopping Cart ({cartCount})</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <Image src={item.image} alt={item.name} width={300} height={300} className="cart-item-image" />
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-category">{item.category}</div>
                <div className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</div>
                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button className="quantity-btn" onClick={() => updateQuantity(item._id, item.quantity - 1)}>−</button>
                    <input className="quantity-value" value={item.quantity} readOnly />
                    <button className="quantity-btn" onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                  </div>
                  <button className="btn-danger" onClick={() => removeFromCart(item._id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>${cartTotal.toFixed(2)}</span></div>
          <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
          <div className="summary-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <Link href="/checkout" className="btn-primary">Proceed to Checkout</Link>
          {shipping > 0 && (
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '12px', textAlign: 'center' }}>
              Add ${(100 - cartTotal).toFixed(2)} more for free shipping
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
