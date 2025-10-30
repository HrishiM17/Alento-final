import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import { authService } from "../services/authService";

// 🔹 Define user type (update fields as per your API)
export interface User {
  id?: string;
  name?: string;
  email?: string;
  onboardingCompleted?: boolean;
  [key: string]: any; // allows extra dynamic fields
}

// 🔹 Context value interface
interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  loginWithLinkedIn: () => Promise<void>;
  handleOAuthCallback: (token: string) => Promise<User>;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
  refreshUser: () => Promise<User>;
  completeOnboarding: () => void;
  clearError: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

// 🔹 Create context with default undefined
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const userData = await authService.getCurrentUser();

      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
      }
    } catch (err: any) {
      console.error("Auth check failed:", err);
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      setError(err?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 LinkedIn OAuth Login
  const loginWithLinkedIn = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await authService.loginWithLinkedIn();
    } catch (err: any) {
      console.error("LinkedIn login failed:", err);
      setError(err?.message || "LinkedIn login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Handle OAuth callback
  const handleOAuthCallback = useCallback(async (token: string) => {
    try {
      setLoading(true);
      localStorage.setItem("token", token);

      const userData = await authService.getCurrentUser();
      setUser(userData);
      setIsAuthenticated(true);

      return userData;
    } catch (err: any) {
      console.error("OAuth callback failed:", err);
      localStorage.removeItem("token");
      setError(err?.message || "OAuth callback failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Email/password login
  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await authService.login(email, password);

      localStorage.setItem("token", response.token);
      setUser(response.user);
      setIsAuthenticated(true);

      return response;
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err?.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔹 Logout
  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await authService.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
      setLoading(false);
    }
  }, []);

  // 🔹 Update user data locally
  const updateUser = useCallback((userData: Partial<User>) => {
    setUser((prevUser) => ({
      ...prevUser,
      ...userData,
    }));
  }, []);

  // 🔹 Refresh user data from API
  const refreshUser = useCallback(async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
      return userData;
    } catch (err: any) {
      console.error("Failed to refresh user:", err);
      throw err;
    }
  }, []);

  // 🔹 Complete onboarding
  const completeOnboarding = useCallback(() => {
    setUser((prevUser) => ({
      ...prevUser,
      onboardingCompleted: true,
    }));
  }, []);

  // 🔹 Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    isAuthenticated,
    error,
    loginWithLinkedIn,
    handleOAuthCallback,
    login,
    logout,
    updateUser,
    refreshUser,
    completeOnboarding,
    clearError,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
