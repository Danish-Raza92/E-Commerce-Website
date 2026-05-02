import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <h3>Daniii.Store</h3>
          <p>Your premium destination for curated lifestyle products. Quality meets design in every item we offer.</p>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <Link href="/shop">All Products</Link>
          <Link href="/shop?category=Electronics">Electronics</Link>
          <Link href="/shop?category=Clothing">Clothing</Link>
          <Link href="/shop?category=Accessories">Accessories</Link>
        </div>
        <div className="footer-col">
          <h4>Support</h4>
          <a href="#">FAQ</a>
          <a href="#">Shipping</a>
          <a href="#">Returns</a>
          <a href="#">Contact</a>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="#">Careers</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; 2026 Daniii.Store. All rights reserved.</span>
        <span>Made with 💜</span>
      </div>
    </footer>
  );
}
