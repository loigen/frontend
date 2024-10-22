import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const AvailabilityCard = ({ availableSlots, totalSlots }) => {
  const data = {
    datasets: [
      {
        data: [availableSlots, totalSlots - availableSlots],
        backgroundColor: ["rgba(104, 178, 173, 0.38)", "#68B2A0"],
        hoverBackgroundColor: ["rgba(104, 178, 173, 0.80)", "#2C6975"],
      },
    ],
  };

  const options = {
    cutout: "40%",
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className=" p-4  w-full max-w-full mx-auto flex flex-col md:flex-row items-center justify-center gap-3">
      <div className="flex items-center justify-center w-full">
        <div style={{ width: "100%", height: "0", paddingBottom: "65%" }}>
          <Doughnut
            data={data}
            options={{
              ...options,
              responsive: true,
              maintainAspectRatio: false, // Allow height to be determined by width
            }}
          />
        </div>
      </div>
      <div className="w-full h-full flex flex-col gap-3 items-center justify-center ">
        <h4
          className="text-xl md:text-1xl font-bold font-poppins ml-15"
          style={{ color: "rgba(0, 0, 0, 0.78)" }}
        >
          Availability this Week
        </h4>
        <div className="text-xl md:text-2xl font-bold flex items-center gap-2 justify-around w-full md:w-3/4 lg:w-1/2">
          <div className="flex items-center">
            <span className="text-2xl md:text-4xl">{availableSlots}</span> /
            <span className="text-base md:text-xl font-normal">
              {totalSlots} slots
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCard;
