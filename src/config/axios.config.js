import { url } from "../utils/constants";
import axios from "axios";
import { appPaths } from "../utils/constants";
import { store } from "../store/store";
import { resetAuthState } from "../store/auth/authSlice";
import { redirectToPath } from "../utils/redirect";

const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log(BASE_URL);

class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
    this.response = {
      data: {
        errors: [message],
      },
    };
  }
}

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest.sent
    ) {
      originalRequest.sent = true;

      store.dispatch(resetAuthState());
      redirectToPath(appPaths.AUTH_ROUTES.SIGNIN);

      const customError = new CustomError(
        "Session expired! Please login again"
      );
      throw customError;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
