import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-production-c8da.up.railway.app/Appointments/api",
});

export const markAppointmentAsCompleted = async (appointmentId) => {
  const response = await api.patch(`/complete/${appointmentId}`);
  return response.data;
};
