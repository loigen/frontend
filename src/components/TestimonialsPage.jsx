import React from 'react';
import { FaStar } from "react-icons/fa";

const TestimonialsPage = ({ testimonies }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F6FBFB] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C6975] mb-4">
            Client Testimonials
          </h1>
          <p className="text-xl text-gray-600 mt-11">
            Real Stories from Our Valued Clients
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {testimonies.map((testimony) => (
            <div
              key={testimony.id}
              className="bg-white rounded-lg shadow-md p-6 border-b-4 border-[#2C6975] transform transition-all duration-300 hover:shadow-xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="rounded-full h-12 w-12 flex items-center justify-center text-white bg-[#2C6975]">
                    <span className="font-bold text-lg">
                      {testimony.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-xl">{testimony.name}</h3>
                    <p className="text-gray-500 text-sm">September 25, 2024</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-[#2C6975]" />
                ))}
              </div>
              <p className="text-gray-600 text-lg">"{testimony.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage; 