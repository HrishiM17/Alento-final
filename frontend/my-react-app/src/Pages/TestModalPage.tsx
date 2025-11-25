// src/Pages/TestModalPage.tsx (or wherever your test page is)
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Common/Navbar/Navbar";
import Sidebar from "../components/Common/Sidebar/Sidebar";
import PostHistoryPage from "../components/Common/PostHistoryPage";

const TestModalPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navbar */}
      <Navbar />

      {/* Main area */}
      <div className="flex">
        {/* Sidebar (left) */}
        <Sidebar />

        {/* Right content area */}
        <main className="flex-1 overflow-y-auto p-10">
          <Routes>
            <Route path="/" element={<div className="text-gray-500">Select a section from the sidebar.</div>} />
            <Route path="post-history" element={<PostHistoryPage />} />
            {/* add other nested test routes */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default TestModalPage;
