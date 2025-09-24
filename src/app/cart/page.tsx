'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { NavigationBar } from '@/components/marketplace/navigation-bar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cartItems } from '@/lib/mock-data';

export default function CartPage() {
  const [items, setItems] = useState(cartItems);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setItems(items.filter(item => item.id !== itemId));
    } else {
      setItems(items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 75 ? 0 : 9.99;
  const tax = subtotal * 0.08875; // 8.875% tax
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <NavigationBar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-6">Discover amazing products and add them to your cart!</p>
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {items.map((item, index) => (
                    <div key={item.id}>
                      <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.title}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <Link
                            href={`/products/${item.product.id}`}
                            className="font-medium text-gray-900 hover:text-primary transition-colors"
                          >
                            {item.product.title}
                          </Link>
                          <p className="text-sm text-gray-600 mt-1">
                            by {item.product.seller.name}
                          </p>
                          <p className="text-sm font-medium text-gray-900 mt-2">
                            {formatPrice(item.product.price)}
                          </p>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="flex items-center border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="px-4 py-2 text-center w-16">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {index < items.length - 1 && <Separator className="mt-6" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                {subtotal < 75 && (
                  <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                    Add {formatPrice(75 - subtotal)} more for free shipping!
                  </div>
                )}

                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>

                <Button variant="outline" className="w-full" asChild>
                  <Link href="/">Continue Shopping</Link>
                </Button>

                <div className="text-xs text-gray-500 text-center space-y-1">
                  <p>• Secure checkout with 256-bit SSL encryption</p>
                  <p>• 30-day return policy</p>
                  <p>• Free returns on orders over $50</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}