import axios from "axios";

//paras settigns
export const updateProfile = async (formData, localFile) => {
  try {
    const formPayload = new FormData();
    formPayload.append("firstname", formData.firstname);
    formPayload.append("lastname", formData.lastname);
    formPayload.append("email", formData.email);

    if (localFile) {
      formPayload.append("profile_picture", localFile);
    }

    const response = await axios.put(
      `https://backend-production-c8da.up.railway.app/user/updateprofile`,
      formPayload,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    return response.data.user;
  } catch (error) {
    throw new Error("Error updating profile.");
  }
};
