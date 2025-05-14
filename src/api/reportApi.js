import axios from 'axios';
import Cookies from "js-cookie";

const BASE_URL = "http://localhost:8080/api";

export const reportUser = async ({ reportedUserId, reason, content }) => {
  const token = Cookies.get("accessToken");
  try {
    const response = await axios.post(
      `${BASE_URL}/users/reports`,
      {
        reportedUserId,
        reason,
        content
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
