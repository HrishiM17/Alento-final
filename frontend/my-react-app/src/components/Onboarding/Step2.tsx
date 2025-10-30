import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AlentoLogo from "../../assets/logo.svg";
import OnboardingLayout from "../Layouts/OnboardingLayout";

const topicsData = [
  {
    title: "1. BUSINESS & LEADERSHIP",
    items: ["Leadership", "Career Growth", "Productivity", "Team Culture", "Thought Leadership"],
  },
  {
    title: "2. STARTUPS & ENTREPRENEURSHIP",
    items: ["Startups", "Entrepreneurship", "Bootstrapping", "Fundraising", "Sales & Growth", "Innovation"],
  },
  {
    title: "3. WORK & CAREERS",
    items: ["Remote Work", "Freelancing", "Hiring & Recruiting", "Networking", "Creator Economy"],
  },
  {
    title: "4. TECHNOLOGY & PRODUCT",
    items: [
      "AI & Machine Learning",
      "Product Management",
      "UX/UI Design",
      "Coding & Development",
      "Tech Trends",
      "Digital Transformation",
      "Data Analytics",
      "Customer Experience",
    ],
  },
  {
    title: "5. MARKETING & SOCIAL IMPACT",
    items: ["Marketing Strategy", "Personal Branding", "Mental Health", "Sustainability"],
  },
];

const Step2: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState<string[]>(["Leadership", "Networking", "UX/UI Design"]);

  const isProfileMode = location.pathname.startsWith("/profile");

  const handleToggle = (item: string) => {
    setSelected((prev) =>
      prev.includes(item)
        ? prev.filter((x) => x !== item)
        : prev.length < 6
        ? [...prev, item]
        : prev
    );
  };

  return (
    <OnboardingLayout>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Top Nav (show only in onboarding mode) */}
        {!isProfileMode && (
          <div className="w-full flex items-center justify-between px-10 py-6 border-b">
            <img src={AlentoLogo} alt="Alento Logo" className="h-8" />
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/profile")}
                className="text-gray-600 hover:text-black"
              >
                My Profile
              </button>
              <button
                onClick={() => navigate("/login")}
                className="text-gray-600 border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar (step indicator) */}
          <div className="w-1/4 border-r px-8 py-10 overflow-y-auto">
            <div className="space-y-6">
              <StepIndicator label="Step 1" active text="Your Industry" />
              <StepIndicator label="Step 2" active text="What do you post?" />
              <StepIndicator label="Step 3" text="Content Preference" />
              <StepIndicator label="Step 4" text="Customize your tone" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 px-12 py-10 overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              What topics do you often post about? <span className="text-red-500">*</span>
            </h2>
            <p className="text-sm text-gray-500 mb-6">You can select up to 6 topics from below</p>

            {/* Selected Topics */}
            <div className="flex flex-wrap gap-3 mb-8">
              {selected.map((item) => (
                <div
                  key={item}
                  className="flex items-center bg-blue-100 text-blue-800 rounded-full px-4 py-1 text-sm"
                >
                  {item}
                  <button
                    className="ml-2 text-blue-600 hover:text-blue-900"
                    onClick={() => handleToggle(item)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {/* Topics */}
            <div className="space-y-8">
              {topicsData.map((group) => (
                <div key={group.title}>
                  <h3 className="font-semibold text-gray-700 mb-3">{group.title}</h3>
                  <div className="flex flex-wrap gap-3">
                    {group.items.map((item) => (
                      <button
                        key={item}
                        onClick={() => handleToggle(item)}
                        className={`px-4 py-2 border rounded-full text-sm transition-all duration-200 ${
                          selected.includes(item)
                            ? "bg-black text-white border-black"
                            : "border-gray-300 text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-between mt-12">
              <button
                onClick={() => setSelected([])}
                className="border border-gray-300 text-gray-600 px-6 py-2 rounded-full hover:bg-gray-100"
              >
                Reset
              </button>
              <div className="flex gap-4">
                <button
                  onClick={() =>
                    navigate(isProfileMode ? "/profile/step1" : "/onboarding/step1")
                  }
                  className="border border-gray-300 px-6 py-2 rounded-full text-gray-600 hover:bg-gray-100"
                >
                  ← Back
                </button>
                <button
                  onClick={() =>
                    navigate(isProfileMode ? "/profile/step3" : "/onboarding/step3")
                  }
                  className="bg-black text-white px-8 py-2 rounded-full hover:bg-gray-900"
                >
                  Proceed →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OnboardingLayout>
  );
};

// Small helper component
const StepIndicator = ({
  label,
  text,
  active,
}: {
  label: string;
  text: string;
  active?: boolean;
}) => (
  <div>
    <div className="flex items-center gap-2">
      <div
        className={`h-3 w-3 rounded-full ${
          active ? "bg-blue-600" : "bg-gray-300"
        }`}
      />
      <p
        className={`font-medium ${
          active ? "text-gray-800" : "text-gray-400"
        }`}
      >
        {label}
      </p>
    </div>
    <p
      className={`text-sm ml-6 ${
        active ? "text-gray-500" : "text-gray-400"
      }`}
    >
      {text}
    </p>
  </div>
);

export default Step2;
