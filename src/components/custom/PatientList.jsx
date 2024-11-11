import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Tooltip,
  Divider,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Swal from "sweetalert2";
import { updateAppointmentStatusToRescheduled } from "../../api/appointmentAPI/updateAppointmentStatusToRescheduled"; // Adjust the import path as needed

const PatientList = ({
  patients,
  itemsPerPage,
  onPatientSelect,
  onMarkComplete,
  handleCancel,
  openRescheduleModal,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleMenuOpen = (event, patient) => {
    setAnchorEl(event.currentTarget);
    setSelectedPatient(patient);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPatient(null);
  };

  const handleViewDetails = () => {
    onPatientSelect(selectedPatient);
    handleMenuClose();
  };

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleReschedule = async (appointmentId) => {
    try {
      await updateAppointmentStatusToRescheduled(appointmentId);
      Swal.fire("Success", "Appointment rescheduled successfully!", "success");
      // Optionally refresh the patients list here
    } catch (error) {
      Swal.fire(
        "Error",
        error.message || "Failed to reschedule appointment",
        "error"
      );
    }
  };

  return (
    <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Time</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>
              Type of Counseling
            </TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Sex</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>
              Consultation Method
            </TableCell>

            <TableCell sx={{ fontWeight: "bold" }} align="right">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients
            .slice(
              currentPage * rowsPerPage,
              currentPage * rowsPerPage + rowsPerPage
            )
            .map((patient) => (
              <TableRow
                key={patient.id}
                hover
                sx={{ cursor: "pointer" }}
                className="capitalize"
              >
                <TableCell>{patient.date}</TableCell>
                <TableCell>{patient.time}</TableCell>
                <TableCell>
                  {patient.user.firstname}
                  <span> </span>
                  {patient.user.lastname}
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    color={
                      patient.status === "accepted"
                        ? "#4caf50" // Green
                        : patient.status === "refunded"
                        ? "#2196f3" // Blue
                        : patient.status === "rejected"
                        ? "#f44336" // Red
                        : patient.status === "pending"
                        ? "#ff9800" // Orange
                        : patient.status === "canceled"
                        ? "#b71c1c" // Dark Red
                        : patient.status === "requested"
                        ? "#00bcd4" // Cyan
                        : patient.status === "completed"
                        ? "#4caf50" // Green for completed
                        : patient.status === "rescheduled"
                        ? "#ff9800" // Orange for rescheduled
                        : patient.status === "ReqRescheduled"
                        ? "#ff9800" // Orange for ReqRescheduled
                        : "#9e9e9e" // Gray
                    }
                  >
                    {patient.status}
                  </Typography>
                </TableCell>

                <TableCell>{patient.typeOfCounseling}</TableCell>
                <TableCell>{patient.user.sex}</TableCell>
                <TableCell>{patient.consultationMethod}</TableCell>

                <TableCell align="right">
                  <Tooltip title="More options" arrow>
                    <IconButton
                      onClick={(event) => handleMenuOpen(event, patient)}
                    >
                      <MoreHorizIcon />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={
                      Boolean(anchorEl) && selectedPatient?.id === patient.id
                    }
                    onClose={handleMenuClose}
                    PaperProps={{
                      sx: {
                        maxWidth: 200,
                        borderRadius: 2,
                        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                      },
                    }}
                  >
                    <MenuItem onClick={handleViewDetails}>
                      View Details
                    </MenuItem>
                    {(selectedPatient?.status === "accepted" ||
                      selectedPatient?.status === "rescheduled") && (
                      <>
                        <MenuItem onClick={() => openRescheduleModal(patient)}>
                          Reschedule
                        </MenuItem>
                        {selectedPatient.consultationMethod === "online" && (
                          <MenuItem
                            onClick={() => {
                              if (selectedPatient.meetLink) {
                                window.open(selectedPatient.meetLink, "_blank");
                              } else {
                                Swal.fire(
                                  "Error",
                                  "Meeting link is not available",
                                  "error"
                                );
                              }
                              handleMenuClose();
                            }}
                          >
                            Go to Room
                          </MenuItem>
                        )}

                        <MenuItem
                          onClick={() => {
                            onMarkComplete(selectedPatient.id);
                            handleMenuClose();
                          }}
                        >
                          Mark as Complete
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleCancel(selectedPatient.id);
                            handleMenuClose();
                          }}
                        >
                          Cancel
                        </MenuItem>
                      </>
                    )}
                    {selectedPatient?.status === "ReqRescheduled" && (
                      <MenuItem
                        onClick={async () => {
                          try {
                            await handleReschedule(selectedPatient.id);
                            Swal.fire(
                              "Success",
                              "Appointment approved successfully!",
                              "success"
                            );
                          } catch (error) {
                            Swal.fire(
                              "Error",
                              error.message || "Failed to approve appointment",
                              "error"
                            );
                          }
                          handleMenuClose();
                        }}
                      >
                        Approve
                      </MenuItem>
                    )}
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Divider />
      <TablePagination
        component="div"
        count={patients.length}
        page={currentPage}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </TableContainer>
  );
};

export default PatientList;
