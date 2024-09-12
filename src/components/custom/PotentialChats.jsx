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
    <div className="flex overflow-x-auto space-x-4 p-4">
      {potentialChats &&
        potentialChats.map((u, index) => (
          <Tooltip title={u.firstname} key={index}>
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
                  className="w-12 h-12 md:w-16 md:h-16 border-2 border-[#2c6975] rounded-full shadow-2xl"
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
    </div>
  );
};

export default PotentialChats;
