import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { getPatientData } from "../../api/appointmentAPI/getPatientDataApi";
import {
  PatientList,
  PatientDetails,
  AppointmentStats,
} from "../../components/custom";
import "../../styles/patient.css";
import axios from "axios";
import { markAppointmentAsCompleted } from "../../api/appointmentAPI/markAsComplete";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
  Alert,
} from "@mui/material";
import Reschedule from "../../components/admin/Reschedule";

const dateRanges = [
  { label: "Last 7 Days", value: "last7days" },
  { label: "Last 30 Days", value: "last30days" },
  { label: "This Month", value: "thisMonth" },
  { label: "All Time", value: "allTime" },
];

const statuses = [
  { label: "All", value: "all" },
  { label: "Accepted", value: "accepted" },
  { label: "Completed", value: "completed" },
  { label: "Canceled", value: "canceled" },
  { label: "Requested", value: "requested" },
  { label: "Rejected", value: "rejected" },
  { label: "Pending", value: "pending" },
  { label: "ReqRescheduled", value: "Reschedule Request" },
  { label: "Rescheduled", value: "rescheduled" },
  { label: "Refunded", value: "refunded" },
];

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activePatientIdList, setActivePatientIdList] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [dateRange, setDateRange] = useState("allTime");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatientData();
        setPatients(data);
        setFilteredPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
        Swal.fire("Error", "Failed to fetch patient data", "error");
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    const filterPatients = () => {
      const now = new Date();
      let filtered = patients;

      // Filter by date range
      if (dateRange !== "allTime") {
        let dateCondition;
        if (dateRange === "last7days") {
          dateCondition = new Date(now.setDate(now.getDate() - 7));
        } else if (dateRange === "last30days") {
          dateCondition = new Date(now.setDate(now.getDate() - 30));
        } else if (dateRange === "thisMonth") {
          dateCondition = new Date(now.getFullYear(), now.getMonth(), 1);
        }

        filtered = filtered.filter(
          (patient) => new Date(patient.date) >= dateCondition
        );
      }

      // Filter by status
      if (statusFilter !== "all") {
        filtered = filtered.filter(
          (patient) => patient.status === statusFilter
        );
      }

      // Filter by search query (by name)
      if (searchQuery) {
        filtered = filtered.filter((patient) =>
          (patient.user.firstname + " " + patient.user.lastname)
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
      }

      setFilteredPatients(filtered);
    };

    filterPatients();
  }, [dateRange, statusFilter, searchQuery, patients]);

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

  const handleToggleActionsList = (patientId) => {
    setActivePatientIdList(
      patientId === activePatientIdList ? null : patientId
    );
  };

  const handleCloseModal = () => {
    setSelectedPatient(null);
  };

  const handleRefund = async (id, file) => {
    const formData = new FormData();
    formData.append("refundReceipt", file);
    formData.append("appointmentId", id);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/Appointments/api/refund`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Swal.fire("Success", "Refund processed successfully", "success");
      setSelectedPatient(null);
    } catch (error) {
      console.error("Error processing refund:", error);
      Swal.fire("Error", "Failed to process refund", "error");
    }
  };

  const handleCompleteAppointment = async (appointmentId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark this appointment as completed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, complete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      try {
        await markAppointmentAsCompleted(appointmentId);
        setPatients((prevPatients) =>
          prevPatients.map((patient) =>
            patient.id === appointmentId
              ? { ...patient, status: "completed" }
              : patient
          )
        );

        Swal.fire("Success", "Appointment marked as completed", "success");
      } catch (error) {
        console.error("Error completing appointment", error);
        Swal.fire("Error", "Failed to complete appointment", "error");
      }
    }
  };

  const handleCancel = async (appointmentId) => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No!",
    });

    if (confirmation.isConfirmed) {
      try {
        await axios.patch(
          `https://backend-production-c8da.up.railway.app/Appointments/api/cancel/${appointmentId}`
        );
        Swal.fire({
          title: "Success",
          text: "Successfully canceled!",
          icon: "success",
          confirmButtonText: "Close",
        });
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Failed to cancel the appointment.",
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    }
  };

  const openRescheduleModal = (patient) => {
    setSelectedPatient(patient);
    setIsRescheduleOpen(true);
  };

  const closeRescheduleModal = () => {
    setIsRescheduleOpen(false);
    setSelectedPatient(null);
  };

  return (
    <div className="p-4">
      {selectedPatient && !isRescheduleOpen && (
        <PatientDetails
          patient={selectedPatient}
          onClose={handleCloseModal}
          handleRefund={handleRefund}
        />
      )}
      <Reschedule
        appointmentId={selectedPatient?.id}
        onClose={closeRescheduleModal}
        open={isRescheduleOpen}
      />
      <div className="flex flex-col lg:flex-col gap-4">
        <div className="flex-1">
          <AppointmentStats />
        </div>
        <div className="flex-1">
          <Box display="flex" flexDirection="row" gap={2}>
            <FormControl variant="outlined" className="mr-4">
              <InputLabel id="dateRange-label">Select Date Range</InputLabel>
              <Select
                labelId="dateRange-label"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                label="Select Date Range"
              >
                {dateRanges.map((range) => (
                  <MenuItem key={range.value} value={range.value}>
                    {range.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" className="mr-4 flex-1">
              <InputLabel id="statusFilter-label">Select Status</InputLabel>
              <Select
                labelId="statusFilter-label"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Select Status"
              >
                {statuses.map((status) => (
                  <MenuItem key={status.value} value={status.value}>
                    {status.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* Search Bar */}
            <TextField
              label="Search Patients"
              variant="outlined"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              className="mr-4"
              sx={{ width: "70%" }}
            />
          </Box>
          <br />
          {/* Empty State Handling */}
          {filteredPatients.length === 0 ? (
            <Alert
              severity="error"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p className="text-center">
                No patients found matching your criteria.
              </p>
            </Alert>
          ) : (
            <PatientList
              patients={filteredPatients}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPatientSelect={handlePatientSelect}
              onToggleActionsList={handleToggleActionsList}
              activePatientIdList={activePatientIdList}
              onMarkComplete={handleCompleteAppointment}
              handleCancel={handleCancel}
              openRescheduleModal={openRescheduleModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Patients;
