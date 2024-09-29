import {
  forgotPasswordValType,
  loginFormValType,
  registerFormValType,
  resetPasswordValType,
} from "@/types/auth";
import api, { axiosPublic } from "./configs/axiosConfigs";
import { toast } from "react-toastify";
import { hasCookie, setCookie, deleteCookie } from "cookies-next";

export const register = async (payload: registerFormValType) => {
  try {
    const response = await axiosPublic.post("/user-registration", payload);
    if (response?.status === 201) {
      const { message, data, success } = response.data;
      if (success) {
        toast.success(message || "User registered successfully!");
        return data;
      } else {
        toast.error("Failed to register! Please try again.");
        return null;
      }
    } else {
      toast.error("Unexpected response from the server.");
      return null;
    }
  } catch (error: any) {
    toast.error(error?.response?.data?.errors?.[0] ?? "Something went wrong!");
    console.log("error", error);
    return null;
  }
};

export const login = async (payload: loginFormValType): Promise<any> => {
  try {
    const response = await axiosPublic.post("/login", payload);
    if (response?.status === 200) {
      const { message, data, token } = response.data;
      const authToken = token;
      console.log(token);
      if (data && token) {
        if (!hasCookie(authToken)) {
          setCookie("authToken", authToken, { path: "/", maxAge: 3600 });
          toast.success(message || "User logged in successfully!");
          return data;
        }
      } else {
        deleteCookie("authToken");
        toast.error("Failed to login! Please try again.");
        return null;
      }
    } else {
      toast.error("Unexpected response from the server.");
      return null;
    }
    return null;
  } catch (error: any) {
    toast.error(error?.response?.data?.errors?.[0] ?? "Something went wrong!");
    console.log("error", error);
    return null;
  }
};

// export const logout = async (): Promise<boolean> => {
//   try {
//     const response = await api.get("/auth/logout", { withCredentials: true });
//     if (
//       response?.data?.statusCode === 200 &&
//       response?.data?.success === true
//     ) {
//       toast.success(response?.data?.message ?? "Logout successful!");
//       return true;
//     } else {
//       toast.error("Something went wrong!");
//     }
//     return false;
//   } catch (error: any) {
//     toast.error(error?.response?.data?.errors?.[0] ?? "Something went wrong!");
//     console.log("error", error);
//     return false;
//   }
// };

export const forgotPassword = async (
  payload: forgotPasswordValType
): Promise<any> => {
  try {
    const response = await axiosPublic.post("/auth/forgot-password", payload);
    if (
      response?.data?.statusCode === 200 &&
      response?.data?.success === true
    ) {
      const forgotPasswordResponse = response?.data?.data?.result;
      toast.success(
        response?.data?.message ?? "The reset password mail sent successfully!"
      );
      return forgotPasswordResponse;
    } else {
      toast.error("Something went wrong!");
    }
    return null;
  } catch (error: any) {
    toast.error(error?.response?.data?.errors?.[0] ?? "Something went wrong!");
    console.log("error", error);
    return null;
  }
};

export const resetPassword = async (
  payload: resetPasswordValType
): Promise<any> => {
  try {
    const token = payload.token;
    const data = {
      password: payload.password,
      confirmPassword: payload.confirmPassword,
    };
    const response = await axiosPublic.patch(
      `/auth/reset-password/${token}`,
      data
    );
    if (
      response?.data?.statusCode === 200 &&
      response?.data?.success === true
    ) {
      const resetPasswordResponse = response?.data?.data?.result;
      toast.success(
        response?.data?.message ?? "Your password has been reset successfully!"
      );
      return resetPasswordResponse;
    } else {
      toast.error("Something went wrong!");
    }
    return null;
  } catch (error: any) {
    toast.error(error?.response?.data?.errors?.[0] ?? "Something went wrong!");
    console.log("error", error);
    return null;
  }
};

export const validateToken = async (token: string): Promise<any> => {
  try {
    const response = await axiosPublic.post(`/auth/validate/${token}`);
    if (response?.data?.success === true) {
      return { success: true, loading: false };
    } else {
      toast.error("Something went wrong!");
    }
    return { success: false, loading: true };
  } catch (error: any) {
    console.log("error", error.response.data);
    if (error.response.data.statusCode === 400) {
      return { success: false, loading: false };
    } else {
      toast.error(
        error?.response?.data?.errors?.[0] ?? "Something went wrong!"
      );
      return { success: false, loading: true };
    }
  }
};
