import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Frame from "../../assets/Frame.svg";
import Logo from "../../assets/Logo.svg";
import { useAuth } from "../../hooks/useAuth";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth() as unknown as {
    user: { name?: string } | null;
    logout: () => void;
  };

  const userName = user?.name || "User";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // ✅ Updated navigation to step1
  const handleContinue = () => {
    navigate("/onboarding/step1");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <header className="w-full h-20 px-8 flex items-center justify-between border-b border-gray-200">
        {/* ✅ Alento Logo instead of text */}
        <img src={Logo} alt="Alento Logo" className="h-7 w-auto" />

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-3 focus:outline-none"
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="w-9 h-9 rounded-full border border-gray-300"
            />
            <span className="text-gray-800 font-medium">{userName}</span>
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                menuOpen ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown */}
          {menuOpen && (
            <div className="absolute right-0 mt-3 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10">
              <button
                onClick={() => {
                  navigate("/profile");
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.003 9.003 0 01-6 0M12 14v-4m0 0a4 4 0 10-4-4 4 4 0 004 4z"
                  />
                </svg>
                My Profile
              </button>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                  />
                </svg>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 text-center relative">
      <h1
  className="font-montreal font-medium text-[28px] md:text-[36px] leading-[100%] text-gray-900 text-center mb-3"
>
  Welcome to Alento, {userName}!
</h1>

        <p className="text-gray-500 mb-8 text-base">
          To personalize your content, let’s understand your style & interests.
        </p>

        {/* ✅ Updated to go to Step1 */}
        <button
          onClick={handleContinue}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-4 rounded-full flex items-center gap-2 font-medium text-lg"
        >
          Personalize your AI Agent
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12l-7.5 7.5M21 12H3" />
          </svg>
        </button>

        {/* Decorative Network Frame */}
        <img
        src={Frame}
        alt="Decorative face"
        className="absolute bottom-0 left-0 w-[280px] md:w-[350px] opacity-100 select-none pointer-events-none"
      />
      </main>
    </div>
  );
};

export default WelcomePage;
