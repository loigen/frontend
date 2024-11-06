import Swal from "sweetalert2";
import axios from "axios";

//get yearly appointments
export const fetchDailyAppointmentsForYear = async () => {
  try {
    const response = await axios.get(
      `https://backend-vp67.onrender.com/Appointments/api/yearly`
    );
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "There was an error fetching Yearly appointments. Please try again later.",
    });
    throw error;
  }
};
