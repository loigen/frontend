import axios from "axios";

export const baseUrl = `${process.env.REACT_APP_API_URL}/api`;

export const postRequest = async (url, body) => {
  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, 
    });
    return response.data;
  } catch (error) {
    let message;

    if (error.response && error.response.data?.message) {
      message = error.response.data.message;
    } else {
      message = error.message || "An error occurred";
    }

    return { error: true, message };
  }
};

export const getRequest = async (url) => {
  try {
    const response = await axios.get(url, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    let message = "An error occurred...";

    if (error.response && error.response.data?.message) {
      message = error.response.data.message;
    }
    return { error: true, message };
  }
};
