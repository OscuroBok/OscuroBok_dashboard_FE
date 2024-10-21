import {  loginFormValType, resetPasswordValType } from "@/types/auth";
import api from "./configs/axiosConfigs";
import { toast } from "react-toastify";
import { profileFormType, profilePayloadType } from "@/types/profile";
import { changePasswordType } from "@/types/profile";

export const getProfileDetails = async (): Promise<any> => {
  try {
    const response = await api.get('/users/my-info');
    if(response?.data?.statusCode === 200 && response?.data?.success === true) {
      const loginResponse = response?.data?.data?.result
      return loginResponse;
    } else {
      toast.error("Something went wrong!");
    }
    return null;
  } catch (error: any) {
    toast.error(error?.response?.data?.errors?.[0] ?? "Something went wrong!");
    console.log('error', error);
    return null;
  }
};

export const updateProfileDetails = async (payload: profilePayloadType): Promise<any> => {
  try {
    const response = await api.patch('/users/update-profile', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    if(response?.data?.statusCode === 200 && response?.data?.success === true) {
      const loginResponse = response?.data?.data?.result
      toast.success(response?.data?.message ?? "Profile update successful! Your information has been updated.");
      return loginResponse;
    } else {
      toast.error("Something went wrong!");
    }
    return null;
  } catch (error: any) {
    toast.error(error?.response?.data?.errors?.[0] ?? "Something went wrong!");
    console.log('error', error);
    return null;
  }
};

export const changePassword = async (payload: changePasswordType): Promise<any> => {
  try {
    const response = await api.patch("users/change-password", payload);
    if(response?.data?.statusCode === 200 && response?.data?.success === true) {
      toast.success(response?.data?.message ?? "You have successfully changed your password!");
      const changePasswordResponse = response?.data?.success
      return changePasswordResponse;
    } else {
      toast.error("Something went wrong!");
    }
    return null;
  } catch (error: any) {
    toast.error(error?.response?.data?.errors?.[0] ?? "Something went wrong!");
    console.log('error', error);
    return null;
  }
};