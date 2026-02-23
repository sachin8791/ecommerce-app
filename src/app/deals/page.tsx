'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Clock, Tag, TrendingUp, Star, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Deal {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  discountPercentage: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  expiresIn: string;
  stock: number;
}

export default function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('discount');

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    try {
      // Mock deals data
      setDeals([
        {
          id: '1',
          title: 'Wireless Noise-Canceling Headphones',
          description: 'Premium sound quality with active noise cancellation',
          originalPrice: 299.99,
          discountPrice: 179.99,
          discountPercentage: 40,
          image: '/images/headphones.jpg',
          category: 'Electronics',
          rating: 4.5,
          reviewCount: 234,
          expiresIn: '2 days',
          stock: 15
        },
        {
          id: '2',
          title: 'Smart Fitness Watch',
          description: 'Track your health and fitness goals',
          originalPrice: 199.99,
          discountPrice: 119.99,
          discountPercentage: 40,
          image: '/images/watch.jpg',
          category: 'Electronics',
          rating: 4.3,
          reviewCount: 156,
          expiresIn: '5 hours',
          stock: 8
        },
        {
          id: '3',
          title: 'Organic Cotton T-Shirt Pack',
          description: 'Comfortable and sustainable fashion',
          originalPrice: 49.99,
          discountPrice: 29.99,
          discountPercentage: 40,
          image: '/images/tshirt.jpg',
          category: 'Clothing',
          rating: 4.7,
          reviewCount: 89,
          expiresIn: '1 day',
          stock: 25
        },
        {
          id: '4',
          title: 'Professional Yoga Mat',
          description: 'Non-slip surface for perfect poses',
          originalPrice: 79.99,
          discountPrice: 39.99,
          discountPercentage: 50,
          image: '/images/yoga-mat.jpg',
          category: 'Sports',
          rating: 4.6,
          reviewCount: 201,
          expiresIn: '3 days',
          stock: 12
        },
        {
          id: '5',
          title: 'Stainless Steel Water Bottle',
          description: 'Keep drinks cold for 24 hours',
          originalPrice: 34.99,
          discountPrice: 17.49,
          discountPercentage: 50,
          image: '/images/bottle.jpg',
          category: 'Sports',
          rating: 4.4,
          reviewCount: 178,
          expiresIn: '6 hours',
          stock: 30
        },
        {
          id: '6',
          title: 'Bluetooth Portable Speaker',
          description: 'Powerful sound in a compact design',
          originalPrice: 89.99,
          discountPrice: 44.99,
          discountPercentage: 50,
          image: '/images/speaker.jpg',
          category: 'Electronics',
          rating: 4.2,
          reviewCount: 92,
          expiresIn: '12 hours',
          stock: 5
        }
      ]);
    } catch (error) {
      console.error('Failed to fetch deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAndSortedDeals = deals
    .filter(deal => {
      const matchesSearch = deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           deal.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || deal.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'discount':
          return b.discountPercentage - a.discountPercentage;
        case 'price-low':
          return a.discountPrice - b.discountPrice;
        case 'price-high':
          return b.discountPrice - a.discountPrice;
        case 'rating':
          return b.rating - a.rating;
        case 'ending-soon':
          return parseInt(a.expiresIn) - parseInt(b.expiresIn);
        default:
          return 0;
      }
    });

  const categories = ['all', ...Array.from(new Set(deals.map(deal => deal.category)))];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Tag className="h-8 w-8 text-red-500" />
          <h1 className="text-4xl font-bold">Hot Deals</h1>
        </div>
        <p className="text-lg text-gray-600 mb-2">Limited time offers on top products</p>
        <Badge className="bg-red-500 text-white px-4 py-2">
          <Clock className="h-4 w-4 mr-2" />
          Flash Sale Active
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="discount">Biggest Discount</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="ending-soon">Ending Soon</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Deals Grid */}
      {filteredAndSortedDeals.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Tag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No deals found matching your criteria.</p>
            <Button variant="outline" onClick={() => {
              setSearchQuery('');
              setCategoryFilter('all');
              setSortBy('discount');
            }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedDeals.map((deal) => (
            <Card key={deal.id} className="group hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-red-500 text-white">
                    {deal.discountPercentage}% OFF
                  </Badge>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="outline" className="bg-white/90">
                    <Clock className="h-3 w-3 mr-1" />
                    {deal.expiresIn}
                  </Badge>
                </div>
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {deal.category}
                  </Badge>
                </div>
                
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {deal.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {deal.description}
                </p>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">{deal.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({deal.reviewCount} reviews)</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-600">
                        ${deal.discountPrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${deal.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      Save ${(deal.originalPrice - deal.discountPrice).toFixed(2)}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Stock</p>
                    <p className={`text-sm font-medium ${deal.stock < 10 ? 'text-red-500' : 'text-green-600'}`}>
                      {deal.stock} left
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Link href={`/products/${deal.id}`} className="flex-1">
                    <Button className="w-full">
                      View Deal
                    </Button>
                  </Link>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Newsletter Section */}
      <Card className="mt-12 bg-gradient-to-r from-red-50 to-orange-50">
        <CardContent className="p-8 text-center">
          <TrendingUp className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Never Miss a Deal</h2>
          <p className="text-gray-600 mb-6">
            Subscribe to our newsletter and get exclusive deals delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
            />
            <Button className="bg-red-500 hover:bg-red-600">
              Subscribe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
