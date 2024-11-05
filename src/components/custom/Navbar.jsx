import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom";
import logo from "../../images/fullLogo.png";
import SignupModal from "../Signup";
import LoginModal from "../Login";
const Navbar = ({ setView }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };
  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuItemClick = (route) => {
    setView(route);
  };

  const isActive = (route) => (location.pathname === route ? "active" : "");

  const drawerContent = (
    <List>
      <ListItem
        button
        onClick={() => handleMenuItemClick("Home")}
        sx={{
          cursor: "pointer",
        }}
      >
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem
        button
        onClick={() => handleMenuItemClick("About")}
        sx={{
          cursor: "pointer",
        }}
      >
        <ListItemText primary="About" />
      </ListItem>
      <ListItem
        button
        onClick={() => handleMenuItemClick("Services")}
        sx={{
          cursor: "pointer",
        }}
      >
        <ListItemText primary="Services" />
      </ListItem>
      <ListItem
        button
        onClick={() => handleMenuItemClick("Contact")}
        sx={{
          cursor: "pointer",
        }}
      >
        <ListItemText primary="Contact" />
      </ListItem>
      <ListItem
        button
        onClick={() => handleMenuItemClick("guestBlog")}
        sx={{
          cursor: "pointer",
        }}
      >
        <ListItemText primary="Blog" />
      </ListItem>
      <ListItem
        button
        onClick={handleOpenLoginModal}
        className={isActive("/signin")}
        sx={{
          cursor: "pointer",
        }}
      >
        <ListItemText primary="Signin/Signup" />
      </ListItem>
    </List>
  );

  return (
    <>
      <header className="flex justify-between items-center py-4 px-6 bg-white shadow-md w-full sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="" className="w-40" />{" "}
        </div>
        <nav className="flex space-x-6 text-gray-600 ">
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                variant="temporary"
                sx={{
                  width: 240,
                  flexShrink: 0,
                  "& .MuiDrawer-paper": {
                    width: 240,
                    boxSizing: "border-box",
                  },
                }}
              >
                {drawerContent}
              </Drawer>
            </>
          ) : (
            <div className="cursor-pointer flex-row flex items-center gap-10 px-10">
              <div
                className={` hover:text-[#68B2A0]`}
                onClick={() => handleMenuItemClick("Home")}
              >
                Home
              </div>
              <div
                className={` hover:text-[#68B2A0]`}
                onClick={() => handleMenuItemClick("About")}
              >
                About
              </div>
              <div
                className={`  hover:text-[#68B2A0]`}
                onClick={() => handleMenuItemClick("Services")}
              >
                Services
              </div>
              <div
                className={` hover:text-[#68B2A0]`}
                onClick={() => handleMenuItemClick("Contact")}
              >
                Contact
              </div>
              <div
                className={`  hover:text-[#68B2A0]`}
                onClick={() => handleMenuItemClick("guestBlog")}
              >
                Blog
              </div>
              <div
                className={` ${isActive("/signin")} hover:text-[#68B2A0]`}
                onClick={handleOpenLoginModal}
              >
                Signin/Signup
              </div>
            </div>
          )}
        </nav>
      </header>
      <LoginModal
        open={isLoginModalOpen}
        onClose={handleCloseLoginModal}
        handleOpenRegisterModal={handleOpenRegisterModal}
      />

      <SignupModal
        open={isRegisterModalOpen}
        onClose={handleCloseRegisterModal}
        handleOpenLoginModal={handleOpenLoginModal}
      />
    </>
  );
};

export default Navbar;
