import { X } from "lucide-react";

interface DiscardDraftModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DiscardDraftModal({
  isOpen,
  onClose,
  onConfirm,
}: DiscardDraftModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/* 🌟 Outer Frame */}
      <div
        className="flex flex-col items-center relative bg-white shadow-xl"
        style={{
          width: "550px",
          height: "269px",
          gap: "24px",
          borderRadius: "8px",
          padding: "32px",
        }}
      >
        {/* 🧩 Inner Frame */}
        <div
          className="flex flex-col items-center text-center"
          style={{
            width: "486px",
            height: "145px",
            gap: "16px",
          }}
        >
          {/* ✖️ Top Section (X button) */}
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

          {/* 🧠 Content Section */}
          <div
            className="flex flex-col items-center justify-center text-center"
            style={{
              width: "486px",
              height: "105px",
              gap: "12px",
            }}
          >
            {/* ❗ Icon */}
            <div className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-md">
              <span className="text-2xl font-bold text-gray-600">!</span>
            </div>

            {/* Text */}
            <div className="flex flex-col items-center gap-1">
              <h2 className="text-2xl font-semibold text-gray-900">
                Discard Draft?
              </h2>
              <p className="text-gray-500 text-sm max-w-xs leading-snug">
                You haven’t finished your post yet. Are you sure you want to
                discard your draft?
              </p>
            </div>
          </div>
        </div>

        {/* 🔘 Buttons Frame */}
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
  className="w-[237px] h-[36px] min-w-[100px] gap-[6px] rounded-full border border-neutral-700 text-neutral-700 py-[10px] px-6 hover:bg-gray-100 transition"
>
  Cancel
</button>
          {/* Discard Button */}
          <button
  onClick={onConfirm}
  className="w-[237px] h-[36px] min-w-[100px] gap-[6px] rounded-full bg-[#1a67d8] text-white py-[10px] px-6 font-medium hover:bg-[#155cbf] transition"
>
  Discard
</button>

        </div>
      </div>
    </div>
  );
}
