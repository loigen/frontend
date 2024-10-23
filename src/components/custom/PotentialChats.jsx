import React, { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import LoadingSpinner from "./LoadingSpinner";
import { Tooltip } from "@mui/material";
import { useAuth } from "../../context/AuthProvider"; // Import useAuth

const PotentialChats = () => {
  const { user: authUser, loading: authLoading, error: authError } = useAuth(); // Access auth context
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
  const [error, setError] = useState(null);

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
    <div
      className="flex overflow-x-auto space-x-4 p-4 bg-[#FFFFFF]"
      style={{
        maxHeight: "400px",
        scrollbarWidth: "thin", // For Firefox
        scrollbarColor: "#68B2A0 #F0F0F0", // For Firefox
      }}
    >
      {potentialChats &&
        potentialChats.map((u, index) => (
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
        ))}
      <style jsx>{`
        /* Custom Scrollbar Styles */
        .flex::-webkit-scrollbar {
          height: 8px; /* Set the height of the scrollbar */
        }

        .flex::-webkit-scrollbar-track {
          background: #F0F0F0; /* Track color */
        }

        .flex::-webkit-scrollbar-thumb {
          background-color: #68B2A0; /* Thumb color */
          border-radius: 10px; /* Rounded corners */
        }

        .flex::-webkit-scrollbar-thumb:hover {
          background-color: #1F4D4F; /* Darker thumb on hover */
        }
      `}</style>
    </div>
  );
};

export default PotentialChats;
