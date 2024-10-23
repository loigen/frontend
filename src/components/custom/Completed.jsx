
import React from 'react';

const CompletedAppointments = ({ onBackToActive }) => {
  return (
    <div className="min-h-screen p-8 bg-gray-50">
      {/* Back Button */}
      <div className="mb-6">
        <button className="text-[#2C6975] flex items-center"           onClick={onBackToActive}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          BACK
        </button>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-[#2C6975] mb-8">Completed</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Type of Service</th>
              <th className="p-4 font-semibold">Consultation Method</th>
              <th className="p-4 font-semibold">Total Payment</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-4">05-09-2024</td>
              <td className="p-4">Couple Counseling</td>
              <td className="p-4 font-semibold text-teal-600">Online</td>
              <td className="p-4">450</td>
              <td className="p-4 text-right">
                <button className="text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12h12M6 12l-3 3m3-3l-3-3" />
                  </svg>
                </button>
              </td>
            </tr>
            <tr>
              <td className="p-4">05-09-2024</td>
              <td className="p-4">Couple Counseling</td>
              <td className="p-4 font-semibold text-teal-600">Online</td>
              <td className="p-4">450</td>
              <td className="p-4 text-right">
                <button className="text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12h12M6 12l-3 3m3-3l-3-3" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedAppointments;
