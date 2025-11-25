import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ✅ Schema definitions for each step
const stepSchemas = [
  z.object({
    industry: z.string().min(1, "Please enter your industry"),
  }),
  z.object({
    postType: z.string().min(1, "Please describe what you post"),
  }),
  z.object({
    contentPreference: z.string().min(1, "Please enter your content preference"),
  }),
  z.object({
    tone: z.string().min(1, "Please describe your preferred tone"),
  }),
];

// ✅ Combine all steps into one big schema
// Use an explicit object so TypeScript correctly infers the form field keys
const combinedSchema = z.object({
  industry: z.string().min(1, "Please enter your industry"),
  postType: z.string().min(1, "Please describe what you post"),
  contentPreference: z.string().min(1, "Please enter your content preference"),
  tone: z.string().min(1, "Please describe your preferred tone"),
});
type FormValues = z.infer<typeof combinedSchema>;

// ✅ Stepper Component
interface Step {
  title: string;
  subtitle: string;
}

const VerticalStepper: React.FC<{ steps: Step[]; currentStep: number }> = ({
  steps,
  currentStep,
}) => {
  return (
    <div className="flex flex-col space-y-6">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
        const isLast = stepNumber === steps.length;

        return (
          <div key={index} className="flex items-start">
            <div className="flex flex-col items-center">
              {/* Circle */}
              <div
                className={`w-4 h-4 rounded-full border-2 ${
                  isActive || isCompleted
                    ? "border-[#1A67D8] bg-[#1A67D8]"
                    : "border-gray-400 bg-white"
                }`}
              />
              {/* Connector line */}
              {!isLast && (
                <div
                  className={`w-px h-10 ${
                    isCompleted ? "bg-[#1A67D8]" : "bg-gray-400"
                  }`}
                ></div>
              )}
            </div>

            {/* Texts */}
            <div className="ml-3">
              <p
                className={`text-sm font-semibold ${
                  isActive || isCompleted ? "text-[#1A67D8]" : "text-gray-400"
                }`}
              >
                Step {stepNumber}
              </p>
              <p className="text-gray-400 text-sm">{step.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ✅ Main Stepper Form
export default function StepperForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    { title: "Step 1", subtitle: "Your Industry" },
    { title: "Step 2", subtitle: "What do you post?" },
    { title: "Step 3", subtitle: "Content Preference" },
    { title: "Step 4", subtitle: "Customize your tone" },
  ];

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(combinedSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("✅ Final Form Data:", data);
    alert("All steps completed!");
  };

  // ✅ Go to next step (with validation)
  const handleNext = async () => {
    const fieldsPerStep = [
      ["industry"],
      ["postType"],
      ["contentPreference"],
      ["tone"],
    ];
    const fields = fieldsPerStep[currentStep - 1];
    const valid = await trigger(fields as any);
    if (valid && currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex justify-center min-h-screen bg-gray-900 text-white p-10">
      <div className="flex space-x-12 bg-gray-800 p-10 rounded-xl shadow-lg">
        {/* Left: Stepper */}
        <VerticalStepper steps={steps} currentStep={currentStep} />

        {/* Right: Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center space-y-6 w-80"
        >
          {currentStep === 1 && (
            <>
              <label className="text-sm text-gray-300">Your Industry</label>
              <input
                {...register("industry")}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-[#1A67D8]"
                placeholder="e.g., Technology"
              />
              {errors.industry && (
                <p className="text-red-400 text-sm">{errors.industry.message}</p>
              )}
            </>
          )}

          {currentStep === 2 && (
            <>
              <label className="text-sm text-gray-300">What do you post?</label>
              <input
                {...register("postType")}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-[#1A67D8]"
                placeholder="e.g., Tips, Guides, News"
              />
              {errors.postType && (
                <p className="text-red-400 text-sm">{errors.postType.message}</p>
              )}
            </>
          )}

          {currentStep === 3 && (
            <>
              <label className="text-sm text-gray-300">
                Content Preference
              </label>
              <input
                {...register("contentPreference")}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-[#1A67D8]"
                placeholder="e.g., Visual, Informative"
              />
              {errors.contentPreference && (
                <p className="text-red-400 text-sm">
                  {errors.contentPreference.message}
                </p>
              )}
            </>
          )}

          {currentStep === 4 && (
            <>
              <label className="text-sm text-gray-300">
                Customize your tone
              </label>
              <input
                {...register("tone")}
                className="w-full px-4 py-2 rounded bg-gray-700 text-white outline-none focus:ring-2 focus:ring-[#1A67D8]"
                placeholder="e.g., Professional, Friendly"
              />
              {errors.tone && (
                <p className="text-red-400 text-sm">{errors.tone.message}</p>
              )}
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-2 rounded-full border border-gray-500 text-gray-300 hover:bg-gray-700 transition"
              >
                Back
              </button>
            )}

            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2 rounded-full bg-[#1A67D8] text-white hover:bg-[#155cbf] transition"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-[#1A67D8] text-white hover:bg-[#155cbf] transition"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
