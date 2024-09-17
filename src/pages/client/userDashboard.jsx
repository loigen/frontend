import React, { useState, useEffect } from "react";
import { Sidebar, Topbar } from "../../components/client";

const UserDashboard = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const closeSidebar = () => {
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div onClick={closeSidebar} className="relative h-screen overflow-hidden">
      <div>
        <Topbar />
      </div>
      <div className="contentBody flex flex-row justify-between h-full">
        <div className="sidebarWrapper">
          <Sidebar />
        </div>
        <div
          className="flex-grow"
          style={{
            overflow: "scroll",
            height: "90vh",
            appearance: "none",
            overflowX: "hidden",
            backgroundColor: "#d9f4f9",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
