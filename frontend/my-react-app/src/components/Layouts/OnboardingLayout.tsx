import React from "react";
import { useLocation } from "react-router-dom";

interface OnboardingLayoutProps {
  children: React.ReactNode;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ children }) => {
  const location = useLocation();

  // Determine mode based on path
  const isProfileMode = location.pathname.startsWith("/profile");

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isProfileMode ? "bg-gray-50" : "bg-white"
      }`}
    >
      {/* If inside MyProfile, the dashboard sidebar is already present */}
      {isProfileMode ? (
        <div className="flex-1 overflow-y-auto">{children}</div>
      ) : (
        <div className="flex flex-col min-h-screen">{children}</div>
      )}
    </div>
  );
};

export default OnboardingLayout;
