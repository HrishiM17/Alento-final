import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import NetworkBackground from "../Common/NetworkBackground";
import Frame from "../../assets/Frame.svg";
import Logo from "../../assets/Logo.svg";
import LinkedInModal from "../../components/Auth/LinkedInModal"; 

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface User {
  onboardingCompleted?: boolean;
  [key: string]: any;
}

const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithLinkedIn, isAuthenticated, user, login } = useAuth() as unknown as {
    loginWithLinkedIn: () => Promise<void>;
    login: (data: LoginFormValues) => Promise<void>;
    isAuthenticated: boolean;
    user: User | null;
  };

  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false); // ✅ modal state

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormValues) => login(data),
    onError: () => setError("Login failed. Please check your credentials."),
  });

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      const errorMap: Record<string, string> = {
        authentication_failed: "Authentication failed. Please try again.",
        no_token: "No authentication token received.",
        callback_failed: "Login callback failed. Please try again.",
        session_expired: "Your session has expired. Please log in again.",
      };
      setError(errorMap[errorParam] || "An error occurred. Please try again.");
    }
  }, [searchParams]);

  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(user.onboardingCompleted ? "/dashboard" : "/onboarding");
    }
  }, [isAuthenticated, user, navigate]);

  const handleLinkedInLogin = () => {
    setShowModal(true); // ✅ open modal instead of direct login
  };

  const onSubmit = (data: LoginFormValues) => {
    setError(null);
    loginMutation.mutate(data);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header (ALENTO bar) */}
      <header className="w-full h-20 px-6 md:px-12 flex items-center justify-between border-b border-gray-200 bg-white/90 backdrop-blur-md shadow-sm">
        <img
          src={Logo}
          alt="Alento Logo"
          className="h-8 w-auto object-contain"
        />
      </header>

      {/* Subtle network pattern */}
      <NetworkBackground />

      {/* Login Card */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4">
        <div className="w-[660px] max-w-full bg-white rounded-[20px] space-y-12">
          <div className="text-center">
            <h2 className="w-[580px] h-[43px] text-black bg-white text-[36px] font-medium leading-[100%] text-center opacity-100 font-[NeueMontreal] rounded-md">
              Log In
            </h2>

            <p className="text-gray-600">
              AI crafted LinkedIn posts in your tone. Built just for you.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Continue with LinkedIn Button */}
          <button
            onClick={handleLinkedInLogin}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            Continue with LinkedIn
          </button>

          <p className="text-gray-500 text-sm text-center">
            No posts will be shared without your permission.
            <br />
            100% Private
          </p>
        </div>
      </div>

      {/* Bottom-left decorative SVG */}
      <img
        src={Frame}
        alt="Decorative face"
        className="absolute bottom-0 left-0 w-[280px] md:w-[350px] opacity-100 select-none pointer-events-none"
      />

      {/* ✅ Modal (only appears when button clicked) */}
      {showModal && <LinkedInModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default LoginPage;
