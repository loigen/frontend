import { Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import UserDashboard from "./pages/client/userDashboard";
import Dashboard from "./pages/admin/Dashboard";

// Private Route for general users
const UserPrivateRoute = ({ element: Component, ...rest }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  return user && user.role === "user" ? (
    <UserDashboard>
      <Component {...rest} />
    </UserDashboard>
  ) : (
    <Navigate to="/not-authorized" />
  );
};

// Private Route for admins
const AdminPrivateRoute = ({ element: Component, ...rest }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  return user && user.role === "admin" ? (
    <Dashboard>
      <Component {...rest} />
    </Dashboard>
  ) : (
    <Navigate to="/not-authorized" />
  );
};
const RoleBasedPrivateRoute = ({ element: Component, ...rest }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  return user ? (
    user.role === "user" ? (
      <Component {...rest} />
    ) : (
      <Component {...rest} />
    )
  ) : (
    <Navigate to="/not-authorized" />
  );
};
export { UserPrivateRoute, AdminPrivateRoute, RoleBasedPrivateRoute };
