import Swal from "sweetalert2";
import axios from "axios";

//get daily cancelled appointments
export const fetchDailyCancelAppointments = async () => {
  try {
    const response = await axios.get(
      `https://backend-vp67.onrender.com/Appointments/api/dailyCancel`
    );
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "There was an error fetching daily canceled appointments. Please try again later.",
    });
    throw error;
  }
};
