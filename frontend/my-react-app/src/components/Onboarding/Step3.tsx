import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronDown, LogOut, User } from "lucide-react";
import Button from "../Common/Button";
import logo from "../../assets/logo.svg";

const contentPreferences = {
  "1. CAREER & PERSONAL GROWTH": [
    "Career Advice",
    "Job Market Insights",
    "Productivity Hacks",
    "Motivation & Inspiration",
    "Personal Stories",
    "Daily Reflections",
  ],
  "2. LEADERSHIP & STARTUP INSIGHTS": [
    "Leadership Lessons",
    "Startup Learnings",
    "Founder Diaries",
    "Lessons from Mistakes",
    "Failures & Comebacks",
    "Success Stories",
  ],
  "3. INDUSTRY & KNOWLEDGE SHARING": [
    "Trending Industry News",
    "AI/Tech Breakdown",
    "Opinion Pieces",
    "Event Summaries",
  ],
  "4. WORKPLACE & CULTURE": [
    "Company Culture",
    "Customer Stories",
    "Behind the Scenes",
    "Surveys & Polls",
  ],
  "5. LIGHT & ENGAGING": ["Podcasts / Video Clips", "Memes & Humor"],
};

export default function Step3() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isInProfile = location.pathname.startsWith("/profile");

  const handleSelect = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics((prev) => prev.filter((t) => t !== topic));
    } else if (selectedTopics.length < 6) {
      setSelectedTopics((prev) => [...prev, topic]);
    }
  };

  const handleSignOut = () => navigate("/login");

  const handleProceed = () => {
    const nextPath = isInProfile ? "/profile/step4" : "/onboarding/step4";
    navigate(nextPath, { state: { selectedTopics } });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`${
        isInProfile
          ? "bg-transparent"
          : "flex min-h-screen bg-white overflow-auto"
      }`}
    >
      {/* Sidebar (hide if in profile) */}
      {!isInProfile && (
        <aside className="w-64 border-r flex flex-col justify-between py-6 px-4 sticky top-0 h-screen">
          <div>
            <div className="flex items-center gap-2 mb-10">
              <img src={logo} alt="Alento Logo" className="h-6 w-auto" />
            </div>

            <div className="flex flex-col gap-8 ml-3">
              {[ 
                { step: 1, title: "Your Industry" },
                { step: 2, title: "What do you post?" },
                { step: 3, title: "Content Preference" },
                { step: 4, title: "Customize your tone" },
              ].map((item, index) => (
                <div key={item.step} className="relative flex items-start">
                  <div
                    className={`w-3 h-3 rounded-full mt-1 ${
                      item.step <= 3 ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                  <div className="ml-3">
                    <div
                      className={`font-medium ${
                        item.step <= 3 ? "text-gray-800" : "text-gray-400"
                      }`}
                    >
                      Step {item.step}
                    </div>
                    <div className="text-gray-500 text-sm">{item.title}</div>
                  </div>
                  {index < 3 && (
                    <div className="absolute left-[5px] top-4 h-10 w-[2px] bg-gray-200"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              variant="outline"
              className="justify-start text-gray-600 hover:text-red-600"
              onClick={handleSignOut}
            >
              <LogOut size={18} className="mr-2" />
              Sign Out
            </Button>
          </div>
        </aside>
      )}

      {/* Main Section */}
      <main
        className={`flex-1 px-10 py-8 ${
          isInProfile ? "bg-white rounded-xl shadow-sm p-6" : ""
        }`}
      >
        {/* Header */}
        {!isInProfile && (
          <div className="flex justify-between items-center mb-6 relative">
            <div>
              <h2 className="text-2xl font-semibold">
                To Personalize your content,
              </h2>
              <p className="text-gray-500 text-sm">
                let’s understand your style & interests.
              </p>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 border px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
              >
                <img
                  src="https://i.pravatar.cc/40?img=3"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span>Steve Rogers</span>
                <ChevronDown size={16} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg z-50">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setMenuOpen(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    <User size={16} className="mr-2" />
                    My Profile
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    <LogOut size={16} className="mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="border rounded-2xl p-8">
          <h3 className="font-medium text-gray-800 mb-3">
            What kind of content do you like to read on LinkedIn?{" "}
            <span className="text-red-500">*</span>
          </h3>

          {/* Selected Tags */}
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedTopics.map((item) => (
              <span
                key={item}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full cursor-pointer"
                onClick={() => handleSelect(item)}
              >
                {item} ✕
              </span>
            ))}
          </div>

          <p className="text-gray-400 text-xs mb-6">
            You can select up to 6 topics from below
          </p>

          {/* Preferences */}
          <div className="flex flex-col gap-4">
            {Object.entries(contentPreferences).map(([category, items]) => (
              <div key={category}>
                <h4 className="font-semibold text-gray-700 mb-2">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSelect(item)}
                      className={`px-3 py-1 border rounded-full ${
                        selectedTopics.includes(item)
                          ? "bg-blue-100 text-blue-600 border-blue-400"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Buttons */}
          <div className="flex justify-between mt-10">
            <Button
              variant="ghost"
              onClick={() =>
                navigate(isInProfile ? "/profile/step2" : "/onboarding/step2")
              }
            >
              ← Back
            </Button>
            <Button
              className="bg-blue-600 text-white"
              disabled={selectedTopics.length === 0}
              onClick={handleProceed}
            >
              Proceed →
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
