import React from "react";
import { Topbar, Sidebar } from "../../components/admin";

const Dashboard = ({ children }) => {
  return (
    <div className="relative h-screen overflow-hidden">
      <Topbar />
      <div className="contentBody flex flex-row justify-between h-full">
        <div style={{ zIndex: 100 }}>
          <Sidebar />
        </div>

        <div
          className="flex-grow"
          style={{
            overflow: "scroll",
            height: "90vh",
            appearance: "none",
            overflowX: "hidden",
            backgroundColor: "#E9F1EF",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
