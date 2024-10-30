import React, { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import LoadingSpinner from "./LoadingSpinner";
import { Tooltip, TextField } from "@mui/material";
import { useAuth } from "../../context/AuthProvider"; // Import useAuth

const PotentialChats = () => {
  const { user: authUser, loading: authLoading, error: authError } = useAuth(); // Access auth context
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter potentialChats based on the search term
  const filteredChats = potentialChats.filter((u) =>
    u.firstname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (authLoading) {
    return <LoadingSpinner />;
  }

  if (authError) {
    return (
      <div className="text-red-500 font-bold text-center">{authError}</div>
    );
  }

  if (error) {
    return <div className="text-red-500 font-bold text-center">{error}</div>;
  }

  return (
    <div className="p-4 bg-[#FFFFFF]">
      {/* Search Bar */}
      <TextField
        variant="outlined"
        placeholder="Search for users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        sx={{
          borderRadius: 10,
          mb: 2,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#68B2A0", // Set border color
            },
            "&:hover fieldset": {
              borderColor: "#2C6975", // Change border color on hover
            },
          },
        }}
      />

      <div
        className="flex overflow-x-auto space-x-4"
        style={{
          maxHeight: "400px",
          scrollbarWidth: "thin", // For Firefox
          scrollbarColor: "#68B2A0 #F0F0F0", // For Firefox
        }}
      >
        {filteredChats.length > 0 ? (
          filteredChats.map((u, index) => (
            <Tooltip
              title={u.firstname}
              key={index}
              arrow
              sx={{
                color: "#2C6975",
              }}
              PopperProps={{
                modifiers: [
                  {
                    name: "arrow",
                    options: {
                      padding: 5, // optional padding for the arrow
                    },
                  },
                ],
              }}
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: "#68B2A0", // Set the background color
                    color: "#fff", // Set the text color to white
                  },
                },
                arrow: {
                  sx: {
                    color: "#68B2A0", // Set the arrow color
                  },
                },
              }}
            >
              <div
                className="single-user flex flex-col items-center flex-shrink-0"
                onClick={() => {
                  if (authUser) {
                    createChat(authUser._id, u._id); // Use authenticated user to create chat
                  } else {
                    setError("You must be logged in to start a chat.");
                  }
                }}
              >
                <div className="relative">
                  <img
                    src={u.profilePicture}
                    className="w-10 h-10 md:w-10 md:h-10 border-2 border-[#2c6975] rounded-full shadow-2xl"
                    alt={`${u.name}'s profile`}
                  />
                  {onlineUsers?.some(
                    (onlineUser) => onlineUser?.userId === u?._id
                  ) && (
                    <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <span className="mt-2 text-sm font-medium text-gray-700 text-center">
                  {u.name}
                </span>
              </div>
            </Tooltip>
          ))
        ) : (
          <div className="text-gray-500 font-medium">No users found</div>
        )}
        <style jsx>{`
          /* Custom Scrollbar Styles */
          .flex::-webkit-scrollbar {
            height: 8px; /* Set the height of the scrollbar */
          }

          .flex::-webkit-scrollbar-track {
            background: #f0f0f0; /* Track color */
          }

          .flex::-webkit-scrollbar-thumb {
            background-color: #68b2a0; /* Thumb color */
            border-radius: 10px; /* Rounded corners */
          }

          .flex::-webkit-scrollbar-thumb:hover {
            background-color: #1f4d4f; /* Darker thumb on hover */
          }
        `}</style>
      </div>
    </div>
  );
};

export default PotentialChats;
