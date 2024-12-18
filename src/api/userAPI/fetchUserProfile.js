import axios from "axios";
import Swal from "sweetalert2";

//para sa profile page
export const fetchUserProfile = async () => {
  try {
    const response = await axios.get(
      `https://backend-vp67.onrender.com/user/profile`,
      { withCredentials: true }
    );
    return response.data.user;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to load user profile. Please try again later.",
    });
    console.error("Error fetching profile:", error);

    throw error;
  }
};
