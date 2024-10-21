import { toast } from "react-toastify";
import api from "./configs/axiosConfigs";
import {
  DashboardDnsRecordTemplates,
  DashboardDomains,
  DashboardTopDomains,
  DashboardUsers,
} from "@/types/dashboard";

export const getDashboardData = async (): Promise<{
  // allData: dashboardResType;
  usersData: DashboardUsers;
  domainsData: DashboardDomains;
  dnsTemplatesData: DashboardDnsRecordTemplates;
  topDomainsData: DashboardTopDomains;
} | null> => {
  try {
    const response = await api.get("/dashboard");
    // console.log(response);
    const { statusCode, success, data } = response?.data ?? {};
    const result = data ?? null;

    if (statusCode === 200 && success === true) {
      // console.log(result);
      const users = result?.result?.users as DashboardUsers;
      const domains = result?.result?.domains as DashboardDomains;
      const topDomains = result?.result?.topDomains as DashboardTopDomains;
      const dnsTemplates = result?.result
        ?.dns_record_templates as DashboardDnsRecordTemplates;
      return {
        usersData: users,
        domainsData: domains,
        topDomainsData: topDomains,
        dnsTemplatesData: dnsTemplates,
      };
    } else {
      toast.error("Something went wrong!");
      return null;
    }
  } catch (error: any) {
    console.log("error", error);
    toast.error(error?.response?.data?.errors?.[0] ?? "Something went wrong!");
    return null;
  }
};
