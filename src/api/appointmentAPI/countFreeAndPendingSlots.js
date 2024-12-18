import Swal from "sweetalert2";
import axios from "axios";

const API_BASE_URL = `https://backend-vp67.onrender.com`;

// Count free slots
export const countFreeSlots = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/schedules/count-free`);
    return response.data.count;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "There was an error counting free slots. Please try again later.",
    });
    throw error;
  }
};

// Count pending slots
export const countPendingSlots = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/schedules/count-pending`);
    return response.data.count;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "There was an error counting pending slots. Please try again later.",
    });
    throw error;
  }
};
