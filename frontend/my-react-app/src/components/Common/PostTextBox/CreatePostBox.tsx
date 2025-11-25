import React, { useState } from "react";
import { Paperclip, Sparkles, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EmptyJournalModal from "../Pop-ups/EmptyJournalModal";
import starIcon from "../../../assets/icons/star.svg";

const CreatePostBox: React.FC<{ hasJournal?: boolean }> = ({ hasJournal = false }) => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showEmptyJournal, setShowEmptyJournal] = useState(false);

  // --- Simulate async generation/enhancement ---
  const simulateAsync = (callback: () => void, delay = 2000) => {
    setIsLoading(true);
    setTimeout(() => {
      callback();
      setIsLoading(false);
    }, delay);
  };

  // --- Actions ---
  const handleEnhance = () => {
    if (!text.trim()) return;
    simulateAsync(() =>
      setText(
        (t) =>
          `${t.trim()}\n\n✨ Enhanced: Focus on solving problems and improving experiences — not just aesthetics.`
      )
    );
  };

  const createFromJournal = () => {
    if (!hasJournal) return setShowEmptyJournal(true);
    simulateAsync(() =>
      setText(
        `Based on your weekly journal: This week, I learned the importance of feedback loops in design — iteration is where the magic happens. #Design #Iteration`
      )
    );
  };

  const generateFromTrending = () =>
    simulateAsync(() =>
      setText(
        `Trending Topic: "Design Systems in 2025" — how modular design thinking and accessibility are shaping the next era. #UIDesign #UXDesign #ProductDesign`
      )
    );

  const generateFromImages = () =>
    simulateAsync(() =>
      setText(
        `These visuals tell a story: behind every product lies creativity, collaboration, and purpose. #VisualStorytelling #DesignThinking`
      )
    );

  const handleDiscard = () => setText("");
  const handlePost = () => {
    if (!text.trim()) return;
    alert("✅ Posted:\n\n" + text);
    setText("");
  };

  const postEnabled = text.trim().length > 0;

  return (
    <>
      <div
        className="
          w-[1048px] min-h-[503px]
          flex flex-col justify-between
          gap-[64px]
          bg-white
          p-6
          rounded-lg
          border border-gray-300
          relative overflow-hidden
        "
      >
        {/* ---------------- Center Star Animation ---------------- */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              key="center-star"
              className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[1px] z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.img
                src={starIcon}
                alt="loading animation"
                className="w-[150px] h-[150px]"
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "linear",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---------------- Upper Section ---------------- */}
        <div className="w-full flex flex-col gap-[8px]">
          {/* Header */}
          <div className="flex justify-between items-center text-sm font-medium text-gray-700">
            <span className="truncate pr-2">WHAT DO YOU WANT TO TALK ABOUT?</span>
            <button className="text-gray-400 flex-shrink-0">Save Drafts</button>
          </div>

          {/* Text Area */}
          <div className="border border-gray-300 rounded-xl p-4 flex flex-col justify-between">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type Here..."
              className="w-full min-h-[120px] resize-none outline-none text-gray-800 placeholder-gray-400 bg-transparent"
            />

            <div className="flex items-center justify-between mt-4">
              {/* Attachment */}
              <button
                type="button"
                disabled={isLoading}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300"
              >
                <Paperclip size={18} stroke="#555" />
              </button>

              {/* Enhance Text Button */}
              <button
                onClick={handleEnhance}
                disabled={isLoading || !text.trim()}
                className={`flex items-center justify-center gap-[12px]
                  w-[163px] h-[52px] rounded-[100px]
                  px-[24px] py-[16px] text-sm font-medium border transition-all duration-300
                  ${
                    isLoading
                      ? "border-[#1A67D8] text-[#1A67D8] opacity-70 cursor-wait"
                      : text.trim()
                      ? "border-[#1A67D8] text-[#1A67D8] cursor-pointer"
                      : "border-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                {isLoading ? (
                  <span>Enhancing User&apos;s Text...</span>
                ) : (
                  <>
                    <Sparkles size={16} stroke="#1A67D8" />
                    <span>Enhance Text</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Suggestion Buttons */}
          <div className="flex flex-wrap gap-3 justify-start mt-4">
            <button
              onClick={createFromJournal}
              disabled={isLoading}
              className="border border-gray-400 rounded-full px-5 py-2 text-sm text-gray-700 font-medium disabled:opacity-50"
            >
              Create a post based on my Weekly Journal.
            </button>
            <button
              onClick={generateFromTrending}
              disabled={isLoading}
              className="border border-gray-400 rounded-full px-5 py-2 text-sm text-gray-700 font-medium disabled:opacity-50"
            >
              Create a post from trending topics in my industry.
            </button>
            <button
              onClick={generateFromImages}
              disabled={isLoading}
              className="border border-gray-400 rounded-full px-5 py-2 text-sm text-gray-700 font-medium disabled:opacity-50"
            >
              Create a post using the images provided.
            </button>
          </div>
        </div>

        {/* ---------------- Lower Section ---------------- */}
        <div className="w-full flex flex-col justify-between gap-[24px]">
          {/* Discard + Post row */}
          <div className="w-full flex items-center justify-between">
            <button
              onClick={handleDiscard}
              disabled={isLoading}
              className="text-gray-400 text-sm font-medium disabled:opacity-50"
            >
              Discard
            </button>

            {/* Post Button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.05 }}
              onClick={handlePost}
              disabled={!postEnabled || isLoading}
              className={`flex items-center justify-center gap-[12px]
                min-w-[140px] w-[140px] h-[52px]
                rounded-[100px] px-[24px] py-[16px] text-sm font-medium
                transition-all duration-200
                ${
                  postEnabled && !isLoading
                    ? "bg-[#1A67D8] text-white cursor-pointer"
                    : "bg-gray-300 text-white cursor-not-allowed"
                }`}
            >
              <span>Post</span>
              <ArrowUpRight size={16} stroke="#FFFFFF" />
            </motion.button>
          </div>

          {/* Note Text */}
          <div className="flex justify-end mt-1">
            <span className="text-[12px] text-gray-500 leading-snug">
              NOTE: Anyone on or off LinkedIn can view these posts.
            </span>
          </div>
        </div>
      </div>

      {/* ---------------- Empty Journal Modal ---------------- */}
      <EmptyJournalModal
        isOpen={showEmptyJournal}
        onClose={() => setShowEmptyJournal(false)}
        onConfirm={() => setShowEmptyJournal(false)}
      />
    </>
  );
};

export default CreatePostBox;
