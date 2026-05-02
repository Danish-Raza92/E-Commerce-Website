import './globals.css';
import { CartProvider } from '../components/CartContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Daniii.Store — Premium Lifestyle Products',
  description: 'Discover curated lifestyle products at Daniii.Store. Shop electronics, fashion, accessories, and more with free shipping.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
