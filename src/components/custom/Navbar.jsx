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
import logo from "../../images/fullLogo.png";
import SignupModal from "../Signup";
import LoginModal from "../Login";

const Navbar = ({ setView }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isActive, setIsActive] = useState("Home");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuItemClick = (route) => {
    setView(route);
    setIsActive(route);
    if (isMobile) setDrawerOpen(false); // Close drawer on mobile after selection
  };

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

  const drawerContent = (
    <List>
      {["Home", "About", "Services", "Contact", "Blog"].map((item) => (
        <ListItem
          button
          key={item}
          onClick={() => handleMenuItemClick(item)}
          sx={{
            cursor: "pointer",
            borderBottom: isActive === item ? "4px solid #2c6975" : "none",
          }}
        >
          <ListItemText primary={item} />
        </ListItem>
      ))}
      <ListItem button onClick={handleOpenLoginModal}>
        <ListItemText primary="Signin/Signup" />
      </ListItem>
    </List>
  );

  return (
    <>
      <header className="flex justify-between items-center py-4 px-6 bg-white shadow-md w-full sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-40" />
        </div>
        <nav className="flex space-x-6 text-gray-600">
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleDrawerToggle}
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
            <div className="cursor-pointer flex items-center gap-10 px-10">
              {["Home", "About", "Services", "Contact", "Blog"].map((item) => (
                <div
                  key={item}
                  className="navlinks"
                  onClick={() => handleMenuItemClick(item)}
                  style={{
                    borderBottom:
                      isActive === item ? "4px solid #2c6975" : "none",
                    paddingBottom: "4px",
                  }}
                >
                  {item}
                </div>
              ))}
              <div
                className="navlinks"
                onClick={handleOpenLoginModal}
                style={{
                  borderBottom:
                    isActive === "Signin/Signup" ? "2px solid #007BFF" : "none",
                  paddingBottom: "4px",
                }}
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
