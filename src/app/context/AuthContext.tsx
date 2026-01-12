import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { gql } from "@apollo/client";
import { useMutation, useApolloClient } from "@apollo/client/react";

/* ------------------------------------------------------------------ */
/* GRAPHQL */
/* ------------------------------------------------------------------ */

const CUSTOMER_QUERY = gql`
  query customer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      firstName
      lastName
      phone
      acceptsMarketing
      createdAt
      tags
      orders(first: 10) {
        edges {
          node {
            id
            name
            processedAt
            totalPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

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
        message
      }
    }
  }
`;

const CUSTOMER_ACCESS_TOKEN_DELETE = gql`
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
    }
  }
`;

const CUSTOMER_RECOVER = gql`
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        message
      }
    }
  }
`;

/* ------------------------------------------------------------------ */
/* TYPES */
/* ------------------------------------------------------------------ */

export interface CustomerData {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  acceptsMarketing?: boolean;
  createdAt?: string;
  tags?: string[];
  orders?: {
    edges: {
      node: {
        id: string;
        name: string;
        processedAt: string;
        totalPrice: {
          amount: string;
          currencyCode: string;
        };
      };
    }[];
  };
}

interface AuthContextType {
  customer: CustomerData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signUp: (params: any) => Promise<{ success: boolean; error?: string }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  recoverPassword: (email: string) => Promise<{ success: boolean }>;
  clearError: () => void;
}

/* ------------------------------------------------------------------ */
/* STORAGE */
/* ------------------------------------------------------------------ */

const AUTH_TOKEN_KEY = "pizza_auth_token";
const AUTH_TOKEN_EXPIRES_KEY = "pizza_auth_token_expires";
const AUTH_CUSTOMER_KEY = "pizza_auth_customer";

/* ------------------------------------------------------------------ */
/* CONTEXT */
/* ------------------------------------------------------------------ */

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};

/* ------------------------------------------------------------------ */
/* PROVIDER */
/* ------------------------------------------------------------------ */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<CustomerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apolloClient = useApolloClient();

  const [createCustomer] = useMutation(CUSTOMER_CREATE);
  const [createAccessToken] = useMutation(CUSTOMER_ACCESS_TOKEN_CREATE);
  const [deleteAccessToken] = useMutation(CUSTOMER_ACCESS_TOKEN_DELETE);
  const [customerRecover] = useMutation(CUSTOMER_RECOVER);

  /* ---------------- TOKEN HELPERS ---------------- */

  const storeToken = (token: string, expiresAt: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(AUTH_TOKEN_EXPIRES_KEY, expiresAt);
  };

  const getToken = () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const exp = localStorage.getItem(AUTH_TOKEN_EXPIRES_KEY);
    if (!token || !exp || new Date(exp) <= new Date()) return null;
    return token;
  };

  const clearSession = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_TOKEN_EXPIRES_KEY);
    localStorage.removeItem(AUTH_CUSTOMER_KEY);
  };

  /* ---------------- FETCH REAL CUSTOMER ---------------- */

  const hydrateCustomer = async (token: string) => {
    const res = await apolloClient.query({
      query: CUSTOMER_QUERY,
      variables: { customerAccessToken: token },
      fetchPolicy: "no-cache",
    });

    const shopifyCustomer = res.data?.customer;

    if (shopifyCustomer) {
      localStorage.setItem(AUTH_CUSTOMER_KEY, JSON.stringify(shopifyCustomer));
      setCustomer(shopifyCustomer);
    }
  };

  /* ---------------- AUTH ACTIONS ---------------- */

  const signIn = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await createAccessToken({
        variables: { input: { email, password } },
      });

      const tokenData =
        res.data?.customerAccessTokenCreate?.customerAccessToken;

      if (!tokenData) {
        throw new Error("Invalid email or password");
      }

      storeToken(tokenData.accessToken, tokenData.expiresAt);
      await hydrateCustomer(tokenData.accessToken);

      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  }, []);

  const signUp = useCallback(async (params: any) => {
    setIsLoading(true);
    setError(null);

    try {
      await createCustomer({
        variables: { input: params },
      });

      const tokenRes = await createAccessToken({
        variables: {
          input: { email: params.email, password: params.password },
        },
      });

      const tokenData =
        tokenRes.data?.customerAccessTokenCreate?.customerAccessToken;

      if (!tokenData) {
        throw new Error("Account created but login failed");
      }

      storeToken(tokenData.accessToken, tokenData.expiresAt);
      await hydrateCustomer(tokenData.accessToken);

      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
      return { success: false, error: err.message };
    }
  }, []);

  const signOut = async () => {
    const token = getToken();
    if (token) {
      try {
        await deleteAccessToken({
          variables: { customerAccessToken: token },
        });
      } catch {}
    }
    clearSession();
    setCustomer(null);
  };

  const recoverPassword = async (email: string) => {
    await customerRecover({ variables: { email } });
    return { success: true };
  };

  const clearError = () => setError(null);

  /* ---------------- INIT ---------------- */

  useEffect(() => {
    const token = getToken();
    if (token) {
      hydrateCustomer(token).finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        customer,
        isAuthenticated: !!customer,
        isLoading,
        error,
        signUp,
        signIn,
        signOut,
        recoverPassword,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
