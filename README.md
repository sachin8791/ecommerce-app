# ShopHub - Full-Stack E-Commerce Application

A modern, full-featured e-commerce application built with Next.js 14, TypeScript, and Tailwind CSS.

## 🚀 Features

### User Features
- **Authentication**: JWT-based login/register system with protected routes
- **Product Browsing**: Search, filter, and paginate products
- **Shopping Cart**: Add to cart, update quantities, remove items
- **Wishlist**: Save favorite products for later
- **Product Details**: Detailed product pages with images and reviews
- **Checkout**: Stripe payment integration
- **Order History**: View past orders and track status
- **User Profile**: Update account information

### Admin Features
- **Admin Dashboard**: Comprehensive admin panel
- **Product Management**: Add, edit, delete products
- **Order Management**: View and manage customer orders
- **User Management**: Manage user accounts
- **Analytics**: Sales, orders, and user statistics

### Technical Features
- **Modern UI**: Amazon/Flipkart-style design with Tailwind CSS + ShadCN UI
- **Responsive**: Mobile-first responsive design
- **State Management**: Zustand for cart and wishlist
- **Database**: PostgreSQL with Prisma ORM
- **Image Upload**: Cloudinary integration
- **Payments**: Stripe payment processing
- **SEO Optimized**: Meta tags and structured data
- **Type Safety**: Full TypeScript implementation

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, ShadCN UI
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: JWT tokens
- **State Management**: Zustand
- **Payments**: Stripe
- **Image Storage**: Cloudinary
- **Deployment**: Vercel ready

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Stripe account (for payments)
- Cloudinary account (for images)

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd ecommerce-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Variables**
Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce_db"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Cloudinary
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Next.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"
```

4. **Database Setup**
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database (creates tables)
npm run db:push

# Seed database with sample data
npm run db:seed
```

5. **Start Development Server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📱 Usage

### Default Accounts
After seeding the database, you can use these accounts:

**Admin Account:**
- Email: admin@shophub.com
- Password: admin123

**User Account:**
- Email: user@shophub.com
- Password: user123

### Key Features

1. **Browse Products**: Visit `/products` to browse all available products
2. **Search & Filter**: Use the search bar and filters to find specific products
3. **Shopping Cart**: Add products to cart and manage quantities
4. **Checkout**: Complete purchase with Stripe payment
5. **Admin Panel**: Access `/admin` (admin account required) to manage products and orders

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── products/      # Product endpoints
│   │   └── categories/    # Category endpoints
│   ├── admin/             # Admin dashboard pages
│   ├── products/          # Product listing page
│   ├── login/             # Login page
│   ├── register/          # Registration page
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # ShadCN UI components
│   └── layout/           # Layout components (Navbar, Footer)
├── lib/                   # Utility libraries
│   ├── auth.ts           # Authentication utilities
│   ├── prisma.ts         # Prisma client
│   └── store.ts          # Zustand stores
└── middleware.ts          # Next.js middleware for auth

prisma/
├── schema.prisma         # Database schema
├── seed.ts              # Database seed script
└── prisma.config.ts     # Prisma configuration
```

## 🚀 Deployment

### Vercel Deployment

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
- Import your GitHub repository in Vercel
- Add environment variables in Vercel dashboard
- Deploy

### Environment Variables for Production
Make sure to add all environment variables from `.env.local` to your Vercel project settings.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you have any questions or issues, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ using Next.js 14 and modern web technologies**
