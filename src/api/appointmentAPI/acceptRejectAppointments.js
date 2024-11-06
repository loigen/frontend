import axios from "axios";
import Swal from "sweetalert2";
const API_URL = "https://backend-vp67.onrender.com";

export const acceptAppointment = async (id) => {
  try {
    await axios.patch(`${API_URL}/Appointments/api/accept/${id}`);
    Swal.fire("Success", "Appointment accepted successfully", "success");
  } catch (error) {
    console.error("Error accepting appointment:", error);
    Swal.fire("Error", "Failed to accept the appointment", "error");
    throw error;
  }
};

export const rejectAppointment = async (id) => {
  try {
    await axiosInstance.patch(`${API_URL}/Appointments/api/reject/${id}`);
    Swal.fire("Success", "Appointment rejected successfully", "success");
  } catch (error) {
    console.error("Error rejecting appointment:", error);
    Swal.fire("Error", "Failed to reject the appointment", "error");
    throw error;
  }
};

export const cancelAppointment = async (id) => {
  try {
    await axiosInstance.patch(`${API_URL}/Appointments/api/cancel/${id}`);
    Swal.fire("Success", "Appointment canceled successfully", "success");
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    Swal.fire("Error", "Failed to cancel the appointment", "error");
    throw error;
  }
};
