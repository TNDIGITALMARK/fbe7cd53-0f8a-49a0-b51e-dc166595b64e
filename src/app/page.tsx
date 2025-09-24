'use client';

import { useState } from 'react';
import { NavigationBar } from '@/components/marketplace/navigation-bar';
import { CategoryPill } from '@/components/marketplace/category-pill';
import { ProductCard } from '@/components/marketplace/product-card';
import { Button } from '@/components/ui/button';
import { categories, products, Product } from '@/lib/mock-data';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setFilteredProducts(filtered);
    }
  };

  const handleAddToCart = (product: Product) => {
    console.log('Add to cart:', product.title);
    // In real implementation, this would update cart state/context
  };

  const handleToggleFavorite = (product: Product) => {
    console.log('Toggle favorite:', product.title);
    // In real implementation, this would update favorites state
  };

  const featuredCategories = categories.filter(cat => cat.featured);
  const featuredProducts = products.filter(product => product.featured);

  return (
    <div className="min-h-screen">
      <NavigationBar onSearch={handleSearch} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-violet/5 via-transparent to-emerald/5 rounded-3xl -z-10"></div>
          <div className="py-12 px-8">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-violet via-primary to-emerald bg-clip-text text-transparent mb-6 leading-tight">
              Your Universal Marketplace
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover amazing products from verified sellers around the world
            </p>
            <Button size="lg" className="rounded-full px-10 py-6 text-lg bg-gradient-sunset hover:bg-gradient-cool shadow-xl hover:shadow-2xl transition-all duration-300 font-semibold">
              ✨ Start Selling
            </Button>
          </div>
        </div>

        {/* Categories Grid */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
              Shop by Category
            </h2>
            <p className="text-gray-600">Find exactly what you're looking for</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-8">
            {featuredCategories.map((category) => (
              <CategoryPill key={category.id} category={category} />
            ))}
          </div>
          <div className="text-center">
            <Button variant="outline" size="sm" className="rounded-full px-6 border-violet/30 text-violet hover:bg-violet/10 hover:border-violet transition-colors duration-200">
              View All Categories
            </Button>
          </div>
        </section>

        {/* Search Results or Featured Products */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Products'}
              </h2>
              <p className="text-gray-600">
                {searchQuery ? 'Products matching your search' : 'Handpicked items from top sellers'}
              </p>
            </div>
            {!searchQuery && (
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/10 transition-colors duration-200">
                View All →
              </Button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No products found matching your search.</p>
              <Button onClick={() => handleSearch('')} variant="outline">
                View All Products
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {(searchQuery ? filteredProducts : featuredProducts).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </section>

        {/* Additional Categories */}
        {!searchQuery && (
          <section className="mt-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                More Categories
              </h2>
              <p className="text-gray-600">Explore even more product categories</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.filter(cat => !cat.featured).map((category) => (
                <CategoryPill key={category.id} category={category} className="md:col-span-1" />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}