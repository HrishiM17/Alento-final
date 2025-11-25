// src/components/Common/Sidebar/Sidebar.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarButton from "./SidebarButton";
import SignOutModal from "../Pop-ups/SignOutModal";

// 🧩 Import SVGs
import DashboardIcon from "../../../assets/icons/dashboard.svg";
import CreateContentIcon from "../../../assets/icons/CreateContent.svg";
import SuggestedPostIcon from "../../../assets/icons/SuggestedPost.svg";
import JournalIcon from "../../../assets/icons/WeeklyJournal.svg";
import ProfileIcon from "../../../assets/icons/MyProfile.svg";
import SignOutIcon from "../../../assets/icons/SignOut.svg";
import SupportIcon from "../../../assets/icons/Support.svg";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeSection, setActiveSection] = useState<string>("Dashboard");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showSignOutModal, setShowSignOutModal] = useState(false);

  // 🧭 Sync active section with URL
  useEffect(() => {
    if (location.pathname.includes("post-history")) {
      setActiveSection("Post History");
      setOpenDropdown("Create Content");
    } else if (location.pathname.includes("dashboard")) {
      setActiveSection("Dashboard");
    } else if (location.pathname.includes("my-profile")) {
      setActiveSection("My Profile");
    } else if (location.pathname.includes("trending-posts")) {
      setActiveSection("Trending Posts");
      setOpenDropdown("My Weekly Journal");
    } else {
      setOpenDropdown(null);
    }
  }, [location.pathname]);

  // Toggle dropdowns
  const handleDropdownToggle = (label: string) => {
    setOpenDropdown((prev) => (prev === label ? null : label));
    setActiveSection(label);
  };

  // Select and navigate
  const handleSelect = (section: string, path?: string) => {
    setActiveSection(section);
    setOpenDropdown(null);
    if (path) navigate(path);
  };

  // Helper: Render SVG with color filters
  const renderIcon = (
    icon: string,
    isActive: boolean,
    isSupport: boolean = false
  ) => {
    // Active → white, Inactive → #666666, Support → unchanged
    const filter = isSupport
      ? "none"
      : isActive
      ? "brightness(0) invert(1)" // white
      : "invert(40%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%)"; // #666

    return (
      <img
        src={icon}
        alt=""
        width={24}
        height={24}
        style={{ filter }}
        className="transition-all duration-200"
      />
    );
  };

  return (
    <>
      <aside className="w-[312px] p-8 bg-white text-gray-700 border-r border-[#CCCCCC] h-screen sticky top-0 flex flex-col">
        {/* --- Top Section --- */}
        <div className="flex flex-col gap-[20px]">
          {/* Dashboard */}
          <SidebarButton
            label="Dashboard"
            icon={renderIcon(DashboardIcon, activeSection === "Dashboard")}
            isActive={activeSection === "Dashboard"}
            onClick={() => handleSelect("Dashboard", "/test-modal/dashboard")}
          />

          {/* Create Content */}
          <SidebarButton
            label="Create Content"
            icon={renderIcon(
              CreateContentIcon,
              openDropdown === "Create Content"
            )}
            hasDropdown
            isOpen={openDropdown === "Create Content"}
            isActive={
              activeSection === "Create Content" ||
              openDropdown === "Create Content" ||
              activeSection === "Post History"
            }
            onClick={() => handleDropdownToggle("Create Content")}
          >
            <div className="flex flex-col gap-3 mt-2">
              <button
                onClick={() =>
                  handleSelect("Post History", "/test-modal/post-history")
                }
                className={`flex items-center justify-center w-[228px] h-[43px] rounded-full py-3 px-6 duration-200 ${
                  activeSection === "Post History"
                    ? "bg-[#1A67D8] text-white"
                    : "bg-transparent text-gray-400 hover:text-[#1A67D8]"
                }`}
              >
                Post History
              </button>

              <button
                onClick={() => handleSelect("Drafts", "/test-modal/drafts")}
                className={`flex items-center justify-center w-[228px] h-[43px] rounded-full py-3 px-6 duration-200 ${
                  activeSection === "Drafts"
                    ? "bg-[#1A67D8] text-white"
                    : "bg-transparent text-gray-400 hover:text-[#1A67D8]"
                }`}
              >
                Drafts
              </button>
            </div>
          </SidebarButton>

          {/* Suggested Post */}
          <SidebarButton
            label="Suggested Post"
            icon={renderIcon(
              SuggestedPostIcon,
              activeSection === "Suggested Post"
            )}
            isActive={activeSection === "Suggested Post"}
            onClick={() =>
              handleSelect("Suggested Post", "/test-modal/suggested-posts")
            }
          />

          {/* My Weekly Journal */}
          <SidebarButton
            label="My Weekly Journal"
            icon={renderIcon(JournalIcon, openDropdown === "My Weekly Journal")}
            hasDropdown
            isOpen={openDropdown === "My Weekly Journal"}
            isActive={
              activeSection === "My Weekly Journal" ||
              openDropdown === "My Weekly Journal" ||
              activeSection === "Trending Posts"
            }
            onClick={() => handleDropdownToggle("My Weekly Journal")}
          >
            <div className="flex flex-col gap-3 mt-2">
              <button
                onClick={() =>
                  handleSelect("Trending Posts", "/test-modal/trending-posts")
                }
                className={`flex items-center justify-center w-[248px] h-[48px] rounded-full py-3 px-6 duration-200 ${
                  activeSection === "Trending Posts"
                    ? "bg-[#1A67D8] text-white"
                    : "bg-transparent text-gray-400 hover:text-[#1A67D8]"
                }`}
              >
                Trending Posts
              </button>
            </div>
          </SidebarButton>
        </div>

        {/* Spacer */}
        <div className="mt-auto" />

        {/* --- Bottom Section --- */}
        <div className="flex flex-col gap-[20px]">
          <SidebarButton
            label="My Profile"
            icon={renderIcon(ProfileIcon, activeSection === "My Profile")}
            isActive={activeSection === "My Profile"}
            onClick={() => handleSelect("My Profile", "/test-modal/my-profile")}
          />

          <SidebarButton
            label="Sign Out"
            icon={renderIcon(SignOutIcon, false)}
            onClick={() => setShowSignOutModal(true)}
          />

          <SidebarButton
            label="Support"
            icon={renderIcon(SupportIcon, false, true)} // 🔹 Support icon = original color
            isActive={activeSection === "Support"}
            onClick={() => handleSelect("Support", "/test-modal/support")}
          />
        </div>
      </aside>

      {/* Sign Out Modal */}
      <SignOutModal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onConfirm={() => {
          alert("✅ Signed out!");
          setShowSignOutModal(false);
        }}
      />
    </>
  );
};

export default Sidebar;
