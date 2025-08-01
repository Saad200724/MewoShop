import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Trash2, Plus, Minus } from "lucide-react";
import type { CartItem, Product } from "@shared/schema";

interface CartItemProps {
  item: CartItem & { product: Product };
}

export function CartItem({ item }: CartItemProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateQuantityMutation = useMutation({
    mutationFn: async (quantity: number) => {
      await apiRequest("PUT", `/api/cart/${item.id}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update quantity. Please try again.",
        variant: "destructive",
      });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", `/api/cart/${item.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Item removed",
        description: `${item.product.name} has been removed from your cart.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 99) {
      updateQuantityMutation.mutate(newQuantity);
    }
  };

  const totalPrice = parseFloat(item.product.price) * item.quantity;

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border">
      <img
        src={item.product.imageUrl || "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=100&h=100&fit=crop"}
        alt={item.product.name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-1">{item.product.description}</p>
        <p className="text-brand-green font-bold">৳{parseFloat(item.product.price).toLocaleString()}</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1 || updateQuantityMutation.isPending}
          className="w-8 h-8 p-0"
        >
          <Minus className="w-4 h-4" />
        </Button>
        
        <Input
          type="number"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
          min="1"
          max="99"
          className="w-16 text-center"
          disabled={updateQuantityMutation.isPending}
        />
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(item.quantity + 1)}
          disabled={item.quantity >= 99 || updateQuantityMutation.isPending}
          className="w-8 h-8 p-0"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="text-right">
        <p className="font-bold text-gray-800">৳{totalPrice.toLocaleString()}</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => removeItemMutation.mutate()}
          disabled={removeItemMutation.isPending}
          className="text-red-500 hover:text-red-700 p-1"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
