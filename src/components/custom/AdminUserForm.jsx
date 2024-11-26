import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import SweetAlert from "sweetalert2";

// const API_URL = "http://localhost:5000"; // Use localhost for development
const API_URL = "https://backend-vp67.onrender.com"; // Uncomment this for production

const AdminUserForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    middleName: "",
    Profession: "",
    EducationBackground: "",
    Religion: "",
    email: "",
    sex: "",
    password: "",
    birthdate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date();
    const minBirthdate = new Date(today.setFullYear(today.getFullYear() - 15));
    const selectedBirthdate = new Date(formData.birthdate);

    if (selectedBirthdate > minBirthdate) {
      SweetAlert.fire({
        icon: "error",
        title: "Error!",
        text: "You must be at least 15 years old.",
      });
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/user/add-admin`, formData);
      SweetAlert.fire({
        icon: "success",
        title: response.data.message,
      });
      // Reset form fields
      setFormData({
        firstname: "",
        lastname: "",
        middleName: "",
        Profession: "",
        EducationBackground: "",
        Religion: "",
        email: "",
        sex: "",
        password: "",
        birthdate: "",
      });
    } catch (error) {
      SweetAlert.fire({
        icon: "error",
        title: "Error!",
        text: error.response
          ? error.response.data.message
          : "An error occurred",
      });
    }
  };

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Middle Name"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Profession"
              name="Profession"
              value={formData.Profession}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Education Background"
              name="EducationBackground"
              value={formData.EducationBackground}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Religion"
              name="Religion"
              value={formData.Religion}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Sex</InputLabel>
              <Select name="sex" value={formData.sex} onChange={handleChange}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Birthdate"
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Add Admin User
        </Button>
      </form>
    </Paper>
  );
};

export default AdminUserForm;
