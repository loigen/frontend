import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

const AdminRoute = ({ element }) => {
  const { user } = useAuth();

  // If user is not an admin, redirect to user dashboard or login
  if (user.role !== "admin") {
    return <Navigate to="/user-dashboard" />;
  }

  return element;
};

export default AdminRoute;
