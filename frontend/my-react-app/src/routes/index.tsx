import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loader from "../components/Common/Loader";

// Pages
import LoginPage from "../components/Auth/LoginPage";
import OAuthCallback from "../components/Auth/OAuthCallback";
import WelcomePage from "../components/Onboarding/WelcomePage";
import MyProfile from "../components/Profile/MyProfile";
import Step1 from "../components/Onboarding/Step1";
import Step2 from "../components/Onboarding/Step2";
import Step3 from "../components/Onboarding/Step3";
import TestModalPage from "../Pages/TestModalPage";



const AppRoutes: React.FC = () => {
  const loading = false;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text="Loading application..." />
      </div>
    );
  }

  return (
    <Routes>
      {/* 🔓 Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/auth/callback" element={<OAuthCallback />} />

      {/* 👋 Welcome and Onboarding */}
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/onboarding/step1" element={<Step1 />} />
      <Route path="/onboarding/step2" element={<Step2 />} /> {/* ✅ */}
      <Route path="/onboarding/step3" element={<Step3 />} /> {/* ✅ */}


      {/* 👤 Profile Flow */}
      <Route path="/profile" element={<MyProfile />} />
      <Route path="/profile/step1" element={<Step1 />} /> {/* ✅ */}
      <Route path="/profile/step2" element={<Step2 />} /> {/* ✅ */}
      <Route path="/profile/step3" element={<Step3 />} /> {/* ✅ */}

      {/* 🧪 Test Pages */}
      <Route path="/test-modal/*" element={<TestModalPage />} />

      


      {/* 🧭 Default Redirects */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="*"
        element={<div className="p-10 text-center">404 - Page Not Found</div>}
      />
    </Routes>
  );
};

export default AppRoutes;
