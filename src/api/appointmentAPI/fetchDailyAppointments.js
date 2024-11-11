import Swal from "sweetalert2";
import axios from "axios";

//get the daily appointments number
export const fetchDailyAppointments = async () => {
  try {
    const response = await axios.get(
      `https://backend-vp67.onrender.com/Appointments/api/daily`
    );
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "There was an error fetching daily appointments. Please try again later.",
    });
    throw error;
  }
};
