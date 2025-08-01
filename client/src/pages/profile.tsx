import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  User, 
  Package, 
  Heart, 
  Settings, 
  Calendar,
  Mail,
  Phone,
  MapPin,
  LogOut,
  Shield
} from "lucide-react";
import { format } from "date-fns";
import type { Order, Wishlist, Product } from "@shared/schema";

export default function Profile() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const { data: orders = [], isLoading: ordersLoading } = useQuery<Order[]>({
    queryKey: ["/api/orders"],
    enabled: isAuthenticated,
  });

  const { data: wishlist = [], isLoading: wishlistLoading } = useQuery<(Wishlist & { product: Product })[]>({
    queryKey: ["/api/wishlist"],
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

  const recentOrders = orders.slice(0, 3);
  const recentWishlist = wishlist.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account and view your activity</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={user?.profileImageUrl || undefined} />
                    <AvatarFallback className="bg-brand-yellow text-brand-green text-xl font-semibold">
                      {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-gray-800">
                    {user?.firstName && user?.lastName 
                      ? `${user.firstName} ${user.lastName}`
                      : user?.email?.split('@')[0] || 'User'
                    }
                  </h3>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                  {user?.isAdmin && (
                    <Badge className="mt-2 bg-brand-green text-white">
                      <Shield className="w-3 h-3 mr-1" />
                      Admin
                    </Badge>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Joined {format(new Date(user?.createdAt || new Date()), 'MMM yyyy')}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Package className="w-4 h-4 mr-2" />
                    {orders.length} Total Orders
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Heart className="w-4 h-4 mr-2" />
                    {wishlist.length} Wishlist Items
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  {user?.isAdmin && (
                    <Link href="/admin">
                      <Button variant="outline" className="w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        Admin Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="outline"
                    className="w-full justify-start text-red-600 hover:text-red-700"
                    onClick={() => window.location.href = "/api/logout"}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview">
                <div className="space-y-6">
                  {/* Account Information */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        Account Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-4 h-4 text-gray-500" />
                          <div>
                            <p className="font-medium text-gray-700">Email</p>
                            <p className="text-gray-600">{user?.email || 'Not provided'}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <User className="w-4 h-4 text-gray-500" />
                          <div>
                            <p className="font-medium text-gray-700">Name</p>
                            <p className="text-gray-600">
                              {user?.firstName && user?.lastName 
                                ? `${user.firstName} ${user.lastName}`
                                : 'Not provided'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Orders */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center">
                          <Package className="w-5 h-5 mr-2" />
                          Recent Orders
                        </span>
                        <Link href="/orders">
                          <Button variant="outline" size="sm">View All</Button>
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {ordersLoading ? (
                        <div className="space-y-3">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                              <div className="space-y-1">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-32" />
                              </div>
                              <Skeleton className="h-6 w-16" />
                            </div>
                          ))}
                        </div>
                      ) : recentOrders.length > 0 ? (
                        <div className="space-y-3">
                          {recentOrders.map((order) => (
                            <div key={order.id} className="flex justify-between items-center p-3 border rounded-lg">
                              <div>
                                <p className="font-medium">Order #{order.id}</p>
                                <p className="text-sm text-gray-600">
                                  {order.createdAt ? format(new Date(order.createdAt), 'PPP') : 'No date'}
                                </p>
                                <p className="text-sm font-medium text-brand-green">
                                  ৳{parseFloat(order.totalAmount).toLocaleString()}
                                </p>
                              </div>
                              {getStatusBadge(order.status || 'pending')}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-4">No orders yet</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>Order History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {ordersLoading ? (
                      <div className="space-y-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className="flex justify-between items-center p-4 border rounded-lg">
                            <div className="space-y-2">
                              <Skeleton className="h-4 w-32" />
                              <Skeleton className="h-3 w-24" />
                              <Skeleton className="h-4 w-20" />
                            </div>
                            <Skeleton className="h-6 w-20" />
                          </div>
                        ))}
                      </div>
                    ) : orders.length > 0 ? (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div key={order.id} className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div>
                              <Link href={`/orders/${order.id}`}>
                                <h4 className="font-medium hover:text-brand-green transition-colors">
                                  Order #{order.id}
                                </h4>
                              </Link>
                              <p className="text-sm text-gray-600">
                                {order.createdAt ? format(new Date(order.createdAt), 'PPP') : 'No date'}
                              </p>
                              <p className="text-sm font-medium text-brand-green">
                                ৳{parseFloat(order.totalAmount).toLocaleString()}
                              </p>
                            </div>
                            <div className="text-right">
                              {getStatusBadge(order.status || 'pending')}
                              <Link href={`/orders/${order.id}`}>
                                <Button variant="outline" size="sm" className="mt-2">
                                  View Details
                                </Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No orders found</p>
                        <Link href="/shop">
                          <Button className="mt-4 bg-brand-green text-white hover:bg-green-800">
                            Start Shopping
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist">
                <Card>
                  <CardHeader>
                    <CardTitle>My Wishlist</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {wishlistLoading ? (
                      <div className="grid md:grid-cols-2 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
                            <Skeleton className="w-16 h-16 rounded" />
                            <div className="flex-1 space-y-2">
                              <Skeleton className="h-4 w-3/4" />
                              <Skeleton className="h-3 w-1/2" />
                              <Skeleton className="h-4 w-1/3" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : wishlist.length > 0 ? (
                      <div className="grid md:grid-cols-2 gap-4">
                        {wishlist.map((item) => (
                          <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                            <Link href={`/product/${item.product.id}`}>
                              <img
                                src={item.product.imageUrl || "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=100&h=100&fit=crop"}
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded cursor-pointer"
                              />
                            </Link>
                            <div className="flex-1">
                              <Link href={`/product/${item.product.id}`}>
                                <h4 className="font-medium hover:text-brand-green transition-colors cursor-pointer">
                                  {item.product.name}
                                </h4>
                              </Link>
                              <p className="text-sm text-gray-600 line-clamp-1">{item.product.description}</p>
                              <p className="text-sm font-medium text-brand-green">
                                ৳{parseFloat(item.product.price).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Your wishlist is empty</p>
                        <Link href="/shop">
                          <Button className="mt-4 bg-brand-green text-white hover:bg-green-800">
                            Browse Products
                          </Button>
                        </Link>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
