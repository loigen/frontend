import axios from "axios";
import Swal from "sweetalert2";

export const fetchCancellationRate = async () => {
  try {
    const response = await axios.get(
      `https://backend-production-c8da.up.railway.app/Appointments/api/cancellation-rate`
    );
    return response.data.cancellationRate;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "There was an error fetching the cancellation rate. Please try again later.",
    });
    throw error;
  }
};
