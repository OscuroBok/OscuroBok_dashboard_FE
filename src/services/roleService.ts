import api from "./configs/axiosConfigs";
import { toast } from "react-toastify";
import { updateUserType, userType } from "@/types/users";
import { FormValueType, RoleDataType } from "@/types/roles";
import { PaginationPropsType } from "@/types/common";

export const createRole = async (payload: FormValueType): Promise<any> => {
  try {
    const response = await api.post("/rolePermission/create", payload);
    if (
      response?.data?.statusCode === 201 &&
      response?.data?.success === true
    ) {
      toast.success(
        response?.data?.message ?? "Role has been successfully created!"
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

export const getAllRoles = async (payload: string): Promise<{data: RoleDataType[], paginationData: PaginationPropsType } | null> => {
    try {
      let response;
      if (payload) {
        response = await api.get(`rolePermission?${payload}`);
      } else {
        response = await api.get("/rolePermission");
      }
      if (
        response?.data?.statusCode === 200 &&
        response?.data?.success === true
      ) {
        const getAllRoleResponse = response?.data?.data?.result;
        const getAllRolePaginationResponse = response?.data?.data?.meta;
        return {
          data: getAllRoleResponse as unknown as RoleDataType[],
          paginationData: getAllRolePaginationResponse as unknown as PaginationPropsType,
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

  export const getRole = async (id: string): Promise<{
    role: RoleDataType,
  } | null> => {
    try {
      let response;
      response = await api.get(`/rolePermission/${id}`);
      if (
        response?.data?.statusCode === 200 &&
        response?.data?.success === true
      ) {
        const role = response?.data?.data?.result as unknown as RoleDataType;
        return {
          role,
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

  export const updateRole = async (roleId: String, payload: FormValueType): Promise<boolean> => {
    try {
      const response = await api.put(`/rolePermission/${roleId}`, payload);
      if (
        response?.data?.statusCode === 200 &&
        response?.data?.success === true
      ) {
        toast.success(
          response?.data?.message ?? "Role has been updated successfully!"
        );
        return true;
      } else {
        toast.error("Something went wrong!");
      }
      return false;
    } catch (error: any) {
      toast.error(error?.response?.data?.errors?.[0] ?? "Something went wrong!");
      console.log("error", error);
      return false;
    }
  };

  export const getRolesForDropdown = async (): Promise<{data: RoleDataType[]} | null> => {
    try {
       let response = await api.get("/rolePermission/lists");

      if (
        response?.data?.statusCode === 200 &&
        response?.data?.success === true
      ) {
        const getAllRoleResponse = response?.data?.data?.result;
        return {
          data: getAllRoleResponse as unknown as RoleDataType[],
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