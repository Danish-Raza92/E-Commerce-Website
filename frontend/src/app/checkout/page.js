'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../components/CartContext';
import { createOrder } from '../../lib/api';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, cartCount } = useCart();
  const [form, setForm] = useState({
    fullName: '', email: '', address: '', city: '', postalCode: '', country: ''
  });
  const [orderId, setOrderId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (orderId) {
    return (
      <div className="checkout-page container section">
        <div className="order-success">
          <div className="order-success-icon">🎉</div>
          <h2>Order Placed Successfully!</h2>
          <p>Your order ID is <strong>{orderId}</strong></p>
          <p>Thank you for shopping with Daniii.Store!</p>
          <Link href="/shop" className="btn-primary" style={{ display: 'inline-block', marginTop: '16px' }}>Continue Shopping</Link>
        </div>
      </div>
    );
  }

  if (cartCount === 0) {
    return (
      <div className="checkout-page container section">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2>Nothing to checkout</h2>
          <p>Add some items to your cart first.</p>
          <Link href="/shop" className="btn-primary">Go to Shop</Link>
        </div>
      </div>
    );
  }

  const shipping = cartTotal >= 100 ? 0 : 9.99;
  const total = cartTotal + shipping;

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    for (const key of Object.keys(form)) {
      if (!form[key].trim()) { setError('Please fill in all fields.'); return; }
    }
    setSubmitting(true);
    try {
      const orderData = {
        items: cart.map(item => ({
          product: item._id, name: item.name,
          image: item.image, price: item.price, quantity: item.quantity
        })),
        shippingAddress: form,
        totalPrice: total,
        paymentMethod: 'cod'
      };
      const order = await createOrder(orderData);
      setOrderId(order._id);
      clearCart();
    } catch (err) {
      setError('Failed to place order. Make sure the backend is running.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="checkout-page container section">
      <h1>Checkout</h1>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Shipping Information</h3>
          {error && <p style={{ color: 'var(--danger)', marginBottom: '16px', fontSize: '0.9rem' }}>{error}</p>}
          <div className="form-group">
            <label>Full Name</label>
            <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input name="address" value={form.address} onChange={handleChange} placeholder="123 Main St" />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input name="city" value={form.city} onChange={handleChange} placeholder="New York" />
            </div>
            <div className="form-group">
              <label>Postal Code</label>
              <input name="postalCode" value={form.postalCode} onChange={handleChange} placeholder="10001" />
            </div>
          </div>
          <div className="form-group">
            <label>Country</label>
            <input name="country" value={form.country} onChange={handleChange} placeholder="United States" />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={submitting}>
            {submitting ? 'Placing Order...' : `Place Order — $${total.toFixed(2)}`}
          </button>
        </form>
        <div className="cart-summary">
          <h3>Order Summary</h3>
          {cart.map(item => (
            <div className="summary-row" key={item._id}>
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
          <div className="summary-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  );
}
