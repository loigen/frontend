import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  TablePagination,
} from "@mui/material";
import {
  getUsers,
  blockUser,
  unblockUser,
} from "../../api/manageUsers/userService";
import Swal from "sweetalert2";
import { LoadingSpinner } from "../custom";

const AdminUsers = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page

  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/user/adminUsers"
        );
        setAdminUsers(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching admin users");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminUsers();
  }, []);

  const handleBlock = async (userId) => {
    setActionLoading(userId);
    try {
      const token = localStorage.getItem("token");
      await blockUser(userId, token);
      setAdminUsers((prevUsers) =>
        prevUsers.map((user) =>
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
      setAdminUsers((prevUsers) =>
        prevUsers.map((user) =>
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

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Paginate the adminUsers data
  const paginatedUsers = adminUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
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
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>No admin users found.</TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    {user.firstname} {user.lastname}
                  </TableCell>
                  <TableCell>{user.sex}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.status}</TableCell>
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
                          {actionLoading === user._id ? "Blocking..." : "Block"}
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
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={adminUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default AdminUsers;
