import { X } from "lucide-react";
import BookIcon from "../../../assets/icons/Book-Icon.svg"; 

interface EmptyJournalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function EmptyJournalModal({
  isOpen,
  onClose,
  onConfirm,
}: EmptyJournalModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      {/*  Outer Frame */}
      <div
        className="flex flex-col items-center relative bg-white shadow-xl"
        style={{
          width: "550px",
          height: "269px",
          borderRadius: "8px",
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
          {/*  Top Section */}
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

          {/* 📘 Lower Section (Icon + Text) */}
          <div
            className="flex flex-col items-center text-center"
            style={{
              width: "486px",
              height: "105px",
              gap: "12px",
            }}
          >
            {/* Book Icon Frame (per Figma specs) */}
            <div className="flex items-center justify-center w-[48px] h-[48px] rounded-[3px] border border-[#cccccc]">
              <img
                src={BookIcon}
                alt="Book icon"
                className="w-6 h-6 object-contain"
              />
            </div>

            {/* 📝 Text */}
            <div className="flex flex-col items-center gap-1">
              <h2 className="text-2xl font-semibold text-gray-900">
                Your journal is empty.
              </h2>
              <p className="text-gray-500 text-sm max-w-xs leading-snug">
                Would you like to create content inspired by trending posts in
                your industry?
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
          {/* Cancel */}
          <button
            onClick={onClose}
            className="w-[237px] h-[36px] min-w-[100px] rounded-full border border-neutral-700 text-neutral-700 py-[10px] px-6 gap-[6px] hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          {/* Create from Trends */}
          <button
            onClick={onConfirm}
            className="w-[237px] h-[36px] min-w-[100px] rounded-full bg-[#1a67d8] text-white py-[10px] px-6 gap-[6px] font-medium hover:bg-[#155cbf] transition"
          >
            Create from Trends
          </button>
        </div>
      </div>
    </div>
  );
}
