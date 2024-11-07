import axios from "axios";
import Swal from "sweetalert2";

export const reqRescheduleAppointment = async (
  appointmentId,
  newDate,
  newTime
) => {
  try {
    const response = await axios.put(
      `http://localhost:5000/Appointments/api/${appointmentId}/reqReschedule`,
      {
        newDate,
        newTime,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Show success notification
    Swal.fire({
      icon: "success",
      title: "Reschedule Requested",
      text: "Your reschedule request has been submitted successfully.",
      confirmButtonColor: "#2c6975",
    });

    return response.data;
  } catch (error) {
    console.error("Error requesting reschedule appointment:", error);

    // Show error notification
    Swal.fire({
      icon: "error",
      title: "Reschedule Failed",
      text:
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Failed to request reschedule appointment.",
      confirmButtonColor: "#2c6975",
    });

    throw new Error(
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : "Failed to request reschedule appointment."
    );
  }
};
