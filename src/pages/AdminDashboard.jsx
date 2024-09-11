import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import LogoutButton from "../components/LogoutButton";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {user ? (
        <div>
          <p>
            Welcome, {user.firstname} {user.lastname}!
          </p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <LogoutButton />
    </div>
  );
};

export default AdminDashboard;
