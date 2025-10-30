import React from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Header from "./Header";
import Sidebar from "./Sidebar";
import DashboardHome from "./DashboardHome";
import CreateContentPage from "./CreateContentPage";
import WeeklyJournal from "./WeeklyJournal";
import SuggestedPosts from "./SuggestedPosts";
import SupportRequest from "./SupportRequest";
import DraftsList from "../Drafts/DraftsList";
import AnalyticsDashboard from "../Analytics/AnalyticsDashboard";
import SettingsPage from "../Settings/SettingsPage";

// 👇 Type-only import to satisfy `verbatimModuleSyntax`
import type { FC } from "react";

const DashboardLayout: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="create" element={<CreateContentPage />} />
            <Route path="journal" element={<WeeklyJournal />} />
            <Route path="suggested" element={<SuggestedPosts />} />
            <Route path="drafts" element={<DraftsList />} />
            <Route path="analytics" element={<AnalyticsDashboard />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="support" element={<SupportRequest />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
