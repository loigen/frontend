import React, { useContext } from "react";
import LogoutButton from "../components/LogoutButton";
import { AuthContext } from "../context/AuthProvider";

const UserDashboard = () => {
  const { user } = useContext(AuthContext); // Access the user from context
  return (
    <>
      {user ? (
        <div>
          <p className="text-red-900">
            Welcome, {user.firstname} {user.lastname}!
          </p>
          <p>Role: {user.role}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <LogoutButton />
    </>
  );
};

export default UserDashboard;
