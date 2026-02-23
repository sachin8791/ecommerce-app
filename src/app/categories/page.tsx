'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Grid, List } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      } else {
        // Fallback categories if API fails
        setCategories([
          {
            id: '1',
            name: 'Electronics',
            slug: 'electronics',
            description: 'Latest gadgets and electronics',
            image: '/images/electronics.jpg',
            productCount: 156
          },
          {
            id: '2',
            name: 'Clothing',
            slug: 'clothing',
            description: 'Fashion and apparel for all ages',
            image: '/images/clothing.jpg',
            productCount: 243
          },
          {
            id: '3',
            name: 'Home & Garden',
            slug: 'home-garden',
            description: 'Everything for your home and garden',
            image: '/images/home.jpg',
            productCount: 89
          },
          {
            id: '4',
            name: 'Sports & Outdoors',
            slug: 'sports-outdoors',
            description: 'Sports equipment and outdoor gear',
            image: '/images/sports.jpg',
            productCount: 127
          },
          {
            id: '5',
            name: 'Books & Media',
            slug: 'books-media',
            description: 'Books, movies, and digital content',
            image: '/images/books.jpg',
            productCount: 198
          },
          {
            id: '6',
            name: 'Toys & Games',
            slug: 'toys-games',
            description: 'Toys and games for all ages',
            image: '/images/toys.jpg',
            productCount: 76
          }
        ]);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      // Set fallback categories on error
      setCategories([
        {
          id: '1',
          name: 'Electronics',
          slug: 'electronics',
          description: 'Latest gadgets and electronics',
          image: '/images/electronics.jpg',
          productCount: 156
        },
        {
          id: '2',
          name: 'Clothing',
          slug: 'clothing',
          description: 'Fashion and apparel for all ages',
          image: '/images/clothing.jpg',
          productCount: 243
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Categories</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg"></div>
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Categories</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {filteredCategories.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">No categories found matching your search.</p>
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.slug}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <Badge className="absolute top-4 right-4">
                    {category.productCount} products
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCategories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.slug}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24 overflow-hidden rounded-lg flex-shrink-0">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{category.description}</p>
                      <Badge variant="secondary">
                        {category.productCount} products
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
