import api from "./api";

// 👇 Define a User type based on what your backend returns
// You can extend this as needed (email, name, role, onboardingCompleted, etc.)
export interface User {
  id: string;
  name: string;
  email: string;
  onboardingCompleted?: boolean;
  [key: string]: any; // optional for flexibility
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  // 🔹 LinkedIn OAuth - Redirect user to backend OAuth endpoint
  loginWithLinkedIn: async (): Promise<void> => {
    const backendUrl =
      import.meta.env.VITE_API_URL || "http://localhost:5000/api";
    window.location.href = `${backendUrl}/auth/linkedin`;
  },

  // 🔹 Login with email/password (for testing)
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    return response.data;
  },

  // 🔹 Get current user info using token in Authorization header
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>("/auth/me");
    return response.data;
  },

  // 🔹 Logout
  logout: async (): Promise<void> => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      localStorage.removeItem("token");
    }
  },

  // 🔹 Verify token validity
  verifyToken: async (token: string): Promise<User | null> => {
    try {
      const response = await api.post<User>("/auth/verify", { token });
      return response.data;
    } catch {
      return null;
    }
  },
};
export default authService;