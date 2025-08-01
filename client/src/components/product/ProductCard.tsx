import { useState } from "react";
import { Link } from "wouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Heart, ShoppingCart } from "lucide-react";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const addToCartMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/cart", {
        productId: product.id,
        quantity: 1,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      setIsAddingToCart(true);
      toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your cart.`,
      });
      setTimeout(() => setIsAddingToCart(false), 2000);
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Please log in",
          description: "You need to log in to add items to your cart.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 1000);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    },
  });

  const addToWishlistMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/wishlist", {
        productId: product.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/wishlist"] });
      toast({
        title: "Added to wishlist!",
        description: `${product.name} has been added to your wishlist.`,
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Please log in",
          description: "You need to log in to add items to your wishlist.",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 1000);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to add item to wishlist. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getBadgeVariant = (isFeatured: boolean) => {
    if (isFeatured) return "default";
    return "secondary";
  };

  const getBadgeText = (product: Product) => {
    if (product.isFeatured) return "Featured";
    if (product.originalPrice && parseFloat(product.originalPrice) > parseFloat(product.price)) {
      return "Sale";
    }
    return "New";
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <Link href={`/product/${product.id}`}>
        <div className="relative">
          <img
            src={product.imageUrl || "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=300&fit=crop"}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <Badge variant={getBadgeVariant(product.isFeatured || false)} className="bg-brand-green text-white">
              {getBadgeText(product)}
            </Badge>
          </div>
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-gray-800 hover:text-brand-green transition-colors cursor-pointer">
              {product.name}
            </h3>
          </Link>
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => addToWishlistMutation.mutate()}
              disabled={addToWishlistMutation.isPending}
              className="text-gray-400 hover:text-red-500 p-1"
            >
              <Heart className="w-4 h-4" />
            </Button>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-brand-green">
              ৳{parseFloat(product.price).toLocaleString()}
            </span>
            {product.originalPrice && parseFloat(product.originalPrice) > parseFloat(product.price) && (
              <span className="text-sm text-gray-500 line-through">
                ৳{parseFloat(product.originalPrice).toLocaleString()}
              </span>
            )}
          </div>
          
          {isAuthenticated ? (
            <Button
              onClick={() => addToCartMutation.mutate()}
              disabled={addToCartMutation.isPending || isAddingToCart}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                isAddingToCart
                  ? "bg-green-500 text-white"
                  : "bg-brand-yellow hover:bg-yellow-400 text-brand-green"
              }`}
            >
              {isAddingToCart ? (
                <>
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Added!
                </>
              ) : (
                "Add to Cart"
              )}
            </Button>
          ) : (
            <Button
              onClick={() => window.location.href = "/api/login"}
              className="bg-brand-yellow hover:bg-yellow-400 text-brand-green px-4 py-2 rounded-full font-semibold transition-colors"
            >
              Login to Buy
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
