import {
  Box,
  Typography,
  Button,
  Divider,
  InputAdornment,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { Stack } from "@mui/system";
import AuthSocialButtons from "../../auth/AuthForms/AuthSocialButtons";
import * as Yup from "yup";
import { authProps, registerFormValType } from "@/types/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { IconEye, IconEyeOff, IconTrash } from "@tabler/icons-react";
import CustomSelect from "../forms/theme-elements/CustomSelect";
import { LoadingButton } from "@mui/lab";
import { register } from "@/services/authService";
import { appPaths } from "@/utils/helper/appPaths";
import { toast } from "react-toastify";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is mandatory"),
  email: Yup.string()
    .email("Must be an email")
    .required("Email address is mandatory"),
  contact_no: Yup.string()
    .min(10, "Not a valid Contact Number")
    .required("Contact Number is mandatory"),
  password: Yup.string().required("Password is mandatory"),
  role_id: Yup.string().required("Please select a role"), // Added validation for the dropdown
});

export const roleData = [
  {
    label: "User",
    value: "4",
  },
  {
    label: "Super Admin",
    value: "1",
  },
  {
    label: "Admin",
    value: "2",
  },
];

const initialFormValues: registerFormValType = {
  email: "",
  name: "",
  contact_no: "",
  password: "",
  role_id: "",
};
const AuthRegister = ({ title, subtitle, subtext }: authProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: registerFormValType) => {
    console.log("hit", values);
    setSubmitting(true);
    const data = await register(values);
    setSubmitting(false);
    if (data) {
      router.push(appPaths.AUTH_ROUTES.SIGNIN);
    }
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <form onSubmit={formik.handleSubmit}>
        <AuthSocialButtons title="Sign up with" />

        <Box mt={3}>
          <Divider>
            <Typography
              component="span"
              color="textSecondary"
              variant="h6"
              fontWeight="400"
              position="relative"
              px={2}
            >
              or sign up with
            </Typography>
          </Divider>
        </Box>

        <Box>
          <Stack mb={3}>
            <Box>
              <CustomFormLabel htmlFor="name">Full Name</CustomFormLabel>
              <CustomTextField
                id="name"
                name="name"
                variant="outlined"
                fullWidth
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Box>
            <Box>
              <CustomFormLabel htmlFor="role_id" sx={{ mt: 0 }}>
                Role
              </CustomFormLabel>
              <CustomSelect
                id="role_id"
                name="role_id"
                fullWidth
                variant="outlined"
                displayEmpty
                value={formik.values.role_id}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.role_id && Boolean(formik.errors.role_id)}
              >
                <MenuItem disabled value="">
                  Select Role
                </MenuItem>
                {roleData.map((option: any) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomSelect>
              {formik.errors.role_id && formik.touched.role_id && (
                <FormHelperText error id="standard-weight-helper-text-ttl">
                  {formik.errors.role_id}
                </FormHelperText>
              )}
            </Box>
            <Box>
              <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
              <CustomTextField
                id="email"
                name="email"
                variant="outlined"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Box>
            <Box>
              <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
              <CustomTextField
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      style={{ cursor: "pointer" }}
                      position="end"
                    >
                      {showPassword ? (
                        <IconEye
                          width={20}
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <IconEyeOff
                          width={20}
                          data-testid="icon-eye-off"
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Box>
              <CustomFormLabel htmlFor="contact_no">
                Phone Number
              </CustomFormLabel>
              <CustomTextField
                id="contact_no"
                name="contact_no"
                variant="outlined"
                fullWidth
                value={formik.values.contact_no}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.contact_no && Boolean(formik.errors.contact_no)
                }
                helperText={
                  formik.touched.contact_no && formik.errors.contact_no
                }
              />
            </Box>
          </Stack>
          <Box>
            {submitting ? (
              <LoadingButton
                loading
                variant="contained"
                color="secondary"
                size="large"
                fullWidth
                endIcon={<IconTrash width={18} />}
              >
                Right Icon
              </LoadingButton>
            ) : (
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                type="submit"
              >
                Create Account
              </Button>
            )}
          </Box>
        </Box>
      </form>
      {subtitle}
    </>
  );
};

export default AuthRegister;
