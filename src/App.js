import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthProvider";
import { ChatContextProvider } from "./context/ChatContext";
import {
  AdminPrivateRoute,
  UserPrivateRoute,
  RoleBasedPrivateRoute,
} from "./PrivateRoute";
import UserDashboard from "./pages/UserDashboard";
import NotAuthorized from "./pages/NotAuthorized";
import "./App.css";
import { Login, ContactSupport } from "@mui/icons-material";
import Home from "./pages/admin/Home";
import Patients from "./pages/admin/Patients";
import MrJebBlog from "./pages/client/MrJebBlog";
import AppointmentsPage from "./pages/client/AppointmentsPage";
import AdminSettings from "./pages/admin/Settings";
import ClientSettings from "./pages/client/Settings";
import BLog from "./pages/admin/BLog";
import Schedules from "./pages/admin/Schedules";

import {
  LandingPage,
  About,
  Contact,
  BlogGuestPage,
  Signup,
  Services,
  LoginModal,
} from "./components";
import { PatientDetails, Reset, Chat } from "./components/custom";

function App() {
  const { user, loading } = useContext(AuthContext); // Extract user from AuthContext

  if (loading) return <p>Loading...</p>; // Handle loading state

  return (
    <ChatContextProvider user={user}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginModal />} />
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/guestBlog" element={<BlogGuestPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/patients/:id" element={<PatientDetails />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/forgot-password" element={<Reset />} />

          {/* Private Routes for All Authenticated Users */}
          <Route
            path="/MR_JEB_BLOG"
            element={
              user ? (
                <UserPrivateRoute element={MrJebBlog} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/Booking"
            element={
              user ? (
                <UserPrivateRoute element={AppointmentsPage} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/clientSettings"
            element={
              user ? (
                <UserPrivateRoute element={ClientSettings} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/contactSupport"
            element={
              user ? (
                <UserPrivateRoute element={ContactSupport} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/messenger"
            element={<RoleBasedPrivateRoute element={Chat} />}
          />

          {/* Admin-Only Private Routes */}

          <Route
            path="/home"
            element={
              user ? <AdminPrivateRoute element={Home} /> : <Navigate to="/" />
            }
          />
          <Route
            path="/patients"
            element={
              user ? (
                <AdminPrivateRoute element={Patients} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/schedule"
            element={
              user ? (
                <AdminPrivateRoute element={Schedules} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/blog"
            element={
              user ? <AdminPrivateRoute element={BLog} /> : <Navigate to="/" />
            }
          />
          <Route
            path="/AdminSettings"
            element={
              user ? (
                <AdminPrivateRoute element={AdminSettings} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/user-dashboard"
            element={
              user ? (
                <UserPrivateRoute element={UserDashboard} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route path="/not-authorized" element={<NotAuthorized />} />
          <Route path="*" element={<Navigate to="/not-authorized" />} />
        </Routes>
      </Router>
    </ChatContextProvider>
  );
}

export default App;
