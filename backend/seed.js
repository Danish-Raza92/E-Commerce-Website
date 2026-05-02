const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');

const products = [
  {
    name: 'Wireless Noise-Cancelling Headphones',
    slug: 'wireless-nc-headphones',
    description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and studio-quality sound. Features Bluetooth 5.3, multipoint connection, and a foldable design for ultimate portability.',
    price: 249.99,
    originalPrice: 349.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    rating: 4.8,
    reviewCount: 342,
    inStock: true,
    featured: true,
    tags: ['headphones', 'wireless', 'noise-cancelling']
  },
  {
    name: 'Minimalist Leather Watch',
    slug: 'minimalist-leather-watch',
    description: 'Elegant timepiece with a genuine Italian leather strap, sapphire crystal glass, and Swiss movement. Water-resistant up to 50 meters with a slim 7mm profile.',
    price: 189.99,
    originalPrice: 259.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80',
    rating: 4.6,
    reviewCount: 198,
    inStock: true,
    featured: true,
    tags: ['watch', 'leather', 'minimalist']
  },
  {
    name: 'Ultra-Slim Laptop Stand',
    slug: 'ultra-slim-laptop-stand',
    description: 'Ergonomic aluminum laptop stand with adjustable height and angle. Supports laptops up to 17 inches and folds flat for easy transport. Improves posture and airflow.',
    price: 59.99,
    originalPrice: 79.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&q=80',
    rating: 4.5,
    reviewCount: 456,
    inStock: true,
    featured: false,
    tags: ['laptop', 'stand', 'ergonomic']
  },
  {
    name: 'Organic Cotton Hoodie',
    slug: 'organic-cotton-hoodie',
    description: 'Sustainably made hoodie crafted from 100% organic cotton. Features a relaxed fit, kangaroo pocket, and brushed fleece interior for maximum comfort.',
    price: 79.99,
    originalPrice: 99.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&q=80',
    rating: 4.7,
    reviewCount: 267,
    inStock: true,
    featured: true,
    tags: ['hoodie', 'organic', 'cotton']
  },
  {
    name: 'Smart Fitness Tracker',
    slug: 'smart-fitness-tracker',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, sleep tracking, and 14-day battery life. Water-resistant to 50m with a vibrant AMOLED display.',
    price: 129.99,
    originalPrice: 179.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&q=80',
    rating: 4.4,
    reviewCount: 523,
    inStock: true,
    featured: true,
    tags: ['fitness', 'tracker', 'smart']
  },
  {
    name: 'Ceramic Pour-Over Coffee Set',
    slug: 'ceramic-pour-over-coffee-set',
    description: 'Hand-crafted ceramic pour-over set including dripper, carafe, and two mugs. Perfect for brewing single-origin coffee with precision and style.',
    price: 64.99,
    originalPrice: 89.99,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    rating: 4.9,
    reviewCount: 178,
    inStock: true,
    featured: false,
    tags: ['coffee', 'ceramic', 'kitchen']
  },
  {
    name: 'Canvas Weekender Bag',
    slug: 'canvas-weekender-bag',
    description: 'Durable waxed canvas weekender bag with leather handles and brass hardware. Spacious main compartment with shoe pocket and padded laptop sleeve.',
    price: 119.99,
    originalPrice: 159.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
    rating: 4.6,
    reviewCount: 134,
    inStock: true,
    featured: false,
    tags: ['bag', 'canvas', 'travel']
  },
  {
    name: 'Bluetooth Mechanical Keyboard',
    slug: 'bluetooth-mechanical-keyboard',
    description: 'Compact 75% mechanical keyboard with hot-swappable switches, RGB backlighting, and multi-device Bluetooth. CNC aluminum frame with PBT keycaps.',
    price: 149.99,
    originalPrice: 199.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=600&q=80',
    rating: 4.7,
    reviewCount: 289,
    inStock: true,
    featured: true,
    tags: ['keyboard', 'mechanical', 'bluetooth']
  },
  {
    name: 'Premium Yoga Mat',
    slug: 'premium-yoga-mat',
    description: 'Extra-thick 6mm yoga mat made from natural rubber with a microfiber suede surface. Non-slip grip, alignment markers, and carrying strap included.',
    price: 68.99,
    originalPrice: 89.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&q=80',
    rating: 4.5,
    reviewCount: 412,
    inStock: true,
    featured: false,
    tags: ['yoga', 'mat', 'fitness']
  },
  {
    name: 'Stainless Steel Water Bottle',
    slug: 'stainless-steel-water-bottle',
    description: 'Double-wall vacuum insulated water bottle. Keeps drinks cold for 24 hours or hot for 12 hours. BPA-free with a leak-proof bamboo cap.',
    price: 34.99,
    originalPrice: 44.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80',
    rating: 4.3,
    reviewCount: 678,
    inStock: true,
    featured: false,
    tags: ['bottle', 'insulated', 'eco']
  },
  {
    name: 'Linen Blend Shirt',
    slug: 'linen-blend-shirt',
    description: 'Relaxed-fit shirt in a premium linen-cotton blend. Perfect for warm weather with a breathable weave, mother-of-pearl buttons, and a camp collar.',
    price: 69.99,
    originalPrice: 95.00,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
    rating: 4.4,
    reviewCount: 156,
    inStock: true,
    featured: false,
    tags: ['shirt', 'linen', 'casual']
  },
  {
    name: 'Aromatherapy Candle Set',
    slug: 'aromatherapy-candle-set',
    description: 'Set of 4 hand-poured soy wax candles with essential oil blends: Lavender, Eucalyptus, Vanilla, and Cedarwood. 40-hour burn time each.',
    price: 44.99,
    originalPrice: 59.99,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1602607912066-fd0a8e44fc21?w=600&q=80',
    rating: 4.8,
    reviewCount: 321,
    inStock: true,
    featured: true,
    tags: ['candle', 'aromatherapy', 'soy']
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/daniii_store');
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    const created = await Product.insertMany(products);
    console.log(`🌱 Seeded ${created.length} products`);

    await mongoose.connection.close();
    console.log('✅ Done!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
}

seed();
