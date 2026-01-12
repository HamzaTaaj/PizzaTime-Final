import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { 
  User, 
  Mail, 
  Phone, 
  LogOut, 
  TrendingUp,
  MapPin,
  Bell,
  Package,
  Loader2,
  CheckCircle
} from 'lucide-react';

// GraphQL query to fetch customer orders and tags
const GET_CUSTOMER_ORDERS = gql`
  query getCustomerOrders($customerAccessToken: String!, $first: Int!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      firstName
      lastName
      phone
      acceptsMarketing
      tags
      orders(first: $first) {
        edges {
          node {
            id
            orderNumber
            processedAt
            totalPrice {
              amount
              currencyCode
            }
            lineItems(first: 10) {
              edges {
                node {
                  title
                  quantity
                }
              }
            }
            shippingAddress {
              city
              province
              address1
            }
          }
        }
      }
    }
  }
`;

export function ClientDashboard() {
  const navigate = useNavigate();
  const { customer, signOut, isLoading: authLoading } = useAuth();
  
  // Get access token from localStorage
  const getAccessToken = () => {
    return localStorage.getItem('pizza_auth_token');
  };

  const accessToken = getAccessToken();
  
  // All hooks must be called before any conditional returns
  const { loading: ordersLoading, data, error: ordersError } = useQuery(GET_CUSTOMER_ORDERS, {
    variables: { 
      customerAccessToken: accessToken || '',
      first: 10 
    },
    skip: !accessToken || !customer || authLoading,
    errorPolicy: 'all',
    fetchPolicy: 'network-only', // Always fetch fresh data
  });

  // If not authenticated, redirect to login - must be before early return
  useEffect(() => {
    if (!authLoading && !customer) {
      navigate('/login');
    }
  }, [authLoading, customer, navigate]);

  // Log error and data for debugging
  useEffect(() => {
    if (ordersError) {
      console.error('Error fetching customer orders:', ordersError);
    }
    if (data) {
      console.log('Customer orders data:', data);
    }
    if (accessToken) {
      console.log('Access token present:', accessToken.substring(0, 10) + '...');
    } else {
      console.log('No access token found');
    }
  }, [ordersError, data, accessToken]);

  const isLoading = authLoading || ordersLoading;

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  // All data processing - moved before early return
  const customerData = (data as any)?.customer;
  
  // Check approval status (wait for data to load)
  useEffect(() => {
    if (!ordersLoading && customerData && customer) {
      const customerTags = customerData?.tags || [];
      
      // Debug: Log tags to see format
      console.log('Customer tags raw:', customerTags);
      
      // Shopify Storefront API returns tags as array of strings
      let tagsArray: string[] = [];
      if (Array.isArray(customerTags)) {
        tagsArray = customerTags;
      } else if (typeof customerTags === 'string') {
        // Handle comma-separated string
        tagsArray = customerTags.split(',').map((t: string) => t.trim());
      }
      
      console.log('Parsed tags array:', tagsArray);
      const isApproved = tagsArray.some((tag: string) => tag.toLowerCase() === 'approved');
      console.log('Is approved?', isApproved);
      
      if (!isApproved) {
        // Redirect to AccountUnderReviewPage
        navigate('/account-under-review', { replace: true });
      }
    }
  }, [ordersLoading, customerData, customer, navigate]);

  // Early return after all hooks
  if (isLoading || !customer) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Show loading if checking approval
  if (!ordersLoading && customerData && customer) {
    const customerTags = customerData?.tags || [];
    
    // Parse tags - Shopify Storefront API returns as array
    let tagsArray: string[] = [];
    if (Array.isArray(customerTags)) {
      tagsArray = customerTags;
    } else if (typeof customerTags === 'string') {
      tagsArray = customerTags.split(',').map((t: string) => t.trim());
    }
    
    const isApproved = tagsArray.some((tag: string) => tag.toLowerCase() === 'approved');
    
    if (!isApproved) {
      return (
        <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      );
    }
  }

  // Format currency
  const formatPrice = (amount: string, currencyCode: string): string => {
    try {
      const price = parseFloat(amount);
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
      }).format(price);
    } catch {
      return amount;
    }
  };

  // Format date
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return '1 day ago';
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
      return `${Math.floor(diffDays / 365)} years ago`;
    } catch {
      return dateString;
    }
  };

  const orders = customerData?.orders?.edges || [];
  
  // Calculate total orders from actual orders count
  const totalOrders = orders.length;
  
  // Calculate total spent from orders
  let totalSpent = '$0.00';
  let currencyCode = 'USD';
  if (orders.length > 0) {
    const calculatedTotal = orders.reduce((sum: number, { node: order }: any) => {
      const orderAmount = order.totalPrice?.amount;
      if (orderAmount) {
        const orderTotal = parseFloat(orderAmount);
        if (!isNaN(orderTotal)) {
          return sum + orderTotal;
        }
      }
      return sum;
    }, 0);
    currencyCode = orders[0]?.node?.totalPrice?.currencyCode || 'USD';
    totalSpent = formatPrice(calculatedTotal.toString(), currencyCode);
  }

  // Calculate total items from orders (accessories/parts)
  const totalItems = orders.reduce((sum: number, { node: order }: any) => {
    const orderItems = order.lineItems?.edges || [];
    const items = orderItems.reduce((itemSum: number, { node: item }: any) => {
      const quantity = item.quantity || 0;
      return itemSum + quantity;
    }, 0);
    return sum + items;
  }, 0);

  // Quick stats data from real Shopify data
  const stats = [
    { 
      label: 'Approved Customer', 
      value: 'Active', 
      icon: CheckCircle, 
      color: 'bg-green-500' 
    },
    { 
      label: 'Total Orders', 
      value: totalOrders.toString(), 
      icon: Package, 
      color: 'bg-blue-500' 
    },
    { 
      label: 'Items Purchased', 
      value: totalItems.toString(), 
      icon: Package, 
      color: 'bg-orange-500' 
    },
    { 
      label: 'Total Spent', 
      value: totalSpent, 
      icon: TrendingUp, 
      color: 'bg-purple-500' 
    },
  ];


  // Quick actions
  const quickActions = [
    { label: 'Find Machines', icon: MapPin, href: '/product', color: 'text-blue-600' },
    { label: 'Shop Now', icon: Package, href: '/shop', color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Welcome back, <span className="text-blue-600">
                  {customerData?.firstName 
                    ? `${customerData.firstName}${customerData.lastName ? ' ' + customerData.lastName : ''}`.trim()
                    : customer?.firstName 
                    ? `${customer.firstName}${customer.lastName ? ' ' + customer.lastName : ''}`.trim()
                    : customer?.email?.split('@')[0] || 'Pizza Lover'}
                </span>! 🍕
              </h1>
              <p className="text-slate-600">Here's what's happening with your Pizza Anytime account</p>
            </div>
            <motion.button
              onClick={handleSignOut}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </motion.button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center mb-3`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-white text-center">
                  {customerData?.firstName 
                    ? `${customerData.firstName}${customerData.lastName ? ' ' + customerData.lastName : ''}`.trim()
                    : customer?.firstName 
                    ? `${customer.firstName}${customer.lastName ? ' ' + customer.lastName : ''}`.trim()
                    : 'Pizza Enthusiast'}
                </h2>
                <p className="text-blue-100 text-center text-sm mt-1">Approved Customer</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-slate-600">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <span className="text-sm truncate">{customer?.email || 'No email'}</span>
                </div>
                {customer?.phone && (
                  <div className="flex items-center gap-3 text-slate-600">
                    <Phone className="w-5 h-5 text-slate-400" />
                    <span className="text-sm">{customer.phone}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-slate-600">
                  <Bell className="w-5 h-5 text-slate-400" />
                  <span className="text-sm">
                    {customer?.acceptsMarketing ? 'Subscribed to updates' : 'Not subscribed to updates'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Activity & Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {quickActions.map((action) => (
                    <motion.button
                      key={action.label}
                      onClick={() => action.href !== '#' && navigate(action.href)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex flex-col items-center gap-2 p-4 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                      <action.icon className={`w-6 h-6 ${action.color}`} />
                      <span className="text-sm font-medium text-slate-700">{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Order History */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Order History</h3>
                </div>
                
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map(({ node: order }: any, index: number) => {
                      const orderTotal = formatPrice(
                        order.totalPrice?.amount || '0',
                        order.totalPrice?.currencyCode || 'USD'
                      );
                      const orderDate = formatDate(order.processedAt || new Date().toISOString());
                      const location = order.shippingAddress 
                        ? `${order.shippingAddress.city || ''} ${order.shippingAddress.province || ''}`.trim() || 'Online Order'
                        : 'Online Order';
                      
                      return (
                        <motion.div
                          key={order.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                          className="border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <Package className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-slate-900">
                                    Order #{order.orderNumber || order.id.split('/').pop()}
                                  </p>
                                  <p className="text-xs text-slate-500">{orderDate}</p>
                                </div>
                              </div>
                              
                              {/* Order Items */}
                              {order.lineItems?.edges && order.lineItems.edges.length > 0 && (
                                <div className="mt-3 ml-13 space-y-1">
                                  {order.lineItems.edges.map(({ node: item }: any, itemIndex: number) => (
                                    <div key={itemIndex} className="flex items-center gap-2 text-sm text-slate-600">
                                      <Package className="w-3 h-3 text-blue-600" />
                                      <span>{item.quantity}x {item.title}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              {/* Location */}
                              <div className="flex items-center gap-2 mt-3 ml-13">
                                <MapPin className="w-3 h-3 text-slate-400" />
                                <span className="text-xs text-slate-500">{location}</span>
                              </div>
                            </div>
                            
                            {/* Order Total */}
                            <div className="text-right">
                              <p className="text-lg font-bold text-slate-900">{orderTotal}</p>
                              <p className="text-xs text-slate-500">Total</p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600 mb-2">No orders yet</p>
                    <p className="text-sm text-slate-500">Your order history will appear here once you place an order</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Promo Banner - Only show if customer has orders */}
          {totalOrders > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden"
            >
              <div className="absolute right-0 top-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute left-10 bottom-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2"></div>
              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold mb-2">🎉 Thank you for your orders!</h3>
                  <p className="text-orange-100">
                    {totalItems > 0 
                      ? `You've purchased ${totalItems} ${totalItems === 1 ? 'item' : 'items'} so far`
                      : 'Keep ordering to see your stats here'
                    }
                  </p>
                </div>
                <motion.button
                  onClick={() => navigate('/shop')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-orange-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow whitespace-nowrap"
                >
                  Shop Now
                </motion.button>
              </div>
            </motion.div>
          )}
          
          {/* Empty State - Show if no orders */}
          {!ordersLoading && totalOrders === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 bg-white rounded-2xl p-8 md:p-12 text-center border-2 border-dashed border-slate-200"
            >
              <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No Orders Yet</h3>
              <p className="text-slate-600 mb-6">Start shopping to see your orders and stats here</p>
              <motion.button
                onClick={() => navigate('/shop')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
              >
                Browse Products
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
