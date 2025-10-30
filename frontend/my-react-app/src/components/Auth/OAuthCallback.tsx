import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../Common/Loader";

const OAuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleOAuthCallback } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Extract query params
        const token = searchParams.get("token");
        const error = searchParams.get("error");

        if (error) {
          console.error("OAuth error:", error);
          navigate(`/login?error=${encodeURIComponent(error)}`);
          return;
        }

        if (token) {
          // Handle OAuth callback (validate & store token)
          const user = await handleOAuthCallback(token);

          // Redirect based on onboarding status
          if (user?.onboardingCompleted) {
            navigate("/dashboard");
          } else {
            navigate("/onboarding");
          }
        } else {
          navigate("/login?error=no_token");
        }
      } catch (err) {
        console.error("OAuth callback error:", err);
        navigate("/login?error=callback_failed");
      }
    };

    void handleCallback(); // void to silence async warning
  }, [searchParams, navigate, handleOAuthCallback]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader size="lg" text="Completing sign in..." />
    </div>
  );
};

export default OAuthCallback;
