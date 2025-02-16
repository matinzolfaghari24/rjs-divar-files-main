import axios from "axios";
import { getNewToken } from "src/services/token";
// import { getNewToken } from "src/services/token";
import { getCookie, setCookie } from "src/utils/cookies";
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (request) => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const res = await getNewToken();
      if (!res?.response.data) return;
      setCookie(res.response.data);
      return api(originalRequest);
    }
  }
);

export default api;
