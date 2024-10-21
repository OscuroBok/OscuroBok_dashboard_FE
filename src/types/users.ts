import { SelectChangeEvent } from "@mui/material";
import { RoleDataType } from "./roles";

export interface userType {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    status: string;
    slot: string;
    redirect_rule: string;
    role: string;
}

export interface updateUserType {
    id?: string;
    firstName: string;
    lastName: string;
    status: string;
    slot: string;
    email?: string;
}

export interface userFilterType {
    handleFilter: (_key: string, _value: string) => void;
    filterVal: {
        status: string,
        role: string;
    };
    handleDateRangeFilter: (_start: string, _end: string) => void;
    from: string,
    to: string,
    roleData: RoleDataType[]
}