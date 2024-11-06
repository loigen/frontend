import axios from "axios";
import Swal from "sweetalert2";

//get the rate of completion
export const fetchCompletionRate = async () => {
  try {
    const response = await axios.get(
      `https://backend-vp67.onrender.com/Appointments/api/completion-rate`
    );
    return response.data.completionRate;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "There was an error fetching the completion rate. Please try again later.",
    });
    throw error;
  }
};
