import React, { useState, useEffect } from "react";
import { Topbar, Sidebar } from "../../components/admin";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

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
