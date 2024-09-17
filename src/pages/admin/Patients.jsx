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

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activePatientIdList, setActivePatientIdList] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await getPatientData();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
        Swal.fire("Error", "Failed to fetch patient data", "error");
      }
    };

    fetchPatients();
  }, []);

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

        Swal.fire("Success", "Appointment marked as completed", "success").then(
          () => {
            window.location.reload();
          }
        );
      } catch (error) {
        console.error("Error completing appointment", error);
        Swal.fire("Error", "Failed to complete appointment", "error");
      }
    }
  };

  return (
    <div className="p-4">
      {selectedPatient && (
        <PatientDetails
          patient={selectedPatient}
          onClose={handleCloseModal}
          handleRefund={handleRefund}
        />
      )}
      <div className="flex flex-col lg:flex-col gap-4">
        <div className="flex-1 ">
          <AppointmentStats />
        </div>
        <div className="flex-1">
          <PatientList
            patients={patients}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPatientSelect={handlePatientSelect}
            onToggleActionsList={handleToggleActionsList}
            activePatientIdList={activePatientIdList}
            onMarkComplete={handleCompleteAppointment}
          />
        </div>
      </div>
    </div>
  );
};

export default Patients;
