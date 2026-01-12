/// <reference types="vite/client" />
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { onError } from '@apollo/client/link/error';
import React, { ReactNode } from 'react';

// Shopify Storefront API configuration
const SHOPIFY_STORE_DOMAIN = "pizzaanytime.myshopify.com";
const SHOPIFY_STOREFRONT_TOKEN = "b9769f6397b3c98674be2afb54fd30a8";
const SHOPIFY_API_VERSION = "2024-10"; // Use current stable version

// Error handling link
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const errorLink = onError((errorResponse: any) => {
  if (errorResponse.graphQLErrors) {
    errorResponse.graphQLErrors.forEach(({ message, locations, path }: { message: string; locations: unknown; path: unknown }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  }
  if (errorResponse.networkError) {
    console.error(`[Network error]: ${errorResponse.networkError}`);
  }
});

const httpLink = new HttpLink({
  uri: `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`,
  headers: {
    'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    'Content-Type': 'application/json',
  },
});

export const apolloClient = new ApolloClient({
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

interface ApolloProviderWrapperProps {
  children: ReactNode;
}

export function ApolloProviderWrapper({ children }: ApolloProviderWrapperProps) {
  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  );
}
