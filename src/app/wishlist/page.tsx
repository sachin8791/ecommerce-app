'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, ShoppingCart } from 'lucide-react';
import { useWishlistStore, useCartStore } from '@/lib/store';
import Link from 'next/link';
import Image from 'next/image';

export default function WishlistPage() {
  const { items, removeItem, isInWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      title: item.title,
      price: item.price,
      discountPrice: item.discountPrice,
      image: item.image,
      stock: 10, // Default stock
    });
  };

  const handleRemoveFromWishlist = (id: string) => {
    removeItem(id);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        <Card>
          <CardContent className="p-8 text-center">
            <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-500 mb-4">Your wishlist is empty</p>
            <Link href="/products">
              <Button>Browse Products</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveFromWishlist(item.id)}
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                >
                  <Heart className="h-4 w-4 text-red-500 fill-current" />
                </Button>
              </div>
              
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
                {item.discountPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${item.discountPrice.toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => handleAddToCart(item)}
                  className="flex-1"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
