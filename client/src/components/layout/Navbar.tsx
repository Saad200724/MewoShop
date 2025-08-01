import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  Menu, 
  User, 
  LogOut,
  Phone,
  MapPin
} from "lucide-react";
import logoUrl from "@assets/logo_1754019999406.png";
import type { CartItem, Product, Wishlist } from "@shared/schema";

export function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const [location, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Get cart items count
  const { data: cartItems = [] } = useQuery<(CartItem & { product: Product })[]>({
    queryKey: ["/api/cart"],
    enabled: isAuthenticated,
  });

  // Get wishlist items count
  const { data: wishlistItems = [] } = useQuery<(Wishlist & { product: Product })[]>({
    queryKey: ["/api/wishlist"],
    enabled: isAuthenticated,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-brand-green text-white text-sm py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              01408076089
            </span>
            <span className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Our Location
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span>Follow Us:</span>
            <div className="flex space-x-2">
              <a href="#" className="hover:text-brand-yellow transition-colors">Facebook</a>
              <a href="#" className="hover:text-brand-yellow transition-colors">Instagram</a>
              <a href="#" className="hover:text-brand-yellow transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <img src={logoUrl} alt="Meow Meow Pet Shop" className="w-12 h-12" />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-brand-green">Meow Meow</h1>
                <p className="text-xs text-gray-600">PET SHOP</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`text-gray-700 hover:text-brand-green font-medium transition-colors ${
                    location === item.href ? "text-brand-green" : ""
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search for pet products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-2 border-2 border-gray-200 rounded-full focus:border-brand-yellow"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-brand-yellow hover:bg-yellow-400 text-brand-green rounded-full"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </form>
            </div>

            {/* Cart & Auth */}
            <div className="flex items-center space-x-4">
              {isAuthenticated && (
                <>
                  <Link href="/wishlist" className="relative p-2 text-gray-700 hover:text-brand-green transition-colors">
                    <Heart className="w-5 h-5" />
                    {wishlistItems.length > 0 && (
                      <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {wishlistItems.length}
                      </Badge>
                    )}
                  </Link>
                  <Link href="/cart" className="relative p-2 text-gray-700 hover:text-brand-green transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                    {cartItems.length > 0 && (
                      <Badge className="absolute -top-1 -right-1 bg-brand-green text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                        {cartItems.length}
                      </Badge>
                    )}
                  </Link>
                </>
              )}

              {isAuthenticated ? (
                <div className="hidden sm:flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center space-x-2"
                    onClick={() => window.location.href = "/profile"}
                  >
                    <User className="w-4 h-4" />
                    <span>{user?.firstName || "Profile"}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.location.href = "/api/logout"}
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <Button
                  className="hidden sm:block bg-brand-green text-white hover:bg-green-800"
                  onClick={() => window.location.href = "/api/login"}
                >
                  Login
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="lg:hidden">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-4 mt-4">
                    {/* Mobile Search */}
                    <form onSubmit={handleSearch} className="md:hidden">
                      <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full"
                      />
                    </form>

                    {/* Mobile Navigation */}
                    {navigationItems.map((item) => (
                      <Link 
                        key={item.href} 
                        href={item.href}
                        className="text-gray-700 hover:text-brand-green font-medium py-2 block"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}

                    {/* Mobile Auth */}
                    {isAuthenticated ? (
                      <div className="flex flex-col space-y-2 pt-4 border-t">
                        <Button 
                          variant="ghost" 
                          className="justify-start" 
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            window.location.href = "/profile";
                          }}
                        >
                          <User className="w-4 h-4 mr-2" />
                          Profile
                        </Button>
                        <Button
                          variant="outline"
                          className="justify-start"
                          onClick={() => window.location.href = "/api/logout"}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </Button>
                      </div>
                    ) : (
                      <Button
                        className="sm:hidden bg-brand-green text-white hover:bg-green-800 mt-4"
                        onClick={() => window.location.href = "/api/login"}
                      >
                        Login / Register
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
