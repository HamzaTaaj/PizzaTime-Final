import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

// GraphQL Mutations - matching graphql/mutation/*.gql files
const CUSTOMER_CREATE = gql`
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer {
        id
        email
        firstName
        lastName
        phone
        acceptsMarketing
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const CUSTOMER_ACCESS_TOKEN_CREATE = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const CUSTOMER_ACCESS_TOKEN_DELETE = gql`
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      deletedCustomerAccessTokenId
      userErrors {
        field
        message
      }
    }
  }
`;

// Note: Customer notes are updated via Admin API endpoint (/api/update-customer-notes)
// Storefront API's CustomerUpdateInput does not support the 'note' field

const CUSTOMER_RECOVER = gql`
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

// Types
export interface CustomerData {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  acceptsMarketing?: boolean;
  // Additional business fields (stored locally)
  company?: string;
  location?: string;
  machineCount?: string;
  role?: string;
  message?: string;
}

export interface SignUpParams {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  acceptsMarketing?: boolean;
  // Additional business fields
  company?: string;
  location?: string;
  machineCount?: string;
  role?: string;
  message?: string;
}

interface AuthContextType {
  customer: CustomerData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signUp: (params: SignUpParams) => Promise<{ success: boolean; error?: string; errorCode?: string }>;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  recoverPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  clearError: () => void;
}

// Storage keys
const AUTH_TOKEN_KEY = 'pizza_auth_token';
const AUTH_TOKEN_EXPIRES_KEY = 'pizza_auth_token_expires';
const AUTH_CUSTOMER_KEY = 'pizza_auth_customer';

// Context
export const AuthContext = createContext<AuthContextType | null>(null);

// Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // GraphQL mutations
  const [createCustomer] = useMutation(CUSTOMER_CREATE);
  const [createAccessToken] = useMutation(CUSTOMER_ACCESS_TOKEN_CREATE);
  const [deleteAccessToken] = useMutation(CUSTOMER_ACCESS_TOKEN_DELETE);
  const [customerRecover] = useMutation(CUSTOMER_RECOVER);

  // Token management
  const getStoredToken = useCallback((): string | null => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const expiresAt = localStorage.getItem(AUTH_TOKEN_EXPIRES_KEY);
    
    if (!token || !expiresAt) return null;
    
    // Check if token is expired
    if (new Date(expiresAt) <= new Date()) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_TOKEN_EXPIRES_KEY);
      localStorage.removeItem(AUTH_CUSTOMER_KEY);
      return null;
    }
    
    return token;
  }, []);

  const storeToken = useCallback((token: string, expiresAt: string): void => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(AUTH_TOKEN_EXPIRES_KEY, expiresAt);
  }, []);

  const clearToken = useCallback((): void => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_TOKEN_EXPIRES_KEY);
    localStorage.removeItem(AUTH_CUSTOMER_KEY);
  }, []);

  const storeCustomer = useCallback((customerData: CustomerData): void => {
    localStorage.setItem(AUTH_CUSTOMER_KEY, JSON.stringify(customerData));
  }, []);

  const getStoredCustomer = useCallback((): CustomerData | null => {
    const stored = localStorage.getItem(AUTH_CUSTOMER_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Helper function to save customer notes via Admin API
  const saveCustomerNotes = useCallback(
    async (customerId: string, params: SignUpParams) => {
      try {
        // Format notes
        const note = `
Company: ${params.company || '-'}
Location: ${params.location || '-'}
Machines: ${params.machineCount || '-'}
Role: ${params.role || '-'}
Message:
${params.message || '-'}
Submitted: ${new Date().toISOString()}
        `.trim();

        // Admin API GraphQL mutation
        const query = `
          mutation customerUpdate($input: CustomerInput!) {
            customerUpdate(input: $input) {
              customer {
                id
                note
              }
              userErrors {
                field
                message
              }
            }
          }
        `;

        // Use Vite proxy to avoid CORS issues
        const response = await fetch('/api/shopify-admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: {
              input: {
                id: customerId,
                note,
              },
            },
          }),
        });

        const result = await response.json();
        console.log('Admin API response:', result);

        if (result.errors) {
          console.error('GraphQL errors:', result.errors);
        } else if (result.data?.customerUpdate?.userErrors?.length > 0) {
          console.error('User errors:', result.data.customerUpdate.userErrors);
        } else {
          console.log('Customer notes updated successfully!');
        }
      } catch (error) {
        console.error('Failed to save customer notes:', error);
      }
    },
    []
  );

  // Sign up - Create new customer account
  const signUp = useCallback(
    async (params: SignUpParams): Promise<{ success: boolean; error?: string; errorCode?: string }> => {
      setIsLoading(true);
      setError(null);

      try {
        // Create customer in Shopify
        const createResult = await createCustomer({
          variables: {
            input: {
              email: params.email,
              password: params.password,
              firstName: params.firstName,
              lastName: params.lastName,
              phone: params.phone,
              acceptsMarketing: params.acceptsMarketing ?? false,
            },
          },
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const createData = createResult.data as any;
        const { customer: newCustomer, customerUserErrors } = createData.customerCreate;

        // Check for errors
        if (customerUserErrors && customerUserErrors.length > 0) {
          const err = customerUserErrors[0];
          
          // If email already taken, inform user to sign in
          if (err.code === 'TAKEN' || err.message?.toLowerCase().includes('already taken')) {
            setError('An account with this email already exists. Please sign in to update your request.');
            setIsLoading(false);
            return { 
              success: false, 
              error: 'An account with this email already exists. Please sign in to update your request.', 
              errorCode: 'EMAIL_TAKEN' 
            };
          }
          
          setError(err.message);
          setIsLoading(false);
          return { success: false, error: err.message, errorCode: err.code || undefined };
        }

        if (!newCustomer) {
          setError('Failed to create account');
          setIsLoading(false);
          return { success: false, error: 'Failed to create account' };
        }

        // Auto sign in after successful registration
        const tokenResult = await createAccessToken({
          variables: {
            input: {
              email: params.email,
              password: params.password,
            },
          },
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const tokenData = tokenResult.data as any;

        if (tokenData?.customerAccessTokenCreate?.customerUserErrors?.length) {
          // Account created but couldn't sign in - still success
          setIsLoading(false);
          return { success: true };
        }

        if (tokenData?.customerAccessTokenCreate?.customerAccessToken) {
          const { accessToken, expiresAt } = tokenData.customerAccessTokenCreate.customerAccessToken;
          storeToken(accessToken, expiresAt);
          
          // Save business notes to Shopify customer via Admin API
          await saveCustomerNotes(newCustomer.id, params);
          
          const customerData: CustomerData = {
            id: newCustomer.id,
            email: newCustomer.email || params.email,
            firstName: newCustomer.firstName,
            lastName: newCustomer.lastName,
            phone: newCustomer.phone,
            acceptsMarketing: newCustomer.acceptsMarketing,
            // Store additional business fields locally
            company: params.company,
            location: params.location,
            machineCount: params.machineCount,
            role: params.role,
            message: params.message,
          };
          storeCustomer(customerData);
          setCustomer(customerData);
        }

        setIsLoading(false);
        return { success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        setError(message);
        setIsLoading(false);
        return { success: false, error: message };
      }
    },
    [createCustomer, createAccessToken, storeToken, storeCustomer, saveCustomerNotes]
  );

  // Sign in
  const signIn = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await createAccessToken({
          variables: {
            input: { email, password },
          },
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = result.data as any;
        const { customerAccessToken, customerUserErrors } = data.customerAccessTokenCreate;

        if (customerUserErrors && customerUserErrors.length > 0) {
          const errorMessage = customerUserErrors
            .map((err: { message: string }) => err.message)
            .join(', ');
          setError(errorMessage);
          setIsLoading(false);
          return { success: false, error: errorMessage };
        }

        if (!customerAccessToken) {
          const errorMessage = 'Invalid email or password';
          setError(errorMessage);
          setIsLoading(false);
          return { success: false, error: errorMessage };
        }

        const { accessToken, expiresAt } = customerAccessToken;
        storeToken(accessToken, expiresAt);

        // Store basic customer info (email-based since we don't have a customer query yet)
        const customerData: CustomerData = {
          id: '',
          email: email,
        };
        storeCustomer(customerData);
        setCustomer(customerData);

        setIsLoading(false);
        return { success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        setError(message);
        setIsLoading(false);
        return { success: false, error: message };
      }
    },
    [createAccessToken, storeToken, storeCustomer]
  );

  // Recover password
  const recoverPassword = useCallback(
    async (email: string): Promise<{ success: boolean; error?: string }> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await customerRecover({
          variables: { email },
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data = result.data as any;
        const errors = data?.customerRecover?.customerUserErrors;

        if (errors && errors.length > 0) {
          // Log for debugging but don't expose to user (security - prevent email enumeration)
          console.log('Recovery attempt:', errors[0].message);
        }

        // Always return success to prevent email enumeration attacks
        setIsLoading(false);
        return { success: true };
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        setError(message);
        setIsLoading(false);
        return { success: false, error: message };
      }
    },
    [customerRecover]
  );

  // Sign out
  const signOut = useCallback(async () => {
    setIsLoading(true);
    const accessToken = getStoredToken();

    if (accessToken) {
      try {
        await deleteAccessToken({
          variables: { customerAccessToken: accessToken },
        });
      } catch {
        console.error('Error deleting access token');
      }
    }

    clearToken();
    setCustomer(null);
    setError(null);
    setIsLoading(false);
  }, [getStoredToken, deleteAccessToken, clearToken]);

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = () => {
      const token = getStoredToken();
      if (token) {
        const storedCustomer = getStoredCustomer();
        if (storedCustomer) {
          setCustomer(storedCustomer);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, [getStoredToken, getStoredCustomer]);

  const value: AuthContextType = {
    customer,
    isAuthenticated: !!customer,
    isLoading,
    error,
    signUp,
    signIn,
    signOut,
    recoverPassword,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
