import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";

const PrivateRouter = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  const mainContentClass = isSidebarExpanded ? "ml-56" : "ml-16";

  return (
    <div className="flex flex-col h-screen">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-row flex-auto mt-20">
        <Sidebar expanded={isSidebarExpanded} />
        <div className={`flex flex-col flex-auto h-[calc(100vh-5rem)] ${mainContentClass}`}>
          <div className="flex flex-auto bg-white overflow-y-scroll">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateRouter;
