// src/components/Common/Sidebar/SidebarButton.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarButtonProps {
  label: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
  hasDropdown?: boolean;
  isOpen?: boolean;
  children?: React.ReactNode;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({
  label,
  icon,
  isActive = false,
  onClick,
  hasDropdown = false,
  isOpen = false,
  children,
}) => {
  // Base styles
  const baseClasses =
    "flex items-center justify-between w-[248px] h-[48px] rounded-full py-3 px-6 border transition-all duration-300";

  const activeClasses = "bg-[#1A67D8] border-transparent text-white";
  const inactiveClasses = "bg-transparent border-[#CCCCCC] text-gray-400";

  const combinedClasses = `${baseClasses} ${
    isActive ? activeClasses : inactiveClasses
  }`;

  // ✅ Fix: Use `stroke` instead of `color` (Lucide icons use stroke)
  const coloredIcon = React.isValidElement(icon)
    ? React.cloneElement(icon as React.ReactElement<any>, {
        stroke: isActive ? "#FFFFFF" : "#9CA3AF",
      })
    : icon;

  return (
    <div className="flex flex-col">
      {/* Main Button */}
      <button
        onClick={onClick}
        className={combinedClasses}
        aria-expanded={hasDropdown && isOpen ? "true" : "false"}
      >
        <div className="flex items-center gap-[12px]">
          {coloredIcon}
          <span
            className={`text-sm font-medium ${
              isActive ? "text-white" : "text-gray-400"
            }`}
          >
            {label}
          </span>
        </div>

        {hasDropdown && (
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke={isActive ? "#FFFFFF" : "#9CA3AF"}
            className={`transition-transform ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
          </motion.svg>
        )}
      </button>

      {/* Dropdown Animation */}
      <AnimatePresence>
        {isOpen && children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="pl-5 mt-2 flex flex-col gap-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SidebarButton;
