// import { url } from "@/utils/constants";
// import ax from "axios";


// const getAxios = ({ baseApiUrl, logoutUrl }) => {
//     const { dispatch } = store;
//     const axios = ax.create({
//       baseURL: baseApiUrl,
//       headers: {
//         common: {
//           'Content-Type': 'application/json',
//         },
//       },
//       timeout: 10000,
//     });

//     axios.interceptors.request.use(
//       (config) => {
//         if (loaderRef.current) {
//           loaderRef.current.continuousStart();
//         }
//         const userToken = getCookie('cbud-token');
//         if (userToken) {
//           config['headers']['Authorization'] = `Bearer ${userToken}`;
//         }
//         return config;
//       },
//       (error) => {
//         return Promise.reject(error.response);
//       }
//     );

//     axios.interceptors.response.use(
//       (response) => {
//         if (loaderRef.current) {
//           loaderRef.current.complete();
//         }
//         return response;
//       },
//       async (error) => {
//         if (loaderRef.current) {
//           loaderRef.current.complete();
//         }
//         const originalRequest = error.config;

//         if (
//           error.response.status === 400 &&
//           (window.location.pathname === RoutesConstant.TUTOR_LOGIN ||
//             window.location.pathname === RoutesConstant.PARENT_LOGIN)
//         ) {
//           originalRequest._retry = false;
//           return ax(originalRequest);
//         } else if (
//           error.response.status === 401 &&
//           !originalRequest._retry &&
//           (window.location.pathname !== RoutesConstant.TUTOR_LOGIN ||
//             window.location.pathname !== RoutesConstant.PARENT_LOGIN)
//         ) {
//           originalRequest._retry = true;

//           try {
//             const refreshToken = getCookie('cbud-refreshToken');
//             const response = await ax.post(`${baseUrl}/api/auth/login/refresh/`, {
//               refresh: refreshToken,
//             });
//             const token = response.data?.access;

//             setCookie('cbud-token', token);

//             originalRequest.headers.Authorization = `Bearer ${token}`;
//             return ax(originalRequest);
//           } catch (error) {
//             dispatch(logout());
//             dispatch(removeCount('notification'));
//             dispatch(removeCount('chat'));
//             dispatch(removePrePaymentDetails());
//             removeCookie('cbud-token');
//             removeCookie('cbud-refreshToken');
//             return (window.location.href = logoutUrl);
//           }
//         } else if (error.response.status === 500) {
//           originalRequest._retry = false;
//         }

//         return Promise.reject(error.response || error);
//       }
//     );

//     return axios;
//   };

//   export const axios = getAxios({
//     baseApiUrl: baseUrl,
//     logoutUrl: '/',
//   });


// export const instance = axios.create({
//     baseURL: url,
//     timeout: 5000,
//     // headers: {'X-Custom-Header': 'foobar'},
//     headers: {
//         // 'Content-Type': 'multipart/form-data',
//         "Access-Control-Allow-Origin": "*"
//       }
//   });

import { url } from "@/utils/constants";
import axios from "axios";
import { appPaths } from "@/utils/constants";
import { store } from "@/store/store";
import { resetAuthState } from "@/store/auth/authSlice";
import { redirectToPath } from "@/utils/redirect";

const BASE_URL = process.env.BACKEND_URL;

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

export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

axiosInstance.interceptors.response.use((response) => {
  return response;
},
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 403 && !originalRequest.sent) {
      originalRequest.sent = true;

      store.dispatch(resetAuthState());
      redirectToPath(appPaths.AUTH_ROUTES.SIGNIN);

      const customError = new CustomError('Session expired! Please login again');
      throw customError
    }

    return Promise.reject(error);
  }
);

export default axiosInstance