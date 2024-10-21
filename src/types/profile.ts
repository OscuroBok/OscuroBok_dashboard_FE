import { FormikProps } from "formik";
import { RoleDataType } from "./roles";

export interface profileFormType {
  profileImage: MediaSource | null;
  firstName: string;
  lastName: string;
}

export interface profilePayloadType {
  profileImage?: MediaSource | null;
  firstName: string;
  lastName: string;
}

export interface profileSliceType {
  _id: string;
  email: string;
  createdAt: string;
  firstName: string;
  isSuperAdmin: boolean;
  lastName: string;
  status: boolean;
  updatedAt: string;
  fullName: string;
  slot: number;
  redirect_rule: number;
  role: RoleDataType | null;
  profileImage: string;
  companyName: string;
}

export interface ProfileInformationProps {
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  submitting: boolean;
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  formik: FormikProps<profileFormType>;
  profile: profileSliceType;
  setFormValues: () => void
  setNewImageUploaded: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface ProfileBannerProps {
  isEdit: boolean;
  submitting: boolean;
  profile: profileSliceType;
  formik: FormikProps<profileFormType>;
  newImageUploaded: boolean;
  setNewImageUploaded: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface changePasswordType {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

