import Swal from "sweetalert2";
import axios from "axios";

export const uploadFile = async (patientId, folderIndex, file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("patientId", patientId);
  formData.append("folderIndex", folderIndex);

  try {
    await axios.post(
      `https://backend-production-c8da.up.railway.app/Appointments/api/files`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    Swal.fire("Success", "File uploaded successfully", "success");
  } catch (error) {
    console.error("Error uploading file:", error);
    Swal.fire("Error", "Failed to upload file", "error");
    throw error;
  }
};
