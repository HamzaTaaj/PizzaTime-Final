import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

// Simple query to test Shopify Storefront API connection
const TEST_SHOP_QUERY = gql`
  query TestShopConnection {
    shop {
      name
      description
    }
  }
`;

export function useTestShopifyConnection() {
  const { data, loading, error } = useQuery(TEST_SHOP_QUERY);
  
  return {
    isConnected: !!data?.shop,
    shopName: data?.shop?.name,
    shopDescription: data?.shop?.description,
    loading,
    error,
  };
}

// Test component you can temporarily add anywhere to check connection
export function ShopifyConnectionTest() {
  const { isConnected, shopName, loading, error } = useTestShopifyConnection();

  if (loading) return <div className="p-4 bg-yellow-100 text-yellow-800 rounded">Testing Shopify connection...</div>;
  
  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-800 rounded">
        <strong>Connection Failed:</strong>
        <pre className="mt-2 text-sm">{error.message}</pre>
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="p-4 bg-green-100 text-green-800 rounded">
        <strong>✓ Connected to Shopify!</strong>
        <p className="mt-1">Shop: {shopName}</p>
      </div>
    );
  }

  return <div className="p-4 bg-gray-100 text-gray-800 rounded">No data returned</div>;
}
