import React, { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import moment from "moment";
import {
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Badge,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Tooltip,
  Link,
  Skeleton,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

const Notification = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const {
    notifications,
    userChats,
    allUsers,
    markAllNotificationAsRead,
    markNotificationAsRead,
    updateCurrentChat,
  } = useContext(ChatContext);
  const unreadNotifications = unreadNotificationsFunc(notifications);
  const modifiedNotifications = notifications.map((n) => {
    const sender = allUsers.find((user) => user._id === n.senderId);
    return {
      ...n,
      senderName: sender?.firstname,
    };
  });

  if (!user) {
    return (
      <Typography color="textSecondary">
        <Skeleton />
      </Typography>
    );
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  const handleNotificationClick = (n) => {
    const desiredChat = userChats.find((chat) => {
      const chatMembers = [user._id, n.senderId];
      return chat?.members.every((member) => chatMembers.includes(member));
    });

    if (desiredChat) {
      updateCurrentChat(desiredChat);
    }

    markNotificationAsRead(n, userChats, user, notifications);
    handleMenuClose();
  };

  return (
    <div>
      <Tooltip title="Messages">
        <IconButton
          color="primary"
          onClick={handleMenuOpen}
          aria-controls={isOpen ? "notification-menu" : undefined}
          aria-haspopup="true"
        >
          <Badge badgeContent={unreadNotifications?.length || 0} color="error">
            <ChatBubbleOutlineIcon className="text-[#2c6975]" />
          </Badge>
        </IconButton>
      </Tooltip>

      <Menu
        id="notification-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{ sx: { maxHeight: 400, width: 360 } }}
      >
        <MenuItem onClick={() => markAllNotificationAsRead(notifications)}>
          <Typography variant="body2" color="textSecondary">
            Mark all as read
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem component={Link} href="/messenger" onClick={handleMenuClose}>
          <Typography variant="body2" color="primary">
            Go to messenger
          </Typography>
        </MenuItem>
        {modifiedNotifications.length === 0 ? (
          <MenuItem>
            <Typography variant="body2" color="textSecondary">
              No notifications
            </Typography>
          </MenuItem>
        ) : (
          <List>
            {modifiedNotifications.map((n, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleNotificationClick(n)}
              >
                <Avatar
                  src={
                    allUsers.find((user) => user._id === n.senderId)
                      ?.profilePicture
                  }
                  alt={n.senderName}
                />
                <ListItemText
                  primary={`${n.senderName} sent you a new message`}
                  secondary={moment(n.date).calendar()}
                />
              </ListItem>
            ))}
          </List>
        )}
      </Menu>
    </div>
  );
};

export default Notification;
