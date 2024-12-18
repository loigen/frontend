import React, { useContext, useState, useEffect, useRef } from "react";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import SendIcon from "@mui/icons-material/Send";
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
import { useAuth } from "../../context/AuthProvider";

// Component to detect and render clickable links in the message
const LinkifyMessage = ({ text }) => {
  const urlPattern = /(https?:\/\/[^\s]+)/g;

  return text.split(urlPattern).map((part, index) =>
    urlPattern.test(part) ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1976d2", textDecoration: "underline" }}
      >
        {part}
      </a>
    ) : (
      part
    )
  );
};

const ChatBox = () => {
  const { user } = useAuth();
  const [error] = useState(null);
  const { currentChat, messages, isMessagesLoading, sendTextMessage } =
    useContext(ChatContext);
  const { recipientUser } = useFetchRecipient(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef();

  // Scroll to the latest message when the messages array changes
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send the message as plain text
  const handleSendMessage = () => {
    if (textMessage.trim()) {
      sendTextMessage(textMessage, user, currentChat._id, setTextMessage);
      setTextMessage("");
    }
  };

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    );
  }

  if (!currentChat) {
    return (
      <Typography color="#2C6975" align="center">
        No Conversation Selected
      </Typography>
    );
  }

  if (!recipientUser) {
    return (
      <Typography color="#2C6975" align="center">
        Loading recipient information...
      </Typography>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100%"
      bgcolor="#E9F1EF"
      borderRadius={1}
      boxShadow={3}
    >
      {/* Topbar */}
      <AppBar
        sx={{
          position: "static",
          backgroundColor: "#68B2A0",
        }}
      >
        <Toolbar>
          <Avatar
            src={recipientUser?.profilePicture}
            alt={`${recipientUser?.firstname} ${recipientUser?.lastname}'s profile`}
            sx={{ mr: 2 }}
          />
          <Typography variant="h6">
            {recipientUser?.firstname} {recipientUser?.lastname}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Messages Area */}
      <Box
        flex={1}
        overflow="auto"
        p={2}
        sx={{ maxHeight: "calc(100vh - 200px)" }}
      >
        {isMessagesLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <CircularProgress />
          </Box>
        ) : messages && messages.length > 0 ? (
          messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message?.senderId === user?._id ? "flex-end" : "flex-start"
              }
              mb={1}
              ref={scroll}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  maxWidth: "75%",
                  bgcolor:
                    message?.senderId === user?._id
                      ? "#68B2A0"
                      : "background.paper",
                  color:
                    message?.senderId === user?._id ? "white" : "text.primary",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    overflowWrap: "break-word",
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                    width: "100%",
                  }}
                >
                  <LinkifyMessage text={message.text} />
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{
                    mt: 1,
                    overflowWrap: "break-word",
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                    width: "100%",
                  }}
                >
                  {moment(message.createdAt).calendar()}
                </Typography>
              </Paper>
            </Box>
          ))
        ) : (
          <Typography color="#2C6975" align="center">
            You haven't sent a message to{" "}
            <strong>
              {recipientUser?.firstname} {recipientUser?.lastname}
            </strong>
            . Say hi!
          </Typography>
        )}
      </Box>

      <Box
        component="form"
        display="flex"
        alignItems="center"
        justifyContent="center"
        p={2}
        borderTop={1}
        borderColor="rgba(44, 105, 117)"
        bgcolor="#E9F1EF"
        sx={{ width: "100%" }}
      >
        <div className="w-[95%] flex bg-[#E9F1EF]">
          <InputEmoji
            value={textMessage}
            onChange={setTextMessage}
            fontFamily="Nunito, sans-serif"
            borderColor="rgba(44, 105, 117)"
            placeholder="Type a message..."
            bgcolor="#E9F1EF" // This is for the overall component
            className="flex-1 border-none focus:ring-0 outline-none bg-[#E9F1EF] text-[#2C6975] placeholder-[#2C6975]"
          />

          <IconButton
            color="primary"
            onClick={handleSendMessage}
            aria-label="Send message"
          >
            <SendIcon
              sx={{
                color: "#2C6975",
              }}
            />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default ChatBox;
