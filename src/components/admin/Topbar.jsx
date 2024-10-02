import React, { useState, useEffect } from "react";
import LoadingSpinner from "../custom/LoadingSpinner";
import "../../styles/topbar.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Notification } from "../custom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { Menu, MenuItem, Avatar, IconButton } from "@mui/material";
import LogoutButton from "../LogoutButton";

const Topbar = () => {
  const { user, loading } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

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

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="topbarComponent flex flex-row justify-between shadow-md p-3 h-16 md:h-20">
      <div className="flex flex-row w-full justify-end gap-10">
        <ul className="flex flex-row gap-4 md:gap-6 items-center">
          <li>
            <Notification />
          </li>
        </ul>
        <div className="profilePart flex items-center gap-4 md:gap-6">
          {!isMobile && (
            <p className="name capitalize font-bold text-xs md:text-sm">
              {user.firstname} {user.lastname}
            </p>
          )}
          <IconButton onClick={handleMenuClick} size="small">
            <Avatar
              alt={`${user.firstname} ${user.lastname}`}
              src={user.profilePicture}
              sx={{ width: 40, height: 40 }}
            />
            <KeyboardArrowDownIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                mt: 1.5,
                "& .MuiMenuItem-root": {
                  padding: "10px 20px",
                },
              },
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
            <MenuItem>
              <LogoutButton />
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
