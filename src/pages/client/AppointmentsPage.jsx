import React, { useState, useRef, useEffect } from "react";
import Completed from "../../components/custom/Completed";
import Canceled from "../../components/custom/Canceled";
import Rejected from "../../components/custom/Rejected";
import Refunded from "../../components/custom/Refunded";
import Default from "../../components/custom/DefaultViewClient";
import BookAppoint from "../../components/custom/BookAppointment";
const AppointmentDashboard = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown
  const [currentView, setCurrentView] = useState("default");
  // Separate state variables for each button's hover state
  const [isHoveredCompleted, setIsHoveredCompleted] = useState(false);
  const [isHoveredCanceled, setIsHoveredCanceled] = useState(false);
  const [isHoveredRejected, setIsHoveredRejected] = useState(false);
  const [isHoveredRefunded, setIsHoveredRefunded] = useState(false);
  const [isHoveredoption, setIsHoveredoption] = useState(false);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  // Close the dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  return (
    <>
      {currentView === "bookappoint" && (
        <BookAppoint onBackToActive={() => handleViewChange("default")} />
      )}

      {/* Header Navigation */}
      {currentView !== "bookappoint" && (
        <div className="min-h-screen bg-[#E9F1EF] p-8">
          {/* Header Navigation */}
          <div className="flex justify-between items-center mb-8">
            <button
              className="bg-[#2C6975] text-white px-6 py-2 rounded-full font-poppins pt-4 pb-4 pl-10 pr-10 transition duration-300 ease-in-out hover:bg-[#358898] hover:shadow-lg "
              onClick={() => handleViewChange("bookappoint")}
            >
              Book Appointment
            </button>
            <div className="relative">
              <div className="hidden md:flex space-x-4">
                <button
                  className="px-4 py-2 rounded-full transition duration-300 ease-in-out"
                  style={{
                    backgroundColor:
                      currentView === "completed" || isHoveredCompleted
                        ? "rgba(44, 105, 117, 0.13)" // Active or hovered background
                        : "#E9F1EF", // Default background color
                    color: "#2C6975",
                  }}
                  onMouseEnter={() => setIsHoveredCompleted(true)}
                  onMouseLeave={() => setIsHoveredCompleted(false)}
                  onClick={() => handleViewChange("completed")}
                >
                  Completed
                </button>

                <button
                  className="px-4 py-2 rounded-full transition duration-300 ease-in-out"
                  style={{
                    backgroundColor:
                      currentView === "canceled" || isHoveredCanceled
                        ? "rgba(44, 105, 117, 0.13)" // Active or hovered background
                        : "#E9F1EF", // Default background color
                    color: "#2C6975",
                  }}
                  onMouseEnter={() => setIsHoveredCanceled(true)}
                  onMouseLeave={() => setIsHoveredCanceled(false)}
                  onClick={() => handleViewChange("canceled")}
                >
                  Canceled
                </button>

                <button
                  className="px-4 py-2 rounded-full transition duration-300 ease-in-out"
                  style={{
                    backgroundColor:
                      currentView === "rejected" || isHoveredRejected
                        ? "rgba(44, 105, 117, 0.13)" // Active or hovered background
                        : "#E9F1EF", // Default background color
                    color: "#2C6975",
                  }}
                  onMouseEnter={() => setIsHoveredRejected(true)}
                  onMouseLeave={() => setIsHoveredRejected(false)}
                  onClick={() => handleViewChange("rejected")}
                >
                  Rejected
                </button>
                <button
                  className="px-4 py-2 rounded-full transition duration-300 ease-in-out"
                  style={{
                    backgroundColor:
                      currentView === "refunded" || isHoveredRefunded
                        ? "rgba(44, 105, 117, 0.13)" // Active or hovered background
                        : "#E9F1EF", // Default background color
                    color: "#2C6975",
                  }}
                  onMouseEnter={() => setIsHoveredRefunded(true)}
                  onMouseLeave={() => setIsHoveredRefunded(false)}
                  onClick={() => handleViewChange("refunded")}
                >
                  Refunded
                </button>
              </div>

              {/* Dropdown for smaller screens */}
              <div className="md:hidden">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="px-4 py-2 rounded-full transition duration-300 ease-in-out"
                  style={{
                    backgroundColor: isHoveredoption
                      ? "rgba(44, 105, 117, 0.13)"
                      : "#E9F1EF",
                    color: "#2C6975",
                  }}
                  onMouseEnter={() => setIsHoveredoption(true)}
                  onMouseLeave={() => setIsHoveredoption(false)}
                >
                  More Options
                </button>
                {showDropdown && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10"
                  >
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Completed
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Canceled
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Rejected
                    </button>
                    <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                      Refunded
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Cards Section */}
          {currentView === "completed" && (
            <Completed onBackToActive={() => handleViewChange("default")} />
          )}
          {currentView === "canceled" && (
            <Canceled onBackToActive={() => handleViewChange("default")} />
          )}
          {currentView === "rejected" && (
            <Rejected onBackToActive={() => handleViewChange("default")} />
          )}
          {currentView === "refunded" && (
            <Refunded onBackToActive={() => handleViewChange("default")} />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Render Active or Completed Appointments */}
            {currentView === "default" && <Default />}
          </div>
        </div>
      )}
    </>
  );
};

export default AppointmentDashboard;

// import React, { useState, useEffect, useRef } from "react";
// import Swal from "sweetalert2";
// import { fetchAvailableSlots } from "../../api/schedulesAPI/fetchAvailableSlots";
// import { createAppointment } from "../../api/appointmentAPI/createAppointmentApi";
// import { updateSlotStatus } from "../../api/schedulesAPI/updateSlotStatus";
// import { LoadingSpinner } from "../../components/custom";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import {
//   Box,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   Grid,
//   MenuItem,
//   Select,
//   Typography,
// } from "@mui/material";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import { useAuth } from "../../context/AuthProvider";
// import CompletedAppointments from "../../components/custom/Completed";
// import {
//   Appointments,
//   CanceledAppointments,
//   RefundedAppointments,
//   RejectedAppointments,
// } from "../../components/client";

// const AppointmentsPage = () => {
//   const [showDropdown, setShowDropdown] = useState(false);
//   const dropdownRef = useRef(null); // Create a ref for the dropdown
//   const [currentView, setCurrentView] = useState("default");
//   const [isHoveredCompleted, setIsHoveredCompleted] = useState(false);
//   const [isHoveredCanceled, setIsHoveredCanceled] = useState(false);
//   const [isHoveredRejected, setIsHoveredRejected] = useState(false);
//   const [isHoveredRefunded, setIsHoveredRefunded] = useState(false);
//   const [isHoveredoption, setIsHoveredoption] = useState(false);
//   const [appointmentType, setAppointmentType] = useState("");
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [agreementChecked, setAgreementChecked] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);
//   const [file, setFile] = useState(null);
//   const [filePreview, setFilePreview] = useState(null);
//   const [price, setPrice] = useState(0);
//   const { user } = useAuth(); // Assuming user comes from a context
//   const [showContent, setShowContent] = useState(false);
//   const appointmentTypes = [
//     { value: "", label: "Select an appointment type" },
//     { value: "consultation", label: "Consultation", price: 50 },
//     { value: "followup", label: "Follow-Up", price: 30 },
//     { value: "checkup", label: "Check-Up", price: 40 },
//   ];

//   useEffect(() => {
//     const selectedType = appointmentTypes.find(
//       (type) => type.value === appointmentType
//     );
//     if (selectedType) {
//       setPrice(selectedType.price);
//     }
//   }, [appointmentType]);

//   const loadAvailableSlots = async () => {
//     try {
//       const slots = await fetchAvailableSlots();
//       setAvailableSlots(slots);
//     } catch (error) {
//       console.error("Error loading available slots:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadAvailableSlots();
//   }, []);

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const getAvailableSlotsForSelectedDate = () => {
//     const selectedDateStr = new Date(selectedDate).toLocaleDateString();
//     return availableSlots.filter(
//       (slot) => new Date(slot.date).toLocaleDateString() === selectedDateStr
//     );
//   };

//   const handleSlotClick = (slot) => {
//     setSelectedSlot(slot);
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFile(file);

//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFilePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setFilePreview(null);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedSlot) {
//       Swal.fire({
//         icon: "warning",
//         title: "No Slot Selected",
//         text: "Please select a time slot.",
//         color: "red",
//       });
//       return;
//     }

//     if (!agreementChecked) {
//       Swal.fire({
//         icon: "warning",
//         title: "Agreement Required",
//         text: "Please agree to the terms and conditions.",
//         color: "red",
//       });
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const appointmentData = new FormData();
//       appointmentData.append("date", selectedSlot.date);
//       appointmentData.append("time", selectedSlot.time);
//       appointmentData.append("appointmentType", appointmentType);
//       appointmentData.append("userId", user._id);
//       appointmentData.append("firstname", user.firstname);
//       appointmentData.append("lastname", user.lastname);
//       appointmentData.append("email", user.email);
//       appointmentData.append("role", user.role);
//       appointmentData.append("avatar", user.profilePicture);
//       appointmentData.append("sex", user.sex);

//       if (file) {
//         appointmentData.append("receipt", file);
//       }

//       const response = await createAppointment(appointmentData);
//       await updateSlotStatus(selectedSlot._id, "pending");

//       Swal.fire({
//         icon: "success",
//         title: "Appointment Created",
//         text: "Your appointment has been scheduled successfully!",
//         willClose: () => {
//           window.location.reload();
//         },
//       });

//       // Reset form fields
//       setAppointmentType("");
//       setSelectedSlot(null);
//       setFile(null);
//       setFilePreview(null);
//       await loadAvailableSlots();
//     } catch (error) {
//       console.error("Error creating appointment:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Failed to create appointment. Please try again.",
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Close the dropdown if clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [dropdownRef]);
//   const handleViewChange = (view) => {
//     setCurrentView(view);
//   };
//   return (
//     <>
//       {showContent === true ? (
//         <>
//           {" "}
//           <Button
//             onClick={() => setShowContent(false)}
//             sx={{ position: "absolute" }}
//           >
//             Close Booking
//           </Button>
//           <Box
//             display="flex"
//             flexDirection="row"
//             justifyContent="space-between"
//             gap={1}
//             sx={{ margin: "auto", padding: 2 }}
//             fullWidth
//           >
//             <br />
//             <br />
//             <br />
//             {/* Step 1: Select Appointment Type */}
//             <Box sx={{ mb: 3, flex: 1 }}>
//               <Typography variant="h6">
//                 Step 1: Select Appointment Type
//               </Typography>
//               <Box
//                 sx={{
//                   border: "1px solid #ccc",
//                   borderRadius: "4px",
//                   padding: "8px",
//                   cursor: "pointer",
//                 }}
//               >
//                 <Typography
//                   variant="body1"
//                   sx={{ color: appointmentType ? "black" : "grey" }}
//                 >
//                   {appointmentType || "Select Appointment Type"}
//                 </Typography>
//               </Box>
//               <Box sx={{ mt: 1 }}>
//                 {appointmentTypes.slice(1).map((type) => (
//                   <Box
//                     key={type.value}
//                     onClick={() => setAppointmentType(type.value)}
//                     sx={{
//                       padding: "8px",
//                       backgroundColor:
//                         appointmentType === type.value
//                           ? "#e0e0e0"
//                           : "transparent",
//                       cursor: "pointer",
//                       "&:hover": {
//                         backgroundColor: "#f0f0f0",
//                       },
//                     }}
//                   >
//                     {type.label}
//                   </Box>
//                 ))}
//               </Box>
//             </Box>

//             {/* Step 2: Select Date and Time */}
//             <Box sx={{ mb: 3, flex: 1 }}>
//               <Typography variant="h6">Step 2: Select Date and Time</Typography>
//               <Calendar
//                 onChange={handleDateChange}
//                 value={selectedDate}
//                 minDate={new Date()}
//               />
//               <Typography variant="body2">Available Time Slots</Typography>
//               <Box>
//                 {loading ? (
//                   <LoadingSpinner />
//                 ) : (
//                   getAvailableSlotsForSelectedDate().map((slot) => (
//                     <Button
//                       key={slot._id}
//                       variant="outlined"
//                       onClick={() => handleSlotClick(slot)}
//                       sx={{ margin: "5px" }}
//                     >
//                       {slot.time}
//                     </Button>
//                   ))
//                 )}
//               </Box>
//             </Box>

//             {/* Step 3: Upload Proof of Payment */}
//             <Box sx={{ mb: 3, flex: 1 }}>
//               <Typography variant="h6">
//                 Step 3: Upload Proof of Payment
//               </Typography>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={agreementChecked}
//                     onChange={(e) => setAgreementChecked(e.target.checked)}
//                     color="primary"
//                   />
//                 }
//                 label="I agree to the terms and conditions"
//               />
//               <label>
//                 <input type="file" onChange={handleFileChange} />
//                 <span>Choose File</span>
//               </label>
//               {filePreview && (
//                 <img
//                   src={filePreview}
//                   alt="Receipt Preview"
//                   style={{ width: "300px", height: "auto", marginTop: "10px" }}
//                 />
//               )}
//               <Button
//                 variant="contained"
//                 onClick={handleSubmit}
//                 disabled={submitting}
//                 fullWidth
//               >
//                 {submitting ? "Submitting..." : "Submit Appointment"}
//               </Button>
//             </Box>
//           </Box>
//         </>
//       ) : (
//         <Box>
//           <Button
//             onClick={() => {
//               setShowContent(true);
//             }}
//           >
//             Start Booking
//           </Button>
//           <div className="hidden md:flex w-full justify-end">
//             <button
//               className="px-4 py-2 rounded-full transition duration-300 ease-in-out"
//               style={{
//                 backgroundColor:
//                   currentView === "completed" || isHoveredCompleted
//                     ? "rgba(44, 105, 117, 0.13)" // Active or hovered background
//                     : "#E9F1EF", // Default background color
//                 color: "#2C6975",
//               }}
//               onMouseEnter={() => setIsHoveredCompleted(true)}
//               onMouseLeave={() => setIsHoveredCompleted(false)}
//               onClick={() => handleViewChange("completed")}
//             >
//               Completed
//             </button>

//             <button
//               className="px-4 py-2 rounded-full transition duration-300 ease-in-out"
//               style={{
//                 backgroundColor:
//                   currentView === "canceled" || isHoveredCanceled
//                     ? "rgba(44, 105, 117, 0.13)" // Active or hovered background
//                     : "#E9F1EF", // Default background color
//                 color: "#2C6975",
//               }}
//               onMouseEnter={() => setIsHoveredCanceled(true)}
//               onMouseLeave={() => setIsHoveredCanceled(false)}
//               onClick={() => handleViewChange("canceled")}
//             >
//               Canceled
//             </button>

//             <button
//               className="px-4 py-2 rounded-full transition duration-300 ease-in-out"
//               style={{
//                 backgroundColor:
//                   currentView === "rejected" || isHoveredRejected
//                     ? "rgba(44, 105, 117, 0.13)" // Active or hovered background
//                     : "#E9F1EF", // Default background color
//                 color: "#2C6975",
//               }}
//               onMouseEnter={() => setIsHoveredRejected(true)}
//               onMouseLeave={() => setIsHoveredRejected(false)}
//               onClick={() => handleViewChange("rejected")}
//             >
//               Rejected
//             </button>
//             <button
//               className="px-4 py-2 rounded-full transition duration-300 ease-in-out"
//               style={{
//                 backgroundColor:
//                   currentView === "refunded" || isHoveredRefunded
//                     ? "rgba(44, 105, 117, 0.13)" // Active or hovered background
//                     : "#E9F1EF", // Default background color
//                 color: "#2C6975",
//               }}
//               onMouseEnter={() => setIsHoveredRefunded(true)}
//               onMouseLeave={() => setIsHoveredRefunded(false)}
//               onClick={() => handleViewChange("refunded")}
//             >
//               Refunded
//             </button>
//           </div>
//           <div className="md:hidden">
//             <button
//               onClick={() => setShowDropdown(!showDropdown)}
//               className="px-4 py-2 rounded-full transition duration-300 ease-in-out"
//               style={{
//                 backgroundColor: isHoveredoption
//                   ? "rgba(44, 105, 117, 0.13)"
//                   : "#E9F1EF",
//                 color: "#2C6975",
//               }}
//               onMouseEnter={() => setIsHoveredoption(true)}
//               onMouseLeave={() => setIsHoveredoption(false)}
//             >
//               More Options
//             </button>
//             {showDropdown && (
//               <div
//                 ref={dropdownRef}
//                 className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10"
//               >
//                 <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
//                   Completed
//                 </button>
//                 <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
//                   Canceled
//                 </button>
//                 <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
//                   Rejected
//                 </button>
//                 <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
//                   Refunded
//                 </button>
//               </div>
//             )}
//           </div>
//           {currentView === "completed" && (
//             <CompletedAppointments
//               onBackToActive={() => handleViewChange("default")}
//             />
//           )}
//           {currentView === "canceled" && (
//             <CanceledAppointments
//               onBackToActive={() => handleViewChange("default")}
//             />
//           )}
//           {currentView === "rejected" && (
//             <RejectedAppointments
//               onBackToActive={() => handleViewChange("default")}
//             />
//           )}
//           {currentView === "refunded" && (
//             <RefundedAppointments
//               onBackToActive={() => handleViewChange("default")}
//             />
//           )}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {/* Render Active or Completed Appointments */}
//             {currentView === "default" && (
//               <>
//                 <Appointments />
//               </>
//             )}
//           </div>
//         </Box>
//       )}
//     </>
//   );
// };

// export default AppointmentsPage;
