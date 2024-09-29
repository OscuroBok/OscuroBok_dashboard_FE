import { ModuleType } from "@/types/module";
import api from "./configs/axiosConfigs";
import { toast } from "react-toastify";

export const getAllModules = async (): Promise<ModuleType | null> => {
    try {
      const response = await api.get('/modules');
      if(response?.data?.statusCode === 200 && response?.data?.success === true) {
        const loginResponse = response?.data?.data?.result?.[0] as ModuleType;
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