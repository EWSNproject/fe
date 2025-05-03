import axios from 'axios';
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8080/api";

export const createPost = async (postData) => {
  const token = Cookies.get("accessToken");

  const response = await axios.post(`${BASE_URL}/posts`, postData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};