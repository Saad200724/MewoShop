import { useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Package, Calendar, MapPin, Phone, ShoppingBag } from "lucide-react";
import { format } from "date-fns";
import type { Order } from "@shared/schema";

export default function Orders() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
    enabled: isAuthenticated,
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, authLoading, toast]);

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, label: "Pending" },
      confirmed: { variant: "default" as const, label: "Confirmed" },
      shipped: { variant: "outline" as const, label: "Shipped" },
      delivered: { variant: "default" as const, label: "Delivered" },
      cancelled: { variant: "destructive" as const, label: "Cancelled" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <Badge variant={config.variant} className={status === 'delivered' ? 'bg-green-500 text-white' : ''}>
        {config.label}
      </Badge>
    );
  };

  const getStatusSteps = (status: string) => {
    const steps = [
      { key: 'pending', label: 'Order Placed' },
      { key: 'confirmed', label: 'Confirmed' },
      { key: 'shipped', label: 'Shipped' },
      { key: 'delivered', label: 'Delivered' }
    ];

    const currentIndex = steps.findIndex(step => step.key === status);
    
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex && status !== 'cancelled',
      active: index === currentIndex && status !== 'cancelled'
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="h-6 w-20" />
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center text-lg">
                        <Package className="w-5 h-5 mr-2" />
                        Order #{order.id}
                      </CardTitle>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {order.createdAt ? format(new Date(order.createdAt), 'PPP') : 'No date'}
                      </div>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(order.status || 'pending')}
                      <p className="text-lg font-bold text-brand-green mt-1">
                        ৳{parseFloat(order.totalAmount).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Order Status Steps */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between">
                      {getStatusSteps(order.status || 'pending').map((step, index) => (
                        <div key={step.key} className="flex flex-col items-center flex-1">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            step.completed 
                              ? 'bg-brand-green text-white' 
                              : step.active 
                                ? 'bg-brand-yellow text-brand-green' 
                                : 'bg-gray-200 text-gray-500'
                          }`}>
                            {index + 1}
                          </div>
                          <span className={`text-xs mt-1 text-center ${
                            step.completed || step.active ? 'text-gray-800' : 'text-gray-500'
                          }`}>
                            {step.label}
                          </span>
                          {index < getStatusSteps(order.status || 'pending').length - 1 && (
                            <div className={`absolute h-0.5 w-full top-4 left-1/2 transform -translate-x-1/2 ${
                              step.completed ? 'bg-brand-green' : 'bg-gray-200'
                            }`} style={{ zIndex: -1 }} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    {order.shippingAddress && (
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 mt-0.5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-700">Shipping Address</p>
                          <p className="text-gray-600">{order.shippingAddress}</p>
                        </div>
                      </div>
                    )}
                    {order.phoneNumber && (
                      <div className="flex items-start space-x-2">
                        <Phone className="w-4 h-4 mt-0.5 text-gray-500" />
                        <div>
                          <p className="font-medium text-gray-700">Phone Number</p>
                          <p className="text-gray-600">{order.phoneNumber}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {order.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-1">Order Notes</p>
                      <p className="text-sm text-gray-600">{order.notes}</p>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <Link href={`/orders/${order.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                    {order.status === 'delivered' && (
                      <Button size="sm" className="bg-brand-yellow hover:bg-yellow-400 text-brand-green">
                        Reorder
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-8">You haven't placed any orders yet. Start shopping to see your orders here.</p>
            <Link href="/shop">
              <Button className="bg-brand-green text-white hover:bg-green-800 font-semibold px-8 py-3">
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
