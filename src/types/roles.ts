import { ModuleType } from "./module";

export interface PermissionType {
  module: string;
  value: boolean;
}
export interface FormValueType {
  role: string;
  permissions: Array<PermissionType>;
}

export interface RoleDataType extends FormValueType {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: {
    firstName: string;
    lastName: string;
  }
  updatedBy: {
    firstName: string;
    lastName: string;
  }
}

export interface structuredRoleDataType extends RoleDataType {
    permissionStr: string;
}

export interface RoleQueryParamType {
  limit: number;
  page: number;
  query: string;
  from: string;
  to: string;
  direction: "asc" | "desc";
  sort: string;
}

export interface RoleFormModalType {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleReset: () => void;
  roleId: string | null;
  handleClose: () => void;
  moduleList: ModuleType | null;
}

export interface ViewRoleModalType {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  roleId: string | null;
  handleClose: () => void;
  moduleList: ModuleType | null;
}

export interface RoleFilterType {
  handleDateRangeFilter: (_start: string, _end: string) => void;
  from: string;
  to: string;
}