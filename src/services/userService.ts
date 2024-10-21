import api from "./configs/axiosConfigs";
import { toast } from "react-toastify";
import { updateUserType, userType } from "@/types/users";

export const createUser = async (payload: userType): Promise<any> => {
  try {
    const response = await api.post("user/create", payload);
    if (
      response?.data?.statusCode === 201 &&
      response?.data?.success === true
    ) {
      toast.success(
        response?.data?.message ?? "User has been successfully created!"
      );
      const changePasswordResponse = response?.data?.success;
      return changePasswordResponse;
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

export const getAllUsers = async (payload: string): Promise<any> => {
  try {
    let response;
    if (payload) {
      response = await api.get(`user?${payload}`);
    } else {
      response = await api.get("/user");
    }
    if (
      response?.data?.statusCode === 200 &&
      response?.data?.success === true
    ) {
      const getAllUSersResponse = response?.data?.data?.result;
      const getAllUSersPaginationResponse = response?.data?.data?.meta;
      return {
        data: getAllUSersResponse,
        paginationData: getAllUSersPaginationResponse,
      };
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

export const getParticularUser = async (id: any): Promise<any> => {
  try {
    const response = await api.get(`user/${id}`);
    if (
      response?.data?.statusCode === 200 &&
      response?.data?.success === true
    ) {
      const getParticularUserResponse = response?.data?.data?.result;
      return getParticularUserResponse;
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

export const updateUser = async (payload: updateUserType): Promise<any> => {
  try {
    const id = payload.id;
    if (payload.id) {
      delete payload.id;
    }
    if (payload.email) {
      delete payload.email;
    }
    const response = await api.put(`user/${id}`, payload);
    if (
      response?.data?.statusCode === 200 &&
      response?.data?.success === true
    ) {
      // toast.success(
      //   response?.data?.message ?? "User has been successfully updated!"
      // );
      const changePasswordResponse = response?.data?.success;
      return changePasswordResponse;
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

export const getUsersForDropdown = async (): Promise<any> => {
  try {
    let response = await api.get("/users/lists");
    if (
      response?.data?.statusCode === 200 &&
      response?.data?.success === true
    ) {
      const getAllUSersResponse = response?.data?.data?.result;
      return {
        data: getAllUSersResponse,
      };
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
