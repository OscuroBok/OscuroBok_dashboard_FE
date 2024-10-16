/**
  The code sets up Axios instances to make HTTP requests, with a base URL from environment variables.
  It includes an interceptor to handle session expiration errors, logging the user out and redirecting them to the sign-in page if their session has expired.
  It throws a custom error when this happens to show an appropriate message.
*/
import { url } from "@/utils/constants";
import axios from "axios";
import { appPaths } from "@/utils/constants";
import { store } from "@/store/store";
import { resetAuthState } from "@/store/auth/authSlice";
import { redirectToPath } from "@/utils/redirect";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// This is the class that will be called, whenever some custom error message needs to be set/created for some reason
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
    this.response = {
      data: {
        errors: [message]
      }
    }
  }
}
// Axios Instance created successfully for public requests that don't need Authentication/login credential
// Also withCredentials: true ensures cookies are included in cross-site requests
// `withCredentials` indicates whether or not cross-site Access-Control requests, like making requests from one server to another server
// should be made using credentials(jwt tokens) or not
// withCredentials: false
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

/* General Axios Instance for more API requests */
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

axiosInstance.interceptors.response.use((response) => {
  return response;
},
  async (error) => {
    const originalRequest = error.config;
    // If server throws 403 error, due to session expiration,
    if (error.response && error.response.status === 403 && !originalRequest.sent) { //if originalRequest.sent == true, !false = true
      originalRequest.sent = true;

      store.dispatch(resetAuthState());// Log the user out by calling the reset AuthState redux function that will make the global auth false
      redirectToPath(appPaths.AUTH_ROUTES.SIGNIN);

      const customError = new CustomError('Session expired! Please login again');
      throw customError
    }

    return Promise.reject(error);
  }
);

export default axiosInstance