import axios from "axios";

const API_URL = `https://backend-vp67.onrender.com/user/users`;
//for manage users
const getUsers = async (token) => {
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};

const blockUser = async (userId, token) => {
  return axios.patch(
    `${API_URL}/${userId}/block`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    }
  );
};

const unblockUser = async (userId, token) => {
  return axios.patch(
    `${API_URL}/${userId}/unblock`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      withCredentials: true,
    }
  );
};

export { getUsers, blockUser, unblockUser };
