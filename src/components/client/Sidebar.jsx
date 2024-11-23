import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  useMediaQuery,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MenuIcon from "@mui/icons-material/Menu";
import BookIcon from "@mui/icons-material/Book";
import SettingsIcon from "@mui/icons-material/Settings";
import { styled, useTheme } from "@mui/material/styles";
import logo from "../../images/safeplacelogo.png";
import biglogo from "../../images/bigLogo.png";

const drawerWidth = 240;

// Styled IconButton for hover effect
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "rgba(44, 105, 117, 0.13)", // Background color on hover
  },
}));

const MiniDrawer = styled(Drawer)(({ theme, open }) => ({
  width: open ? drawerWidth : 72,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  "& .MuiDrawer-paper": {
    width: open ? drawerWidth : 72,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    border: "none", // Remove the border
    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)", // Add drop shadow
    padding: open ? "16px" : "1px", // No padding when collapsed
  },
}));

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    {
      text: "Appointments",
      icon: <CalendarTodayIcon />,
      link: "/Booking",
    },
    {
      text: "Blog",
      icon: <BookIcon />,
      link: "/MR_JEB_BLOG",
    },
    {
      text: "Settings",
      icon: <SettingsIcon />,
      link: "/clientSettings",
    },
  ];

  return (
    <>
      {isMobile && (
        <StyledIconButton onClick={toggleDrawer}>
          <MenuIcon
            sx={{
              color: "#2C6975", // Custom color
              fontSize: "24px", // Optional: adjust size
            }}
          />
        </StyledIconButton>
      )}

      <MiniDrawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
      >
        <div className="flex items-center flex-col justify-between p-4">
          <Box sx={{ width: "100%" }} display="flex" justifyContent="end">
            <StyledIconButton
              onClick={toggleDrawer}
              sx={{
                position: open ? "absolute" : "relative",
                top: open ? "9px" : "0",
                right: open ? "9px" : "50%",
                transform: open ? "none" : "translateX(50%)", // Centering when closed
              }}
            >
              <MenuIcon
                sx={{
                  color: "#2C6975", // Custom color
                  fontSize: "32px", // Optional: adjust size
                }}
              />
            </StyledIconButton>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{
              width: "100%",
              marginTop: "10px",
              transition: "all 0.3s ease", // Smooth transition for resizing
            }}
          >
            {open ? (
              <img
                src={logo}
                alt="safeplace"
                style={{
                  width: "120px", // Fixed width when sidebar is expanded
                  height: "auto",
                  transition: "width 0.3s ease", // Smooth transition for resizing
                }}
              />
            ) : (
              <img
                src={logo}
                alt="safeplace"
                style={{
                  width: "100px", // Fixed width when sidebar is collapsed
                  height: "auto",
                  transition: "width 0.3s ease", // Smooth transition for resizing
                }}
              />
            )}
          </Box>
        </div>

        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px", // 3px gap between each link
            overflow: "hidden",
          }}
        >
          {menuItems.map((item) => (
            <ListItem
              button
              component={NavLink}
              to={item.link}
              key={item.text}
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: "1rem",
                borderLeft:
                  location.pathname === item.link
                    ? "3px solid #68B2A0" // Border color for active link
                    : "none",
                borderRadius: "8px", // Rounded corners
                backgroundColor:
                  location.pathname === item.link
                    ? "#2C6975" // Background color for active link
                    : "transparent",
                color: location.pathname === item.link ? "white" : "#2C6975", // Default text color
                transition: "background-color 0.3s ease, color 0.3s ease", // Smooth transition for background and text color
                "&:hover": {
                  backgroundColor: "#2C6975", // Background color on hover
                  color: "white", // Text color on hover
                  "& .MuiListItemIcon-root": {
                    color: "white", // Change icon color to white on hover
                  },
                },
              }}
              onClick={isMobile ? toggleDrawer : null}
            >
              <ListItemIcon
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  minWidth: open ? "auto" : 56,
                  color: location.pathname === item.link ? "white" : "#2C6975",
                }}
              >
                {item.icon}
              </ListItemIcon>

              {open && <p className="w-full">{item.text}</p>}
            </ListItem>
          ))}
        </List>
      </MiniDrawer>
    </>
  );
};

export default Sidebar;
