import React from "react";
import { Topbar, Sidebar } from "../../components/admin";

const Dashboard = ({ children }) => {
  return (
    <div className="relative h-screen overflow-hidden">
      <Topbar />
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

export default Dashboard;
