export interface loginFormValType {
  email: string;
  password: string;
}

export interface registerFormValType {
  name: string;
  email: string;
  password: string;
  contact_no: string;
  role_id: string;
}

export interface forgotPasswordValType {
  email: string;
}

export interface resetPasswordValType {
  password: string;
  token: string;
  confirmPassword: string;
}

export interface authSliceType {
  isLoggedIn: boolean;
}

export interface validateTokenType {
  token: string;
}

interface recordItemType {
  label: string;
  value: string | null;
}

export interface registerRoleType {
  label: keyof recordItemType;
  value: keyof recordItemType;
}

export interface authProps {
  title: string;
  subtitle: string;
  subtext: string;
}