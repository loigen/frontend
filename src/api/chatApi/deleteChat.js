import axios from "axios";

const API_URL = "https://backend-vp67.onrender.com/api/chats";

export const deleteChat = async (chatId) => {
  try {
    const response = await axios.delete(`${API_URL}/${chatId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting chat:", error);
    throw error;
  }
};
