import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
  Box,
  Tooltip,
  TablePagination,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  getUsers,
  blockUser,
  unblockUser,
} from "../../api/manageUsers/userService";
import AdminUserForm from "../custom/AdminUserForm";
import { Add, ChevronLeft } from "@mui/icons-material";
import AdminUsers from "./AdminUsers";
import { LoadingSpinner } from "../custom";

const ManageUsers = ({ setView }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState(null);
  const [section, setSection] = useState("list");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await getUsers(token);
        setUsers(response.data.users);
      } catch (err) {
        setError(
          "Error fetching users: " + (err.response?.data?.error || err.message)
        );
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load users.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBlock = async (userId) => {
    setActionLoading(userId);
    try {
      const token = localStorage.getItem("token");
      await blockUser(userId, token);
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, status: "blocked" } : user
        )
      );
      Swal.fire({
        icon: "success",
        title: "User Blocked",
        text: "The user has been successfully blocked.",
      });
    } catch (err) {
      setError(
        "Error blocking user: " + (err.response?.data?.error || err.message)
      );
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to block user.",
      });
    } finally {
      setActionLoading(null);
    }
  };

  const handleUnblock = async (userId) => {
    setActionLoading(userId);
    try {
      const token = localStorage.getItem("token");
      await unblockUser(userId, token);
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, status: "active" } : user
        )
      );
      Swal.fire({
        icon: "success",
        title: "User Unblocked",
        text: "The user has been successfully unblocked.",
      });
    } catch (err) {
      setError(
        "Error unblocking user: " + (err.response?.data?.error || err.message)
      );
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to unblock user.",
      });
    } finally {
      setActionLoading(null);
    }
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Typography color="error">{error}</Typography>;

  // Slice data for pagination
  const paginatedUsers = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Container component="main" maxWidth="lg" sx={{ py: 5 }}>
      <IconButton onClick={() => setView("settings")}>
        <ArrowBackIcon />
      </IconButton>
      <Typography
        variant="h4"
        component="h1"
        color="#2C6975"
        gutterBottom
        align="center"
        fontWeight="bold"
      >
        Manage Users
      </Typography>
      <div className="flex justify-end">
        {section === "list" ? (
          <Tooltip title="Add Admin User">
            <Button
              sx={{
                color: "#2C6975",
                "&:hover": {
                  backgroundColor: "rgba(229, 231, 235, 0.5)",
                },
              }}
              onClick={() => setSection("addAdmin")}
            >
              <Add />
            </Button>
          </Tooltip>
        ) : (
          <Tooltip title="Back">
            <Button
              sx={{
                color: "#2C6975",
                "&:hover": {
                  backgroundColor: "rgba(229, 231, 235, 0.5)",
                },
              }}
              onClick={() => setSection("list")}
            >
              <ChevronLeft />
            </Button>
          </Tooltip>
        )}
        {section !== "adminUsers" && (
          <Button
            sx={{
              color: "#2C6975",
              "&:hover": {
                backgroundColor: "rgba(229, 231, 235, 0.5)",
              },
            }}
            onClick={() => setSection("adminUsers")}
          >
            Admin Users
          </Button>
        )}
      </div>
      {section === "list" && (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell sx={{ textTransform: "capitalize" }}>
                      {user.firstname} {user.lastname}
                    </TableCell>
                    <TableCell>{user.sex}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Typography
                        variant="body2"
                        sx={{
                          color: user.status === "active" ? "green" : "red",
                          borderRadius: 1,
                          padding: 1,
                          textAlign: "center",
                          textTransform: "capitalize",
                        }}
                      >
                        {user.status}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        {user.status === "active" ? (
                          <Button
                            onClick={() => handleBlock(user._id)}
                            variant="contained"
                            color="error"
                            fullWidth
                            disabled={actionLoading === user._id}
                          >
                            {actionLoading === user._id
                              ? "Blocking..."
                              : "Block"}
                          </Button>
                        ) : (
                          <Button
                            onClick={() => handleUnblock(user._id)}
                            variant="contained"
                            color="success"
                            fullWidth
                            disabled={actionLoading === user._id}
                          >
                            {actionLoading === user._id
                              ? "Unblocking..."
                              : "Unblock"}
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
      {section === "addAdmin" && <AdminUserForm />}
      {section === "adminUsers" && <AdminUsers />}
    </Container>
  );
};

export default ManageUsers;
