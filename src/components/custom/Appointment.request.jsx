import React, { useState, useEffect, createElement } from "react";
import InfoIcon from "@mui/icons-material/Info";
import Swal from "sweetalert2";
import { LoadingSpinner, MeetLinkModal } from "./index";
import emailjs, { send } from "emailjs-com";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import "../../styles/Rejectpopup.css";
import MeetPlaceModal from "./meetPlaceModal";
import { Close } from "@mui/icons-material";
import { Skeleton } from "@mui/material";

const AppointmentRequest = () => {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointmentToAccept, setAppointmentToAccept] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMeetLinkOpen, setIsMeetLinkOpen] = useState(false);

  const handleShowDetails = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCloseDetails = () => {
    setSelectedAppointment(null);
  };

  const handleAccept = (appointment) => {
    setAppointmentToAccept(appointment);
    if (appointment.consultationMethod === "face-to-face") {
      setIsMeetLinkOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleReject = async (id, date, time) => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "No, cancel!",
      customClass: {
        confirmButton: "btn-confirm", // Your custom class for the confirm button
        cancelButton: "btn-cancel", // Your custom class for the cancel button
        popup: "custom-swal-popup", // Your custom class for the popup
        title: "custom-swal-title", // Custom class for the title
        icon: "custom-swal-icon", // Custom class for the icon
        content: "custom-swal-content", // Custom class for the content
      },
      buttonsStyling: false, // Set to false to apply custom styles
      reverseButtons: true, // Puts cancel button on the left
    });

    if (confirmation.isConfirmed) {
      try {
        await axios.patch(
          `https://backend-production-c8da.up.railway.app/Appointments/api/reject/${id}`
        );
        await axios.patch(
          `https://backend-production-c8da.up.railway.app/schedules/updateByDateTime`,
          { date, time }
        );

        setAppointments((prevAppointments) =>
          prevAppointments.filter((app) => app._id !== id)
        );

        Swal.fire({
          title: "Success",
          text: "Successfully declined!",
          icon: "success",
          confirmButtonText: "Close",
          customClass: {
            confirmButton: "btn-success", // Custom success button styling
          },
          buttonsStyling: false, // Apply your custom styles
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to reject the appointment.",
          icon: "error",
          confirmButtonText: "Okay",
          customClass: {
            confirmButton: "btn-error", // Custom error button styling
          },
          buttonsStyling: false,
        });
      }
    }
  };

  const sendEmailNotification = async (appointment) => {
    try {
      const response = await emailjs.send(
        "service_j8to979",
        "template_ipb5cz3",
        {
          to_email: appointment.email,
          meet_link: appointment.meetLink,
          date: appointment.date,
          time: appointment.time,
          appointment_type: appointment.appointmentType,
        },
        "rJ5kPXerBg9bonHix"
      );
      console.log(appointment.email);
      console.log("Email sent successfully:", response);
    } catch (error) {
      console.error("Failed to send email notification:", error);
    }
  };

  const handleModalSubmit = async (meetLink) => {
    if (!meetLink) {
      Swal.fire({
        title: "Invalid Link",
        text: "Please provide a valid Google Meet link.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      return;
    }

    let validMeetLink;

    if (meetLink.startsWith("meet.google.com")) {
      validMeetLink = `https://${meetLink}`;
    } else if (meetLink.startsWith("https://meet.google.com")) {
      validMeetLink = meetLink;
    } else {
      Swal.fire({
        title: "Invalid Link",
        text: "Please provide a valid Google Meet link.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      return;
    }

    if (appointmentToAccept) {
      try {
        await axios.patch(
          `https://backend-production-c8da.up.railway.app/Appointments/api/accept/${appointmentToAccept._id}`,
          {
            meetLink: validMeetLink,
            meetPlace: "",
          }
        );
        console.log("Appointment to accept:", appointmentToAccept);
        await sendEmailNotification({
          ...appointmentToAccept,
          meetLink: validMeetLink,
        });
        setAppointments((prevAppointments) =>
          prevAppointments.filter((app) => app._id !== appointmentToAccept._id)
        );
        Swal.fire({
          title: "Success",
          text: "Appointment has been succesfully accepted!",
          icon: "Success",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to accept the appointment.",
          icon: "error",
          confirmButtonText: "Close",
        });
      } finally {
        setIsModalOpen(false);
        setAppointmentToAccept(null);
      }
    }
  };

  const handleMeetPlaceModalSubmit = async (meetPlace) => {
    if (!meetPlace.trim()) {
      Swal.fire({
        title: "Invalid Place",
        text: "Please provide a valid meet place.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      return;
    }

    if (appointmentToAccept) {
      try {
        await axios.patch(
          `https://backend-production-c8da.up.railway.app/Appointments/api/accept/${appointmentToAccept._id}`,
          {
            meetPlace: meetPlace,
            meetLink: "",
          }
        );
        console.log("Appointment to accept:", appointmentToAccept);
        await sendEmailNotification({
          ...appointmentToAccept,
          meetPlace: meetPlace,
          meetLink: "",
        });
        setAppointments((prevAppointments) =>
          prevAppointments.filter((app) => app._id !== appointmentToAccept._id)
        );
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to accept the appointment.",
          icon: "error",
          confirmButtonText: "Close",
        });
      } finally {
        setIsMeetLinkOpen(false);
        setAppointmentToAccept(null);
      }
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `https://backend-production-c8da.up.railway.app/Appointments/api/pending`
        );
        setAppointments(response.data);
      } catch (err) {
        setError("Failed to fetch pending appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    setFilteredAppointments(
      appointments.filter((appointment) =>
        `${appointment.firstname} ${appointment.lastname}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    );
  }, [appointments, searchTerm]);

  if (loading) return <Skeleton />;
  if (error) return <div>{error}</div>;

  return (
    <div className="thirdBox w-full mt-4 bg-white p-4 shadow-2xl overflow-y-scroll">
      <h2
        className="text-xl text-center uppercase font-mono"
        style={{ color: "rgba(0,0,0,0.78)" }}
      >
        Patient Requests for Approval
      </h2>

      {appointments.length === 0 ? (
        <div className="text-center flex justify-center items-center text-gray-500 p-10 h-full w-full font-poppins">
          No Appointment Request
        </div>
      ) : (
        <ul className="list-disc pl-5 mt-4">
          {filteredAppointments.map((appointment) => {
            const appointmentDate = new Date(appointment.date);
            const appointmentTime = new Date(appointment.time);
            const today = new Date().setHours(0, 0, 0, 0);
            const appointmentDateSet = appointmentDate.setHours(0, 0, 0, 0);
            const isToday = appointmentDateSet === today;
            const formattedDate = appointmentDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            const dayOfWeek = appointmentDate.toLocaleDateString("en-US", {
              weekday: "long",
            });
            const formattedTime = new Date(
              `1970-01-01T${appointment.time}:00`
            ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

            return (
              <li
                key={appointment._id}
                className="mt-4 p-4 rounded shadow-lg list-none w-full font-poppins"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <span className="text-[#2c6975] font-normal font-poppins">
                    <strong>{isToday ? "TODAY" : dayOfWeek}</strong>{" "}
                    {formattedDate}
                  </span>
                  <div className="flex items-center gap-2 font-poppins">
                    <button
                      onClick={() => handleShowDetails(appointment)}
                      className="text-gray-400 hover:text-[#2c6975] mr-2"
                    >
                      <InfoIcon />
                    </button>
                    <button
                      onClick={() =>
                        handleReject(
                          appointment._id,
                          appointment.date,
                          appointment.time
                        )
                      }
                      className="rounded-full p-1"
                      style={{
                        color: "#2C6975",
                        backgroundColor: isHovered
                          ? "rgba(104, 178, 160, 0.25)"
                          : "rgba(104, 178, 160, 0.19)",
                      }}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  <p className="uppercase font-semibold text-[#54595E]">
                    {appointment.firstname}
                  </p>
                  <p className="uppercase font-semibold text-[#54595E]">
                    {appointment.lastname}
                  </p>
                </div>
                <p className="mt-2 text-gray-700 capitalize">
                  {appointment.appointmentType}
                </p>
                <p className="mt-2 font-semibold">{appointment.time}</p>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleAccept(appointment)}
                    className="text-white font-semibold shadow-md transition-colors"
                    style={{
                      backgroundColor: "#2C6975",
                      borderRadius: "20px",
                      width: "98px",
                      height: "35px",
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "#358898")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "#2C6975")
                    }
                  >
                    Accept
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {selectedAppointment && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50 p-4 sm:p-6 md:p-8 lg:p-12"
          style={{ backgroundColor: "rgba(233, 241, 239, 0.83)" }}
          onClick={handleCloseDetails}
        >
          <div
            className="bg-white relative flex flex-col md:flex-row gap-4 p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg shadow-lg max-w-full md:max-w-3xl w-full md:w-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseDetails}
              className="bg-gray-500 absolute right-4 top-4 text-white font-semibold py-1 px-2 rounded-full shadow-md hover:bg-gray-600 transition-colors"
            >
              <Close />
            </button>

            <div className="text-[#2c6975] flex flex-col gap-4 w-full">
              <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 border-b pb-2">
                Appointment Details
              </h2>

              <div className="capitalize">
                <strong className="font-bold">Full Name:</strong>{" "}
                {selectedAppointment.firstname} {selectedAppointment.middleName}{" "}
                {selectedAppointment.lastname}{" "}
              </div>

              <p className="mb-2">
                <strong className="font-bold">Email:</strong>{" "}
                {selectedAppointment.email}
              </p>

              <p className="mb-2">
                <strong className="font-bold">Appointment Date:</strong>{" "}
                {new Date(selectedAppointment.date).toLocaleDateString()}
              </p>

              <p className="mb-2">
                <strong className="font-bold">Time:</strong>{" "}
                {selectedAppointment.time}
              </p>

              <p className="mb-2">
                <strong className="font-bold">Primary Complaint:</strong>{" "}
                {selectedAppointment.primaryComplaint}
              </p>

              <p className="mb-2">
                <strong className="font-bold">Service Availed:</strong>{" "}
                {selectedAppointment.appointmentType}
              </p>

              <p className="mb-2">
                <strong className="font-bold">History of Intervention:</strong>{" "}
                {selectedAppointment.historyOfIntervention !== "false"
                  ? selectedAppointment.historyOfIntervention
                  : "None"}
              </p>

              {selectedAppointment.briefDetails ? (
                <p className="mb-2">
                  <strong className="font-bold">Brief Details:</strong>{" "}
                  {selectedAppointment.briefDetails}
                </p>
              ) : null}

              <p className="mb-2">
                <strong className="font-bold">Consultation Method:</strong>{" "}
                {selectedAppointment.consultationMethod}
              </p>
            </div>

            <div className="mt-4 w-full">
              {selectedAppointment.receipt ? (
                <div className="mt-2 border border-gray-300 rounded-lg overflow-hidden">
                  <img
                    src={selectedAppointment.receipt}
                    alt="Receipt"
                    className="w-full h-auto object-contain"
                  />
                  <div className="mt-2 space-x-2 flex items-center justify-center">
                    <button
                      onClick={async () => {
                        try {
                          const response = await fetch(
                            selectedAppointment.receipt
                          );
                          if (response.ok) {
                            const blob = await response.blob();
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            link.href = url;
                            link.download = "receipt.jpg";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            URL.revokeObjectURL(url);
                          } else {
                            console.error("Failed to fetch receipt");
                          }
                        } catch (error) {
                          console.error("Error downloading receipt:", error);
                        }
                      }}
                      className="inline-flex items-center underline text-blue-500"
                    >
                      Download Receipt
                    </button>
                  </div>
                </div>
              ) : (
                <span className="font-bold">No receipt available</span>
              )}
            </div>
          </div>
        </div>
      )}

      <MeetLinkModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
      <MeetPlaceModal
        isOpen={isMeetLinkOpen}
        onClose={() => setIsMeetLinkOpen(false)}
        onSubmit={handleMeetPlaceModalSubmit}
      />
    </div>
  );
};

export default AppointmentRequest;
