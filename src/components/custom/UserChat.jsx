import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import useFetchLatestMessage from "../../hooks/useFetchLatestMessage";
import moment from "moment";
import { deleteChat } from "../../api/chatApi/deleteChat";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipient(chat, user);
  const { onlineUsers, notifications, markThisUserNotificationsAsRead } =
    useContext(ChatContext);

  const { latestMessage } = useFetchLatestMessage(chat);
  const unreadNotifications = unreadNotificationsFunc(notifications);
  const thisUserNotifications = unreadNotifications?.filter(
    (n) => n.senderId === recipientUser?._id
  );

  if (!recipientUser) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  const isOnline = onlineUsers?.some(
    (user) => user?.userId === recipientUser?._id
  );

  const truncateText = (text) => {
    if (!text) return "";

    let shortText = text.substring(0, 20);

    if (text.length > 20) {
      shortText = shortText + "...";
    }
    return shortText;
  };

  const handleDelete = async () => {
    try {
      await deleteChat(chat._id);
      console.log("Chat deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

  const confirmDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
        Swal.fire("Deleted!", "The chat has been deleted.", "success");
      }
    });
  };

  return (
    <div
      className="flex items-center justify-between p-4 hover:bg-[#E9F1EF] cursor-pointer transition-colors rounded-lg"
      role="button"
      onClick={() => {
        if (thisUserNotifications?.length > 0) {
          markThisUserNotificationsAsRead(thisUserNotifications, notifications);
        }
      }}
    >
      <div className="flex items-center">
        {recipientUser.profilePicture && (
          <img
            src={recipientUser.profilePicture}
            className="w-10 h-10 rounded-full mr-3 border-2 border-[#2c6975]"
            alt={`${recipientUser.firstname}'s profile`}
          />
        )}
        <div className="relative">
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-base font-semibold text-gray-800 capitalize">
            {recipientUser.firstname} {""} {recipientUser.lastname}
          </span>
          {latestMessage?.text && (
            <span className="text-sm text-gray-600">
              {truncateText(latestMessage.text)}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-xs text-gray-500">
          {latestMessage?.createdAt
            ? moment(latestMessage.createdAt).calendar()
            : "No chat history"}
        </span>
        {thisUserNotifications?.length > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {thisUserNotifications.length}
          </span>
        )}
        <button
          className="ml-4 text-[#D0A9A7] hover:text-[#9D5E5A]"
          onClick={(e) => {
            e.stopPropagation();
            confirmDelete();
          }}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default UserChat;
