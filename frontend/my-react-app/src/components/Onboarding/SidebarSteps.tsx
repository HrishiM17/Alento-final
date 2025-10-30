import React from "react";

interface SidebarStepsProps {
  currentStep: number;
}

const steps = [
  { id: 1, title: "Your Industry" },
  { id: 2, title: "What do you post?" },
  { id: 3, title: "Content Preference" },
  { id: 4, title: "Customize your tone" },
];

const SidebarSteps: React.FC<SidebarStepsProps> = ({ currentStep }) => {
  return (
    <div className="px-6 space-y-6 mt-6">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-start gap-3 relative">
          {/* Line Connector */}
          {index < steps.length - 1 && (
            <div
              className={`absolute left-[5px] top-[18px] w-px h-8 ${
                step.id <= currentStep ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></div>
          )}

          {/* Step Circle */}
          <div
            className={`flex-shrink-0 w-3 h-3 rounded-full border-2 ${
              step.id === currentStep
                ? "border-blue-500 bg-blue-500"
                : "border-gray-300"
            }`}
          ></div>

          {/* Labels */}
          <div className="flex-1">
            <p
              className={`text-sm ${
                step.id === currentStep ? "text-black font-medium" : "text-gray-500"
              }`}
            >
              Step {step.id}
            </p>
            <p
              className={`text-xs ${
                step.id === currentStep ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {step.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidebarSteps;
