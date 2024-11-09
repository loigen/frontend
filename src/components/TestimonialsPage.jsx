import { ChevronLeft } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import React from "react";
import { FaStar } from "react-icons/fa";

const TestimonialsPage = ({ testimonies, setView }) => {
  return (
    <div className="min-h-screen md:mt-[5%] mt-[20%] bg-gradient-to-b from-white to-[#F6FBFB] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C6975] mb-4 relative">
            <Tooltip title="Back to Home" arrow>
              <button onClick={setView} className="absolute left-0">
                <ChevronLeft />
              </button>
            </Tooltip>
            Client Testimonials
          </h1>
          <p className="text-xl text-gray-600 mt-11">
            Real Stories from Our Valued Clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {testimonies.map((testimony) => (
            <div
              key={testimony._id} // Using MongoDB _id as key
              className="bg-white rounded-lg shadow-md p-6 border-b-4 border-[#2C6975] transform transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="rounded-full h-12 w-12 flex items-center justify-center text-white bg-[#2C6975]">
                    <span className="font-bold text-lg">
                      {testimony.displayName ? testimony.email.charAt(0) : "A"}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-xl">
                      {testimony.displayName ? testimony.email : "Anonymous"}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {new Date(testimony.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < testimony.rating ? "text-[#2C6975]" : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <p className="text-gray-600 text-lg">"{testimony.feedback}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;
