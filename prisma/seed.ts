import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/lib/auth';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create admin user
  const adminPassword = await hashPassword('admin123');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@shophub.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@shophub.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Create regular user
  const userPassword = await hashPassword('user123');
  const user = await prisma.user.upsert({
    where: { email: 'user@shophub.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'user@shophub.com',
      password: userPassword,
      role: 'USER',
    },
  });

  console.log('Created users:', { admin, user });

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'electronics' },
      update: {},
      create: {
        name: 'Electronics',
        slug: 'electronics',
        description: 'Electronic devices and gadgets',
        image: '/categories/electronics.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'fashion' },
      update: {},
      create: {
        name: 'Fashion',
        slug: 'fashion',
        description: 'Clothing and accessories',
        image: '/categories/fashion.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'home-garden' },
      update: {},
      create: {
        name: 'Home & Garden',
        slug: 'home-garden',
        description: 'Home decor and garden supplies',
        image: '/categories/home-garden.jpg',
      },
    }),
    prisma.category.upsert({
      where: { slug: 'sports' },
      update: {},
      create: {
        name: 'Sports',
        slug: 'sports',
        description: 'Sports equipment and accessories',
        image: '/categories/sports.jpg',
      },
    }),
  ]);

  console.log('Created categories:', categories.map((c: any) => c.name));

  // Create products
  const products = [
    // Electronics
    {
      title: 'Wireless Bluetooth Headphones',
      slug: 'wireless-bluetooth-headphones',
      description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
      price: 199.99,
      discountPrice: 149.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      images: JSON.stringify(['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400']),
      stock: 50,
      featured: true,
      categoryId: categories[0].id,
    },
    {
      title: 'Smart Watch Pro',
      slug: 'smart-watch-pro',
      description: 'Advanced fitness tracking and health monitoring smartwatch',
      price: 299.99,
      discountPrice: null,
      image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400',
      images: JSON.stringify(['https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400']),
      stock: 30,
      featured: true,
      categoryId: categories[0].id,
    },
    {
      title: '4K Webcam',
      slug: '4k-webcam',
      description: 'Ultra HD webcam for professional video calls and streaming',
      price: 129.99,
      discountPrice: 99.99,
      image: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=400',
      images: JSON.stringify(['https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=400']),
      stock: 25,
      featured: false,
      categoryId: categories[0].id,
    },
    
    // Fashion
    {
      title: 'Designer Leather Jacket',
      slug: 'designer-leather-jacket',
      description: 'Genuine leather jacket with modern cut and premium finish',
      price: 399.99,
      discountPrice: 299.99,
      image: 'https://images.unsplash.com/photo-1551488831-582a1a532a2b?w=400',
      images: JSON.stringify(['https://images.unsplash.com/photo-1551488831-582a1a532a2b?w=400']),
      stock: 15,
      featured: true,
      categoryId: categories[1].id,
    },
    {
      title: 'Classic Denim Jeans',
      slug: 'classic-denim-jeans',
      description: 'Comfortable fit denim jeans with timeless style',
      price: 79.99,
      discountPrice: null,
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400',
      images: JSON.stringify(['https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400']),
      stock: 40,
      featured: false,
      categoryId: categories[1].id,
    },
    
    // Home & Garden
    {
      title: 'Modern LED Desk Lamp',
      slug: 'modern-led-desk-lamp',
      description: 'Adjustable LED desk lamp with multiple brightness settings',
      price: 49.99,
      discountPrice: 34.99,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      images: JSON.stringify(['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400']),
      stock: 60,
      featured: false,
      categoryId: categories[2].id,
    },
    {
      title: 'Indoor Plant Collection',
      slug: 'indoor-plant-collection',
      description: 'Set of 3 low-maintenance indoor plants with decorative pots',
      price: 89.99,
      discountPrice: null,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
      images: JSON.stringify(['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400']),
      stock: 20,
      featured: true,
      categoryId: categories[2].id,
    },
    
    // Sports
    {
      title: 'Professional Yoga Mat',
      slug: 'professional-yoga-mat',
      description: 'Extra thick non-slip yoga mat with carrying strap',
      price: 39.99,
      discountPrice: 29.99,
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400',
      images: JSON.stringify(['https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400']),
      stock: 35,
      featured: false,
      categoryId: categories[3].id,
    },
    {
      title: 'Running Shoes Pro',
      slug: 'running-shoes-pro',
      description: 'High-performance running shoes with advanced cushioning',
      price: 129.99,
      discountPrice: null,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
      images: JSON.stringify(['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400']),
      stock: 45,
      featured: true,
      categoryId: categories[3].id,
    },
  ];

  for (const productData of products) {
    await prisma.product.upsert({
      where: { slug: productData.slug },
      update: productData,
      create: productData,
    });
  }

  console.log('Created products:', products.length);

  // Create some reviews
  const createdProducts = await prisma.product.findMany({
    take: 5,
  });

  for (const product of createdProducts) {
    await prisma.review.create({
      data: {
        rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
        comment: 'Great product! Highly recommended.',
        userId: user.id,
        productId: product.id,
      },
    });
  }

  console.log('Created reviews');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
