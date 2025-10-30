import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

interface LinkedInModalProps {
  onClose: () => void;
}

const LinkedInModal: React.FC<LinkedInModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
//   const { loginWithLinkedIn } = useAuth() as {
//     loginWithLinkedIn: (email?: string, password?: string) => Promise<void>;
//   };

const loginWithLinkedIn = async (email?: string, password?: string): Promise<void> => {
  try {
    // Example placeholder logic — replace this with your frontend action
    console.log("Logging in with LinkedIn...");
    console.log("Email:", email);
    console.log("Password:", password);

    // Simulate async call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Login successful!");
  } catch (error) {
    console.error("Login failed:", error);
  }
};



  const navigate = useNavigate();

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await loginWithLinkedIn(email, password);
      navigate("/welcome"); // ✅ redirect after successful login
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>

        {/* LinkedIn icon */}
        <div className="flex justify-center mb-6">
          <svg
            className="w-16 h-16 text-blue-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Sign in
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Stay updated on your professional world
        </p>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />

          <div className="text-left">
            <a
              href="#"
              className="text-blue-600 font-semibold text-sm hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkedInModal;
