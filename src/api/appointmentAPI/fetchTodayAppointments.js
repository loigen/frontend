import axios from "axios";
import Swal from "sweetalert2";

//get today's appointments

export const fetchTodaysAppointments = async () => {
  try {
    const response = await axios.get(
      `https://backend-vp67.onrender.com/Appointments/api/today`
    );
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "There was an error fetching Today's appointments. Please try again later.",
    });
    throw error;
  }
};
