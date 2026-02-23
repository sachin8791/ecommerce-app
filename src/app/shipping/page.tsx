'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Truck, Package, Shield } from 'lucide-react';
import Link from 'next/link';

export default function ShippingPage() {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');

  const shippingMethods = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: '5-7 business days',
      price: 0,
      icon: Package,
      estimated: 'Mon, Dec 25 - Wed, Dec 27'
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: '2-3 business days',
      price: 15.99,
      icon: Truck,
      estimated: 'Thu, Dec 21 - Fri, Dec 22'
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      description: 'Next business day',
      price: 29.99,
      icon: Shield,
      estimated: 'Wed, Dec 20'
    }
  ];

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber) {
      window.open(`/track-order?number=${trackingNumber}`, '_blank');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shipping & Delivery</h1>

      {/* Track Order Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Track Your Order</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleTrackOrder} className="flex gap-4">
            <Input
              type="text"
              placeholder="Enter tracking number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Track Order</Button>
          </form>
        </CardContent>
      </Card>

      {/* Shipping Methods */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Shipping Methods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {shippingMethods.map((method) => {
            const Icon = method.icon;
            return (
              <div
                key={method.id}
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="flex items-start gap-4">
                  <Icon className="h-6 w-6 text-gray-600 mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{method.name}</h3>
                      <div className="text-right">
                        <p className="font-semibold">
                          {method.price === 0 ? 'Free' : `$${method.price.toFixed(2)}`}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {method.description}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Estimated delivery: {method.estimated}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Shipping Information */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Domestic Shipping</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Processing Time</h4>
              <p className="text-sm text-gray-600">
                Orders are typically processed within 1-2 business days.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Delivery Areas</h4>
              <p className="text-sm text-gray-600">
                We ship to all addresses within the United States.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Free Shipping</h4>
              <p className="text-sm text-gray-600">
                Free standard shipping on orders over $50.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>International Shipping</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Available Countries</h4>
              <p className="text-sm text-gray-600">
                We ship to over 50 countries worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Customs & Duties</h4>
              <p className="text-sm text-gray-600">
                International orders may be subject to customs fees.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Delivery Time</h4>
              <p className="text-sm text-gray-600">
                7-21 business days depending on destination.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Return Policy */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Return Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">30-Day Returns</h4>
            <p className="text-sm text-gray-600">
              We accept returns within 30 days of delivery.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Conditions</h4>
            <p className="text-sm text-gray-600">
              Items must be unused, in original packaging, and in resalable condition.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Refund Process</h4>
            <p className="text-sm text-gray-600">
              Refunds are processed within 5-7 business days after we receive the returned item.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Have questions about shipping or need to track an order? Our customer service team is here to help.
          </p>
          <div className="flex gap-4">
            <Link href="/contact">
              <Button>Contact Support</Button>
            </Link>
            <Link href="/faq">
              <Button variant="outline">View FAQ</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
