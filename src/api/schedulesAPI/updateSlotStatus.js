import axios from "axios";
import Swal from "sweetalert2";

//update the status if ma trigger
export const updateSlotStatus = async (slotId, status) => {
  try {
    const response = await axios.patch(
      `https://backend-vp67.onrender.com/schedules/slots/${slotId}`,
      { status },
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to update slot status.",
    });
    console.error("Error updating slot status:", error);
    throw error;
  }
};
