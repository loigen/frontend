import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import SettingsIcon from "@mui/icons-material/Settings";
import { ChevronLeft } from "@mui/icons-material";
import logo from "../../images/bigLogo.png";
import { styled, useTheme } from "@mui/material/styles";

const drawerWidth = 240;

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
  },
}));

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    {
      text: "Appointments",
      icon: <HomeIcon fontSize="large" />,
      link: "/Booking",
    },
    {
      text: "Blog",
      icon: <BookIcon fontSize="large" />,
      link: "/MR_JEB_BLOG",
    },
    {
      text: "Settings",
      icon: <SettingsIcon fontSize="large" />,
      link: "/clientSettings",
    },
  ];

  return (
    <>
      {isMobile && (
        <IconButton onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
      )}

      <MiniDrawer
        variant={isMobile ? "temporary" : "permanent"}
        open={open}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
      >
        <div className="flex items-center flex-col justify-between p-4">
          <img className="w-full object-cover" src={logo} alt="safeplace" />
          <Box sx={{ width: "100%" }} display="flex" justifyContent="end">
            <IconButton onClick={toggleDrawer}>
              {open ? <ChevronLeft /> : <MenuIcon />}
            </IconButton>
          </Box>
        </div>

        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
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
                    ? "4px solid #2c6975"
                    : "4px solid transparent",
                backgroundColor:
                  location.pathname === item.link
                    ? "rgba(44, 105, 117, 0.1)"
                    : "transparent",
                fontWeight: location.pathname === item.link ? "bold" : "500",
                "&:hover": {
                  backgroundColor: "rgba(44, 105, 117, 0.2)",
                },
              }}
              onClick={isMobile ? toggleDrawer : null}
            >
              <ListItemIcon
                sx={{ minWidth: open ? "auto" : 56, fontWeight: "bold" }}
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
