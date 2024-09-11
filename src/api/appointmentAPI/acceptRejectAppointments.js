import axios from "axios";
import Swal from "sweetalert2";

export const acceptAppointment = async (id) => {
  try {
    await axios.patch(
      `https://backend-production-c8da.up.railway.app/Appointments/api/accept/${id}`
    );
    Swal.fire("Success", "Appointment accepted successfully", "success");
  } catch (error) {
    console.error("Error accepting appointment:", error);
    Swal.fire("Error", "Failed to accept the appointment", "error");
    throw error;
  }
};

export const rejectAppointment = async (id) => {
  try {
    await axiosInstance.patch(
      `https://backend-production-c8da.up.railway.app/Appointments/api/reject/${id}`
    );
    Swal.fire("Success", "Appointment rejected successfully", "success");
  } catch (error) {
    console.error("Error rejecting appointment:", error);
    Swal.fire("Error", "Failed to reject the appointment", "error");
    throw error;
  }
};
