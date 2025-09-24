'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cartItems } from '@/lib/mock-data';

interface NavigationBarProps {
  onSearch?: (query: string) => void;
}

export function NavigationBar({ onSearch }: NavigationBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-violet/25 transition-all duration-200">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-violet bg-clip-text text-transparent">
              UNIVERSAL
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <Input
                type="text"
                placeholder="Search for anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-5 pr-14 h-12 rounded-full border-gray-200 bg-gray-50/50 focus:bg-white focus:border-violet focus:ring-violet/20 shadow-inner transition-all duration-200"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1.5 top-1.5 h-9 px-4 rounded-full bg-gradient-primary hover:bg-gradient-cool shadow-lg hover:shadow-violet/25 transition-all duration-200"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" className="text-gray-700 hover:text-primary hover:bg-primary/10 transition-colors duration-200" asChild>
              <Link href="/seller-dashboard">Sell</Link>
            </Button>

            <Button variant="ghost" size="sm" className="relative p-3 text-gray-700 hover:text-orange hover:bg-orange/10 transition-colors duration-200" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-sunset text-white shadow-lg border-2 border-white">
                    {cartItemCount}
                  </Badge>
                )}
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/seller-dashboard">Seller Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for anything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 h-10 rounded-full"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1 h-8 px-3 rounded-full"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>

            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/seller-dashboard">Sell</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/cart" className="flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Cart ({cartItemCount})
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/profile">My Profile</Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/orders">My Orders</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}