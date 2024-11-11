import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-vp67.onrender.com/Appointments/api",
});

export const markAppointmentAsCompleted = async (appointmentId) => {
  const response = await api.patch(`/complete/${appointmentId}`);
  return response.data;
};
