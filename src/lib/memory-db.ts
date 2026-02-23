// In-memory database for Vercel deployment
// This is a temporary solution for demo purposes

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  role: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  image: string;
  images?: string;
  stock: number;
  featured: boolean;
  status: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

// In-memory storage
let users: User[] = [
  {
    id: 'admin-user-id',
    email: 'admin@shophub.com',
    name: 'Admin User',
    password: '$2b$12$ifuTMa7aPMiI6vo9QsF7m.TiLBSQJkfht60st.fUuR97oMLYeb2JO', // admin123
    role: 'ADMIN',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'regular-user-id',
    email: 'user@shophub.com',
    name: 'John Doe',
    password: '$2b$12$FfOaayh2Cn.oBcnocmDRaOtH6o7BtoMgZxlt2FPg5/RMoUCWGChvC', // user123
    role: 'USER',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

let categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Electronics',
    slug: 'electronics',
    description: 'Electronic devices and gadgets',
    image: '/categories/electronics.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cat-2',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Clothing and accessories',
    image: '/categories/fashion.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cat-3',
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Home decor and garden supplies',
    image: '/categories/home-garden.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'cat-4',
    name: 'Sports',
    slug: 'sports',
    description: 'Sports equipment and accessories',
    image: '/categories/sports.jpg',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

let products: Product[] = [
  {
    id: 'prod-1',
    title: 'Wireless Bluetooth Headphones',
    slug: 'wireless-bluetooth-headphones',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
    price: 199.99,
    discountPrice: 149.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    images: '["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"]',
    stock: 50,
    featured: true,
    status: 'ACTIVE',
    categoryId: 'cat-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-2',
    title: 'Smart Watch Pro',
    slug: 'smart-watch-pro',
    description: 'Advanced fitness tracking and health monitoring smartwatch',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400',
    images: '["https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400"]',
    stock: 30,
    featured: true,
    status: 'ACTIVE',
    categoryId: 'cat-1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'prod-3',
    title: 'Designer Leather Jacket',
    slug: 'designer-leather-jacket',
    description: 'Genuine leather jacket with modern cut and premium finish',
    price: 399.99,
    discountPrice: 299.99,
    image: 'https://images.unsplash.com/photo-1551488831-582a1a532a2b?w=400',
    images: '["https://images.unsplash.com/photo-1551488831-582a1a532a2b?w=400"]',
    stock: 15,
    featured: true,
    status: 'ACTIVE',
    categoryId: 'cat-2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

// Prisma-like interface for compatibility
export const memoryDB = {
  user: {
    findUnique: async ({ where }: { where: { email?: string; id?: string } }) => {
      if (where.email) {
        return users.find(user => user.email === where.email) || null;
      }
      if (where.id) {
        return users.find(user => user.id === where.id) || null;
      }
      return null;
    },
    findMany: async () => {
      return users;
    },
    create: async ({ data }: { data: Omit<User, 'id' | 'createdAt' | 'updatedAt'> }) => {
      const newUser: User = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      users.push(newUser);
      return newUser;
    }
  },
  category: {
    findMany: async () => {
      return categories;
    },
    findUnique: async ({ where }: { where: { slug?: string; id?: string } }) => {
      if (where.slug) {
        return categories.find(cat => cat.slug === where.slug) || null;
      }
      if (where.id) {
        return categories.find(cat => cat.id === where.id) || null;
      }
      return null;
    }
  },
  product: {
    findMany: async ({ where }: { where?: { categoryId?: string; featured?: boolean } } = {}) => {
      let filtered = products;
      
      if (where?.categoryId) {
        filtered = filtered.filter(p => p.categoryId === where.categoryId);
      }
      
      if (where?.featured !== undefined) {
        filtered = filtered.filter(p => p.featured === where.featured);
      }
      
      return filtered;
    },
    findUnique: async ({ where }: { where: { slug?: string; id?: string } }) => {
      if (where.slug) {
        return products.find(p => p.slug === where.slug) || null;
      }
      if (where.id) {
        return products.find(p => p.id === where.id) || null;
      }
      return null;
    },
    create: async ({ data }: { data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> }) => {
      const newProduct: Product = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      products.push(newProduct);
      return newProduct;
    }
  },
  $connect: async () => {
    console.log('Memory DB connected');
  },
  $disconnect: async () => {
    console.log('Memory DB disconnected');
  }
};
