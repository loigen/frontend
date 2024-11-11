import axios from "axios";
import Swal from "sweetalert2";
const API_URL = "https://backend-vp67.onrender.com";

export const createAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(
      `${API_URL}/Appointments/api/appointments`,
      appointmentData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    console.error(
      "Error creating appointment:",
      error.response?.data || error.message
    );
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to create appointment.",
    });
    throw error;
  }
};
