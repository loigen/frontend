import Swal from "sweetalert2";
import axios from "axios";

//magkuhag available slots
export const fetchAvailableSlots = async () => {
  try {
    const response = await axios.get(
      `https://backend-vp67.onrender.com/schedules/slots`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to load available slots.",
    });
    console.error("Error fetching available slots:", error);
    throw error;
  }
};
