import axios from "axios";

//get all appointments based on user's ID
export const fetchAppointmentsByUserId = async (userId) => {
  try {
    const response = await axios.get(
      `https://backend-production-c8da.up.railway.app/Appointments/api/myAppointment/${userId}`
    );
    return response.data.appointments;
  } catch (error) {
    throw error;
  }
};
