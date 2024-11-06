import React from "react";
import Swal from "sweetalert2"; // Assuming you use SweetAlert for alerts
const API_URL = "https://backend-vp67.onrender.com";

const deleteBlog = async (blogId, refreshBlogs) => {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const response = await fetch(`${API_URL}/blog/${blogId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire("Deleted!", data.message, "success");
        refreshBlogs();
      } else {
        Swal.fire("Error", data.message, "error");
      }
    }
  } catch (error) {
    console.error("Error deleting blog:", error);
    Swal.fire("Error", "Could not delete the blog", "error");
  }
};

export default deleteBlog;
