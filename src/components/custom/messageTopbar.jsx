import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/topbar.css";
import profile from "../../images/defaultAvatar.jpg";
import { Notification, LoadingSpinner } from "../custom";
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Button,
  Tooltip,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useAuth } from "../../context/AuthProvider";

const Topbar = () => {
  const { user, logout, loading: authLoading, error: authError } = useAuth();
  const [avatar, setAvatar] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    if (user?.profilePicture) {
      setAvatar(`${user.profilePicture}?t=${new Date().getTime()}`);
    } else {
      setAvatar(
        "https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png"
      );
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [user]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (authLoading) {
    return <LoadingSpinner />;
  }

  if (authError) {
    return <div>{authError}</div>;
  }

  const handleLogout = async () => {
    await logout(); // Use logout from AuthContext
    window.location.href = "/";
  };

  return (
    <div className="topbarComponent fixed w-full bg-white z-50 flex flex-row justify-between shadow-2xl p-3 h-16 md:h-20">
      <IconButton onClick={() => navigate(-1)}>
        <Tooltip title="Back to Dashboard" arrow>
          <KeyboardArrowLeftIcon />
        </Tooltip>
      </IconButton>

      <div className="flex flex-row w-full justify-end gap-10">
        <ul className="flex flex-row gap-4 md:gap-6 items-center">
          <li>
            <Notification />
          </li>
        </ul>

        <div className="profilePart flex flex-row gap-4 md:gap-6 items-center justify-center">
          {!isMobile && (
            <p className="name capitalize font-bold text-xs md:text-sm cursor-pointer">
              {user?.firstname} {user?.lastname}
            </p>
          )}
          <IconButton onClick={handleMenuClick} size="small">
            <Tooltip title="Menu" className="flex items-center" arrow>
              <Avatar
                src={avatar || profile}
                alt={`${user?.firstname} ${user?.lastname}`}
                sx={{ width: 40, height: 40 }}
              />
              <KeyboardArrowDownIcon />
            </Tooltip>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: { mt: 1.5 },
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
