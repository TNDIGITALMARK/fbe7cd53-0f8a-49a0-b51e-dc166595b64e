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

  // Get category-based color
  const getCategoryColor = (category: string) => {
    const colorMap: { [key: string]: string } = {
      'electronics': 'indigo',
      'fashion': 'pink',
      'beauty': 'rose',
      'sports': 'orange',
      'home-goods': 'emerald',
      'books': 'amber',
      'toys': 'violet',
    };
    return colorMap[category] || 'primary';
  };

  const categoryColor = getCategoryColor(product.category);

  return (
    <Link href={`/products/${product.id}`}>
      <Card className={`group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-${categoryColor} ${className}`}>
        <CardContent className="p-0">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden rounded-t-lg">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />

            {/* Color Overlay Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-t from-${categoryColor}/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            {/* Favorite Button */}
            <Button
              size="sm"
              variant="ghost"
              className={`absolute top-3 right-3 h-9 w-9 rounded-full backdrop-blur-md transition-all duration-200 ${
                isFavorite
                  ? 'bg-rose/20 text-rose border border-rose/30 shadow-lg shadow-rose/25'
                  : 'bg-white/80 hover:bg-white text-gray-600 hover:text-rose shadow-lg'
              }`}
              onClick={handleToggleFavorite}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>

            {/* Featured Badge */}
            {product.featured && (
              <Badge className={`absolute top-3 left-3 bg-gradient-primary text-white border-0 shadow-lg backdrop-blur-sm font-medium px-3`}>
                ✨ Featured
              </Badge>
            )}

            {/* Out of Stock Overlay */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                <Badge variant="destructive" className="shadow-lg">Out of Stock</Badge>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 bg-gradient-to-b from-transparent to-gray-50/50">
            {/* Category */}
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${categoryColor}/10 text-${categoryColor} border border-${categoryColor}/20`}>
                {product.category.replace('-', ' ')}
              </span>
            </div>

            {/* Title */}
            <h3 className={`font-semibold text-sm mb-2 line-clamp-2 group-hover:text-${categoryColor} transition-colors duration-200`}>
              {product.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <div className="flex items-center bg-amber/10 rounded-full px-2 py-1">
                <Star className="h-3 w-3 fill-amber text-amber" />
                <span className="text-xs font-medium text-amber-700 ml-1">
                  {product.rating}
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  ({product.reviewCount})
                </span>
              </div>
            </div>

            {/* Seller */}
            <div className="flex items-center gap-2 mb-3">
              <p className="text-xs text-muted-foreground">
                by {product.seller.name}
              </p>
              {product.seller.verified && (
                <Badge className={`bg-emerald/10 text-emerald border border-emerald/20 text-xs h-5 px-2`}>
                  ✓ Verified
                </Badge>
              )}
            </div>

            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between">
              <span className={`font-bold text-lg text-${categoryColor}`}>
                {formatPrice(product.price)}
              </span>

              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`h-9 px-4 bg-${categoryColor} hover:bg-${categoryColor}/90 text-white shadow-lg hover:shadow-${categoryColor}/25 transition-all duration-200`}
              >
                <ShoppingCart className="h-3 w-3 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}