import { X } from "lucide-react";

interface SignOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function SignOutModal({ isOpen, onClose, onConfirm }: SignOutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* Outer Modal */}
      <div
        className="bg-white rounded-lg shadow-xl flex flex-col items-center"
        style={{
          width: "550px",
          height: "269px",
          padding: "32px",
          gap: "24px",
        }}
      >
        {/* Inner Frame */}
        <div
          className="flex flex-col items-center text-center"
          style={{
            width: "486px",
            height: "145px",
            gap: "16px",
          }}
        >
          {/* Upper Section (cross only) */}
          <div
            className="flex justify-end items-center"
            style={{
              width: "486px",
              height: "24px",
              gap: "10px",
            }}
          >
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition"
              aria-label="Close"
            >
              <X size={20} />
            </button>
          </div>

          {/* Icon */}
          <div className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-md">
            <span className="text-2xl font-bold text-gray-600">!</span>
          </div>

          {/* Text Section */}
          <div className="flex flex-col items-center gap-1">
            <h2 className="text-2xl font-semibold text-gray-900">
              Are you leaving?
            </h2>
            <p className="text-gray-500 text-sm max-w-xs">
              Are you sure you want to sign out? All your unsaved data will be lost.
            </p>
          </div>
        </div>

        {/* Buttons Frame */}
<div
  className="flex justify-center items-center"
  style={{
    width: "486px",
    height: "36px",
    gap: "12px",
  }}
>
  {/* Cancel Button */}
  <button
    onClick={onClose}
    className="w-[237px] h-[36px] min-w-[100px] gap-[6px] rounded-full border border-neutral-700 text-gray-800 px-6 py-[10px] hover:bg-gray-100 transition"
  >
    Cancel
  </button>

  {/* Sign Out Button */}
  <button
    onClick={onConfirm}
    className="w-[237px] h-[36px] min-w-[100px] gap-[6px] rounded-full bg-[#1a67d8] text-white px-6 py-[10px] font-medium hover:bg-[#155cbf] transition"
  >
    Sign Out
  </button>
</div>
      </div>
    </div>
  );
}
