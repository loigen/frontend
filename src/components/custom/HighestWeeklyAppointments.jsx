import React from "react";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import useHighestWeeklyAppointments from "../../api/appointmentAPI/useHighestWeeklyAppointments";
import { LoadingSpinner } from "./index";

const HighestWeeklyAppointments = () => {
  // Properly call the hook
  const { data, loading, error } = useHighestWeeklyAppointments();

  if (loading) return <LoadingSpinner />;

  if (error) return <p>Error loading data: {error.message}</p>;

  if (!data || !data.count) {
    return (
      <div className="w-full max-w-[333px] h-[119px]  p-4 rounded-lg flex items-center justify-center">
        <div className="relative w-16 h-16 rounded overflow-hidden">
          <MedicalServicesIcon
            sx={{
              color: "#2C6975",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "45px",
              backgroundColor: "rgba(164, 205, 195, 0.27)",
              padding: "4px",
              borderRadius: "3px",
            }}
          />
        </div>
        <div className="flex flex-col items-start justify-center ml-4">
          <p className="flex items-center justify-center h-full w-fit text-left text-1xl font-poppins">
            No data
          </p>
          <p className="text-sm capitalize font-poppins">Weekly Appointment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-2  flex justify-center items-center">
      <div className="flex flex-row gap-3 justify-center  items-center w-full">
        <div className="relative w-16 h-16 rounded overflow-hidden">
          <MedicalServicesIcon
            sx={{
              color: "#2C6975",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "45px",
              backgroundColor: "rgba(164, 205, 195, 0.27)",
              padding: "4px",
              borderRadius: "3px",
            }}
          />
        </div>
        <div className="flex flex-col items-start justify-center ml-4">
          <b className="flex items-center justify-center h-full w-fit text-left text-1xl font-poppins">{data.count}</b>
          <p className="text-sm capitalize font-poppins">Weekly Appointment</p>
        </div>
      </div>
    </div>
  );
};

export default HighestWeeklyAppointments;
