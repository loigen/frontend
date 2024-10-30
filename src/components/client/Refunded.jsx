import React, { useState, useEffect } from "react";
import { fetchAppointmentsByUserId } from "../../api/appointmentAPI/fetchAppointmentsByUserId";
import { useAuth } from "../../context/AuthProvider";
import sadface from "../../images/sadface.png";
import { LoadingSpinner } from "../custom";

const RefundedAppointments = ({ onBackToActive }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const getAppointments = async () => {
      if (!user) return;
      try {
        const data = await fetchAppointmentsByUserId(user._id);
        const filteredAppointments = data.filter((appointment) => {
          return appointment.status === "refunded"; // Fetch only refunded appointments
        });
        setAppointments(filteredAppointments);
      } catch (err) {
        setError("Error fetching refunded appointments.");
      } finally {
        setLoading(false);
      }
    };

    getAppointments();
  }, [user]);

  if (loading) return <div><LoadingSpinner/></div>;
  if (error)
    return (
      <>
        <div className="min-h-screen p-8 bg-gray-50 mr-5 ml-5 mb-5 rounded-lg shadow-lg overflow-x-auto">
          <div className="">
            <div className="mb-6">
              <button
                className="text-[#2C6975] flex items-center"
                onClick={onBackToActive}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                BACK
              </button>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-[#2C6975] mb-8">
              Refunded Appointments
            </h2>
            <table className="min-w-full bg-white shadow-lg rounded-lg">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Type of Service</th>
                  <th className="p-4 font-semibold">Consultation Method</th>
                  <th className="p-4 font-semibold">Receipt</th>
                  <th className="p-4"></th>
                </tr>
                <tbody>
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center p-4 text-gray-500"
                    ></td>
                  </tr>
                </tbody>
              </thead>
            </table>
          </div>
          <div className="flex flex-col items-center">
            <div>
              <p className="text-gray-500 mt-5">
                No refunded appointments found. You can go back to view active
                appointments.
              </p>
              <img src={sadface} alt="sadface" />
            </div>
          </div>
        </div>
      </>
    );

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      {/* Back Button */}
      <div className="mb-6">
        <button
          className="text-[#2C6975] flex items-center"
          onClick={onBackToActive}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          BACK
        </button>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-[#2C6975] mb-8">
        Refunded Appointments
      </h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Type of Service</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No refunded appointments found.
                </td>
              </tr>
            ) : (
              appointments.map((appointment) => (
                <tr key={appointment._id} className="border-b">
                  <td className="p-4">
                    {new Date(appointment.date).toLocaleDateString()}
                  </td>
                  <td className="p-4">{appointment.appointmentType}</td>
                  <td className="p-4">
                    <span className="p-1 text-slate-50 rounded bg-green-500">
                      {appointment.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {appointment.refundReceipt && (
                      <button className="bg-[#2C6975] text-white py-1 px-3 font-bold rounded-md">
                        Show Receipt
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RefundedAppointments;
