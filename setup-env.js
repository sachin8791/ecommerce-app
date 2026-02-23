const fs = require('fs');
const path = require('path');

// Create .env.local file with basic configuration
const envContent = `# Database Configuration
DATABASE_URL="file:./dev.db"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# Next.js Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-change-this-in-production"

# Stripe (add your keys later)
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# Cloudinary (add your keys later)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
`;

const envPath = path.join(__dirname, '.env.local');

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Created .env.local file with basic configuration');
  console.log('📝 Please update the values in .env.local with your actual credentials');
} else {
  console.log('⚠️  .env.local file already exists');
}

console.log('\n🚀 Next steps:');
console.log('1. Update DATABASE_URL in .env.local with your PostgreSQL connection string');
console.log('2. Or use SQLite for development: DATABASE_URL="file:./dev.db"');
console.log('3. Run: npm run db:generate');
console.log('4. Run: npm run db:push');
console.log('5. Run: npm run db:seed');
console.log('6. Run: npm run dev');
