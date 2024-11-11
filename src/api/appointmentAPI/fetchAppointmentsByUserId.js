import axios from "axios";
const API_URL = "https://backend-vp67.onrender.com";

//get all appointments based on user's ID
export const fetchAppointmentsByUserId = async (userId) => {
  try {
    const response = await axios.get(
      `${API_URL}/Appointments/api/myAppointment/${userId}`
    );
    return response.data.appointments;
  } catch (error) {
    throw error;
  }
};
