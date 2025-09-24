'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, Shield, Truck, RotateCcw, ShoppingCart, Plus, Minus } from 'lucide-react';
import { NavigationBar } from '@/components/marketplace/navigation-bar';
import { ReviewComponent } from '@/components/marketplace/review-component';
import { ProductCard } from '@/components/marketplace/product-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { products, reviews, Product } from '@/lib/mock-data';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  const product = products.find(p => p.id === productId);
  const productReviews = reviews.filter(r => r.productId === productId);
  const relatedProducts = products.filter(p =>
    p.id !== productId &&
    (p.category === product?.category || p.seller.id === product?.seller.id)
  ).slice(0, 4);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <NavigationBar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const renderStars = (rating: number, size = 'w-4 h-4') => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`${size} ${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'fill-gray-200 text-gray-200'
        }`}
      />
    ));
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.title} to cart`);
    // In real implementation, this would update cart state/context
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-blue-600 hover:underline">Home</Link></li>
            <li className="text-gray-500">/</li>
            <li><Link href={`/categories/${product.category}`} className="text-blue-600 hover:underline capitalize">{product.category.replace('-', ' ')}</Link></li>
            <li className="text-gray-500">/</li>
            <li className="text-gray-900">{product.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <Image
                src={product.images[selectedImageIndex]}
                alt={product.title}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>

            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                {product.category.replace('-', ' ')}
              </p>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                  <span className="text-sm text-muted-foreground ml-1">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
                {product.featured && (
                  <Badge className="bg-primary">Featured</Badge>
                )}
              </div>

              <div className="text-3xl font-bold text-gray-900 mb-6">
                {formatPrice(product.price)}
              </div>
            </div>

            {/* Seller Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={product.seller.avatar} />
                    <AvatarFallback>{product.seller.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{product.seller.name}</h3>
                      {product.seller.verified && (
                        <Badge variant="secondary">✓ Verified</Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      {renderStars(product.seller.rating, 'w-3 h-3')}
                      <span className="text-xs text-muted-foreground">
                        {product.seller.rating} ({product.seller.reviewCount})
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium">Quantity:</label>
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 text-center w-16">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center text-center">
                <Shield className="h-6 w-6 text-green-600 mb-2" />
                <span className="text-xs">Secure Payment</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Truck className="h-6 w-6 text-blue-600 mb-2" />
                <span className="text-xs">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="h-6 w-6 text-orange-600 mb-2" />
                <span className="text-xs">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({productReviews.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <span className="font-medium text-gray-900">{key}</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Customer Reviews</span>
                  <div className="flex items-center space-x-2">
                    {renderStars(product.rating)}
                    <span className="text-sm text-muted-foreground">
                      {product.rating} out of 5
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {productReviews.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No reviews yet. Be the first to review!</p>
                ) : (
                  productReviews.map((review) => (
                    <ReviewComponent
                      key={review.id}
                      review={review}
                      onHelpful={(reviewId) => console.log('Helpful:', reviewId)}
                    />
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  onAddToCart={(product) => console.log('Add to cart:', product.title)}
                  onToggleFavorite={(product) => console.log('Toggle favorite:', product.title)}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}