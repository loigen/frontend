import React, { useContext, useState, useEffect } from "react";
import { ChatContext } from "../../context/ChatContext";
import { LoadingSpinner, PotentialChats, ChatBox, UserChat } from "./index";
import { Topbar } from "../custom";
import { AuthContext } from "../../context/AuthProvider";
import SearchBar from "./SearchBar";
import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  CircularProgress,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const [currentChat, setCurrentChat] = useState(null);

  const { userChats, isUserChatsLoading, userChatsError, updateCurrentChat } =
    useContext(ChatContext);

  if (isUserChatsLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (userChatsError) {
    return (
      <div className="text-red-500 text-center p-4">
        Error: {userChatsError.message}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#E9F1EF]">
      <Topbar />
      <div className="flex flex-1 overflow-hidden p-4 ">
        <div className="flex flex-col lg:flex-row w-full h-full gap-2">
          <div
            className="lg:w-1/3 bg-[#FFFFFF] p-4 rounded-lg shadow-lg overflow-y-auto gap-7"
            style={{
              overflowY: "scroll", // Enable vertical scrolling
              scrollbarWidth: "none", // For Firefox to hide scrollbar
            }}
          >
            <div className="sticky top-0 bg-[#FFFFFF] z-10">
              {" "}
              {/* Sticky Header */}
              <SearchBar />
              <PotentialChats />
            </div>
            {userChats?.length > 0 ? (
              <div className="flex flex-col gap-2 mt-4 h-24">
                {userChats.map((chat, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setCurrentChat(chat);
                      updateCurrentChat(chat);
                    }}
                    className="cursor-pointer p-2 border hover:bg-[rgba(104,178,160,0.13)] rounded transition-colors"
                  >
                    <UserChat chat={chat} user={user} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-1/2 text-[#2C6975]">
                No Recent Chats
              </div>
            )}
          </div>
          <div className="lg:w-2/3 flex-1 bg-white rounded-lg shadow-lg flex flex-col overflow-hidden">
            {currentChat ? (
              <ChatBox chat={currentChat} />
            ) : (
              <div className=" flex flex-col items-center  bg-[#E9F1EF] h-full">
                {/* Topbar */}
                <AppBar
                  sx={{
                    position: "static",
                    backgroundColor: "#68B2A0",
                  }}
                >
                  <Toolbar>
                    <Typography variant="h6">
                    </Typography>
                  </Toolbar>
                </AppBar>
                <p className="text-[#2C6975] top-60 relative">
                  Select a chat to start sending messages...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
