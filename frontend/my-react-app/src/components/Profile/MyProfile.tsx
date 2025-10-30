import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Common/Button";

const industries = {
  "BUSINESS & PROFESSIONAL SERVICES": [
    "Consulting",
    "Legal",
    "Human Resources",
    "Finance",
    "Insurance",
  ],
  "TECHNOLOGY & DIGITAL": [
    "Technology",
    "Cybersecurity",
    "Telecommunications",
    "Gaming",
    "Art & Design",
    "Marketing & Advertising",
    "Media & Publishing",
  ],
  "SCIENCE, HEALTH & EDUCATION": ["Healthcare", "Biotechnology", "Education"],
  "LIFESTYLE, TRAVEL & ENTERTAINMENT": [
    "Hospitality",
    "Travel & Tourism",
    "Entertainment",
    "Sports & Fitness",
  ],
  "INDUSTRY & INFRASTRUCTURE": [
    "Manufacturing",
    "Construction",
    "Automotive",
    "Real Estate",
    "Logistics & Supply Chain",
    "Aerospace & Defense",
    "Energy / Oil & Gas",
    "Agriculture",
  ],
};

export default function MyProfile() {
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([
    "Consulting",
    "Cybersecurity",
    "Education",
  ]);
  const navigate = useNavigate();

  const handleSelect = (industry: string) => {
    if (selectedIndustries.includes(industry)) {
      setSelectedIndustries((prev) => prev.filter((i) => i !== industry));
    } else if (selectedIndustries.length < 6) {
      setSelectedIndustries((prev) => [...prev, industry]);
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-64 border-r flex flex-col justify-between py-6 px-4">
        <div>
          <div className="text-2xl font-semibold mb-10 pl-2">ALENTO</div>

          <nav className="flex flex-col gap-3">
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </Button>

            <Button variant="primary" className="justify-start">
  Create Content
</Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => navigate("/suggested-post")}
            >
              Suggested Post
            </Button>

            <Button
              variant="outline"
              className="justify-start"
              onClick={() => navigate("/weekly-journal")}
            >
              My Weekly Journal
            </Button>
          </nav>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            variant="primary"
            className="justify-start bg-blue-600 text-white"
          >
            My Profile
          </Button>
          <Button
            variant="outline"
            className="justify-start"
            onClick={() => navigate("/signin")}
          >
            Sign Out
          </Button>
          <div className="text-gray-400 text-sm text-center mt-2">Support</div>
        </div>
      </aside>

      {/* Main Section */}
      <main className="flex-1 overflow-y-auto px-10 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">My Profile</h2>
            <p className="text-gray-500 text-sm">
              To personalize your content, let’s understand your style &
              interests.
            </p>
          </div>
          <Button variant="outline">Edit</Button>
        </div>

        {/* Step Container */}
        <div className="border rounded-2xl p-8 flex gap-12">
          {/* Stepper */}
          <div className="w-40 flex flex-col items-start relative">
            <div className="flex flex-col gap-8 ml-3">
              {[
                { step: 1, title: "Your Industry" },
                { step: 2, title: "What do you post?" },
                { step: 3, title: "Content Preference" },
                { step: 4, title: "Customize your tone" },
              ].map((item, index) => (
                <div key={item.step} className="relative flex items-start">
                  {/* Step Circle */}
                  <div
                    className={`w-3 h-3 rounded-full mt-1 ${
                      item.step === 1 ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                  {/* Step Label */}
                  <div className="ml-3">
                    <div
                      className={`font-medium ${
                        item.step === 1 ? "text-gray-800" : "text-gray-400"
                      }`}
                    >
                      Step {item.step}
                    </div>
                    <div className="text-gray-500 text-sm">{item.title}</div>
                  </div>

                  {/* Connector Line */}
                  {index < 3 && (
                    <div className="absolute left-[5px] top-4 h-10 w-[2px] bg-gray-200"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Step Content */}
          <div className="flex-1">
            <h3 className="font-medium text-gray-800 mb-3">
              What Industry do you belong to?{" "}
              <span className="text-red-500">*</span>
            </h3>

            <div className="flex flex-wrap gap-2 mb-2">
              {selectedIndustries.map((item) => (
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
              You can select up to 6 industries from below
            </p>

            <div className="flex flex-col gap-4">
              {Object.entries(industries).map(([category, items]) => (
                <div key={category}>
                  <h4 className="font-semibold text-gray-700 mb-2">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <button
                        key={item}
                        onClick={() => handleSelect(item)}
                        className={`px-3 py-1 border rounded-full ${
                          selectedIndustries.includes(item)
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
              <Button variant="ghost" onClick={() => navigate(-1)}>
                Back
              </Button>
              <Button
                className="bg-blue-600 text-white"
                onClick={() => navigate("/profile/step2")}
              >
                Proceed →
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
