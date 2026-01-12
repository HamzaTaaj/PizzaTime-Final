import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { motion } from 'motion/react';
import { ShoppingCart, Loader2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// GraphQL query to check customer approval status
const GET_CUSTOMER_TAGS = gql`
  query getCustomerTags($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      tags
    }
  }
`;

// GraphQL query to fetch single product by handle
const GET_PRODUCT = gql`
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
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
    maxVariantPrice: {
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
        title: string;
        availableForSale: boolean;
        price: {
          amount: string;
          currencyCode: string;
        };
      };
    }>;
  };
}

export function ProductDetailsPage() {
  const { handle } = useParams<{ handle: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [selectedVariantId, setSelectedVariantId] = React.useState<string | null>(null);

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
      
      // Parse tags - Shopify Storefront API returns as array
      let tagsArray: string[] = [];
      if (Array.isArray(customerTags)) {
        tagsArray = customerTags;
      } else if (typeof customerTags === 'string') {
        tagsArray = customerTags.split(',').map((t: string) => t.trim());
      }
      
      const isApproved = tagsArray.some((tag: string) => tag.toLowerCase() === 'approved');
      
      if (!isApproved) {
        navigate('/account-under-review', { replace: true });
      }
    } else if (!authLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [authLoading, customerLoading, isAuthenticated, customerData, navigate]);

  const { loading, error, data } = useQuery(GET_PRODUCT, {
    variables: { handle: handle || '' },
    skip: !handle || !isAuthenticated || customerLoading || !customerData?.customer,
    errorPolicy: 'all',
  });

  // Function to create direct checkout URL
  const getCheckoutUrl = (variantId: string): string => {
    try {
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

  // Set default selected variant when product loads
  React.useEffect(() => {
    if (data?.product?.variants?.edges && data.product.variants.edges.length > 0) {
      const defaultVariant = data.product.variants.edges.find(({ node }) => node.availableForSale) || data.product.variants.edges[0];
      if (defaultVariant) {
        setSelectedVariantId(defaultVariant.node.id);
      }
    }
  }, [data?.product]);

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

  // If not authenticated, will redirect (don't show product)
  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !data?.product) {
    return (
      <div className="min-h-screen pt-20 bg-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Product Not Found</h2>
          <p className="text-slate-600 mb-4">
            {error?.message || 'The product you are looking for does not exist.'}
          </p>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const product: Product = data.product;
  const images = product.images.edges || [];
  const mainImage = images[selectedImageIndex]?.node?.url || images[0]?.node?.url || '';
  const minPrice = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode
  );
  const maxPrice = formatPrice(
    product.priceRange.maxVariantPrice.amount,
    product.priceRange.maxVariantPrice.currencyCode
  );
  
  // Get selected variant
  const selectedVariant = product.variants.edges.find(
    ({ node }) => node.id === selectedVariantId
  )?.node || product.variants.edges[0]?.node;
  
  const isAvailable = selectedVariant?.availableForSale ?? false;
  const selectedPrice = selectedVariant 
    ? formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)
    : minPrice;
  const checkoutUrl = selectedVariantId ? getCheckoutUrl(selectedVariantId) : '#';

  // Clean HTML from description
  const cleanDescription = product.description?.replace(/<[^>]*>/g, '') || '';

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.button
          onClick={() => navigate('/shop')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Products</span>
        </motion.button>
      </div>

      {/* Product Details */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="aspect-square rounded-xl overflow-hidden bg-slate-100 border-2 border-slate-200"
              >
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ShoppingCart className="w-24 h-24 text-slate-300" />
                  </div>
                )}
              </motion.div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.map(({ node: image }, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? 'border-blue-600 ring-2 ring-blue-200'
                          : 'border-slate-200 hover:border-blue-400'
                      }`}
                    >
                      <img
                        src={image.url}
                        alt={image.altText || `${product.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                  {product.title}
                </h1>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-blue-600">{selectedPrice}</span>
                  {minPrice !== maxPrice && (
                    <p className="text-sm text-slate-500 mt-1">
                      Price range: {minPrice} - {maxPrice}
                    </p>
                  )}
                </div>

                {/* Availability Status */}
                {!isAvailable && (
                  <div className="mb-6 px-4 py-3 bg-red-50 border-2 border-red-200 rounded-lg">
                    <span className="text-red-600 font-semibold">Out of Stock</span>
                  </div>
                )}

                {/* Description */}
                {cleanDescription && (
                  <div className="prose prose-slate max-w-none mb-6">
                    <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-wrap">
                      {cleanDescription}
                    </p>
                  </div>
                )}

                {/* Variants */}
                {product.variants.edges.length > 1 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-slate-900 mb-3">Select Variant:</h3>
                    <div className="space-y-2">
                      {product.variants.edges.map(({ node: variant }) => {
                        const isSelected = selectedVariantId === variant.id;
                        const isVariantAvailable = variant.availableForSale;
                        
                        return (
                          <motion.button
                            key={variant.id}
                            onClick={() => {
                              if (isVariantAvailable) {
                                setSelectedVariantId(variant.id);
                              }
                            }}
                            whileHover={isVariantAvailable ? { scale: 1.02 } : {}}
                            whileTap={isVariantAvailable ? { scale: 0.98 } : {}}
                            disabled={!isVariantAvailable}
                            className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                              isSelected
                                ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-200'
                                : isVariantAvailable
                                ? 'bg-slate-50 border-slate-200 hover:border-blue-400 hover:bg-blue-50/50'
                                : 'bg-slate-100 border-slate-200 opacity-50 cursor-not-allowed'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  isSelected
                                    ? 'border-blue-600 bg-blue-600'
                                    : 'border-slate-300 bg-white'
                                }`}
                              >
                                {isSelected && (
                                  <div className="w-2.5 h-2.5 rounded-full bg-white" />
                                )}
                              </div>
                              <span className={`font-medium ${
                                isSelected ? 'text-blue-900' : 'text-slate-700'
                              }`}>
                                {variant.title}
                              </span>
                              {!isVariantAvailable && (
                                <span className="text-xs text-red-600 font-semibold">(Out of Stock)</span>
                              )}
                            </div>
                            <span className={`font-semibold ${
                              isSelected ? 'text-blue-600' : 'text-slate-600'
                            }`}>
                              {formatPrice(variant.price.amount, variant.price.currencyCode)}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Checkout Button */}
                <motion.a
                  href={checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg text-center transition-colors flex items-center justify-center gap-3 ${
                    isAvailable
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20'
                      : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  }`}
                  onClick={(e) => {
                    if (!isAvailable) {
                      e.preventDefault();
                    }
                  }}
                >
                  <ShoppingCart className="w-6 h-6" />
                  Checkout Now
                </motion.a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
