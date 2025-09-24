'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '@/lib/mock-data';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
  isFavorite?: boolean;
  className?: string;
}

export function ProductCard({
  product,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
  className = ''
}: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.(product);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card className={`group hover:shadow-lg transition-all duration-200 cursor-pointer ${className}`}>
        <CardContent className="p-0">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden rounded-t-lg">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />

            {/* Favorite Button */}
            <Button
              size="sm"
              variant="ghost"
              className={`absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white ${
                isFavorite ? 'text-red-500' : 'text-gray-600'
              }`}
              onClick={handleToggleFavorite}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>

            {/* Featured Badge */}
            {product.featured && (
              <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>
            )}

            {/* Out of Stock Overlay */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="destructive">Out of Stock</Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Category */}
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              {product.category.replace('-', ' ')}
            </p>

            {/* Title */}
            <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-muted-foreground ml-1">
                  {product.rating} ({product.reviewCount})
                </span>
              </div>
            </div>

            {/* Seller */}
            <p className="text-xs text-muted-foreground mb-3">
              by {product.seller.name}
              {product.seller.verified && (
                <Badge variant="secondary" className="ml-1 text-xs h-4">✓</Badge>
              )}
            </p>

            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg">{formatPrice(product.price)}</span>

              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="h-8 px-3"
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}