import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Import the Logout icon

const LogoutButton = ({ isHovered, onClose }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // State to handle modal open/close

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Function to open the dialog
  const handleClickOpen = (event) => {
    event.stopPropagation(); // Prevent menu from closing
    setOpen(true);
  };

  // Function to close the dialog without logging out
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        className={`flex items-center cursor-pointer ${
          isHovered ? "text-[#9D5E5A]" : "text-[#2C6975]"
        }`} // Change color based on hover
        onClick={handleClickOpen} // Open modal on click
      >
        <ExitToAppIcon
          className={`${isHovered ? "text-[#9D5E5A]" : "text-[#2C6975]"} mr-2`}
        />
        <span
          className={`font-medium ${
            isHovered ? "text-[#9D5E5A]" : "text-[#2C6975]"
          }`}
        >
          Logout
        </span>
      </div>

      {/* Modal Dialog for logout confirmation */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title "
          sx={{ fontFamily: "Poppins, sans-serif" }}
        >
          {"Confirm Logout"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ fontFamily: "Poppins, sans-serif" }} // Apply Poppins font
          >
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            sx={{
              borderRadius: "50px", // Border radius
              border: "1px solid #2C6975", // Border with specified color
              padding: "7px 22px", // Padding for the button
              color: "#2C6975", // Text color to match the border color
              "&:hover": {
                backgroundColor: "rgba(44, 105, 117, 0.13)", // Background color with 13% opacity
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleLogout(); // Perform the logout
              setOpen(false); // Close the modal
            }}
            sx={{
              borderRadius: "50px", // Border radius
              padding: "7px 22px", // Padding for the button
              color: "#2C6975", // Text color to match the border color

              "&:hover": {
                backgroundColor: "rgba(157, 94, 90, 0.13)", // Background color with 13% opacity
                color: "#9D5E5A"
              },
            }}
            autoFocus
          >
            Yes, Log Me Out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LogoutButton;
