import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = "https://backend-production-c8da.up.railway.app";

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setUser(response.data);
      await fetchProfile();
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
      setLoading(false);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);
  // Fetch profile
  const fetchProfile = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.get(`${API_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data.user);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch profile");
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
