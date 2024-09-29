import axios, { AxiosResponse } from "axios";
import { store } from "../../store/store";
import { resetAuthState } from "@/store/auth/authSlice";
import { redirectToPath } from "@/utils/helper/redirect";
import { appPaths } from "@/utils/helper/appPaths";
import { hasCookie } from "cookies-next";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;
class CustomError extends Error {
  response?: {
    data?: {
      errors: string[];
    };
  };

  constructor(message: string) {
    super(message);
    this.name = "CustomError";
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
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error?.response?.status === 403 && !originalRequest?.sent) {
      originalRequest.sent = true;

      if (hasCookie('authToken')) {
        return axiosInstance(originalRequest);
      } else {
        store.dispatch(resetAuthState());
        redirectToPath(appPaths.AUTH_ROUTES.SIGNIN);
        const customError = new CustomError(
          "Session expired!, please login again"
        );
        customError.response = {
          data: {
            errors: ["Session expired!, please login again"],
          },
        };
        throw customError;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
