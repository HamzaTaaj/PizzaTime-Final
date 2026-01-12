import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { motion } from 'motion/react';
import { ShoppingCart, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// GraphQL query to fetch products from Shopify
const GET_PRODUCTS = gql`
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
                availableForSale
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

// GraphQL query to check customer approval status
const GET_CUSTOMER_TAGS = gql`
  query getCustomerTags($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      tags
    }
  }
`;

interface Product {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string | null;
      };
    }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        availableForSale: boolean;
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  };
}

export function ShopifyProductsPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  
  // Get access token
  const getAccessToken = () => {
    return localStorage.getItem('pizza_auth_token');
  };
  
  const accessToken = getAccessToken();
  
  // Check customer approval status
  const { data: customerData, loading: customerLoading } = useQuery(GET_CUSTOMER_TAGS, {
    variables: { customerAccessToken: accessToken || '' },
    skip: !accessToken || !isAuthenticated,
    errorPolicy: 'all',
  });

  // Redirect to account review page if not approved
  useEffect(() => {
    if (!authLoading && !customerLoading && isAuthenticated && customerData?.customer) {
      const customerTags = customerData.customer.tags || [];
      
      // Debug: Log tags
      console.log('ShopifyProductsPage - Customer tags raw:', customerTags);
      
      // Parse tags - Shopify Storefront API returns as array
      let tagsArray: string[] = [];
      if (Array.isArray(customerTags)) {
        tagsArray = customerTags;
      } else if (typeof customerTags === 'string') {
        tagsArray = customerTags.split(',').map((t: string) => t.trim());
      }
      
      console.log('ShopifyProductsPage - Parsed tags:', tagsArray);
      const isApproved = tagsArray.some((tag: string) => tag.toLowerCase() === 'approved');
      console.log('ShopifyProductsPage - Is approved?', isApproved);
      
      if (!isApproved) {
        navigate('/account-under-review', { replace: true });
      }
    } else if (!authLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [authLoading, customerLoading, isAuthenticated, customerData, navigate]);

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: { first: 50 },
    errorPolicy: 'all',
    skip: !isAuthenticated || customerLoading || !customerData?.customer, // Skip if not authenticated or checking approval
  });

  // Function to create direct checkout URL
  const getCheckoutUrl = (product: Product): string => {
    try {
      const variantId = product.variants?.edges[0]?.node?.id;
      if (!variantId) {
        return '#';
      }
      // Extract variant ID (format: gid://shopify/ProductVariant/XXXXX)
      const variantIdMatch = variantId.match(/\/(\d+)$/);
      if (!variantIdMatch) {
        return '#';
      }
      const numericVariantId = variantIdMatch[1];
      
      // Create direct checkout URL - adds to cart and redirects to checkout
      const shopifyDomain = 'pizzaanytime.myshopify.com';
      return `https://${shopifyDomain}/cart/add?id=${numericVariantId}&quantity=1&return_to=/checkout`;
    } catch (err) {
      console.error('Error creating checkout URL:', err);
      return '#';
    }
  };

  // Format price
  const formatPrice = (amount: string, currencyCode: string): string => {
    try {
      const price = parseFloat(amount);
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
      }).format(price);
    } catch (err) {
      console.error('Error formatting price:', err);
      return amount;
    }
  };

  // Show loading while checking authentication and approval
  if (authLoading || customerLoading || (isAuthenticated && !customerData)) {
    return (
      <div className="min-h-screen pt-20 bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, will redirect (don't show products)
  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    console.error('ShopifyProductsPage Error:', error);
    return (
      <div className="min-h-screen pt-20 bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Error Loading Products</h2>
          <p className="text-slate-600 mb-4">{error.message || 'Failed to load products from Shopify'}</p>
          <pre className="text-xs text-slate-500 bg-slate-100 p-4 rounded mb-4 overflow-auto max-h-40">
            {JSON.stringify(error, null, 2)}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const products = (data as any)?.products?.edges || [];

  if (products.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-white flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">No Products Available</h2>
          <p className="text-slate-600">There are no products to display at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Header Section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Our <span className="text-blue-600">Products</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Browse our selection of high-quality products and checkout directly
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(({ node: product }: { node: Product }, index: number) => {
              const imageUrl = product.images.edges[0]?.node.url || '';
              const imageAlt = product.images.edges[0]?.node.altText || product.title;
              const price = product.priceRange?.minVariantPrice 
                ? formatPrice(
                    product.priceRange.minVariantPrice.amount,
                    product.priceRange.minVariantPrice.currencyCode
                  )
                : 'N/A';
              const isAvailable = product.variants?.edges[0]?.node?.availableForSale ?? false;
              const checkoutUrl = getCheckoutUrl(product);

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden hover:border-blue-600 transition-all hover:shadow-xl group cursor-pointer"
                  onClick={() => navigate(`/shop/${product.handle}`)}
                >
                  {/* Product Image */}
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={imageAlt}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-slate-100">
                        <ShoppingCart className="w-16 h-16 text-slate-300" />
                      </div>
                    )}
                    {!isAvailable && (
                      <div className="absolute top-2 right-2 px-3 py-1 bg-red-600 text-white text-sm font-semibold rounded-full">
                        Out of Stock
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 line-clamp-2 min-h-[3.5rem]">
                      {product.title}
                    </h3>
                    
                    {product.description && (
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                        {product.description.replace(/<[^>]*>/g, '').substring(0, 100)}...
                      </p>
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-blue-600">{price}</span>
                    </div>

                    {/* Checkout Button */}
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isAvailable) {
                          window.open(checkoutUrl, '_blank');
                        }
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 px-4 rounded-lg font-semibold text-center transition-colors flex items-center justify-center gap-2 ${
                        isAvailable
                          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20'
                          : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      }`}
                      disabled={!isAvailable}
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Checkout Now
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
