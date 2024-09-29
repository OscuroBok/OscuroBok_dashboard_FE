import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";

import { useFormik } from "formik";
import * as Yup from "yup";

import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { resetPasswordValType } from "@/types/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setAuthState } from "@/store/auth/authSlice";
import { toast } from "react-toastify";
import { Box, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { IconEye, IconEyeOff, IconTrash, IconUser } from "@tabler/icons-react";
import { resetPassword } from "@/services/authService";
import { appPaths } from "@/utils/helper/appPaths";

// Validation schema using YUP
const validationSchema = Yup.object({
  password: Yup.string()
    .required("New Password is required")
    .matches(/^\S*$/, "Whitespace is not allowed")
    .min(8, "Password must be atleast 8 characters long"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .matches(/^\S*$/, "Whitespace is not allowed")
    .min(8, "Password must be atleast 8 characters long")
    .oneOf(
      [Yup.ref("password")],
      "New Password and Confirm Password should match"
    ),
});

const initialFormValues: resetPasswordValType = {
  password: "",
  token: '',
  confirmPassword: "",
};

export default function AuthResetPassword({token} : any) {
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (values: resetPasswordValType) => {
    setSubmitting(true);
    const payloadObj = {
      token,
      password: values.password,
      confirmPassword: values.confirmPassword
    }
    const data = await resetPassword(payloadObj);
    if(data) {
      router.push(appPaths.AUTH_ROUTES.SIGNIN);
    }
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack mt={4} spacing={2}>
          <CustomFormLabel htmlFor="password">New Password</CustomFormLabel>
          <CustomTextField
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment style={{ cursor: "pointer" }} position="end">
                  {showPassword ? (
                    <IconEye
                      width={20}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <IconEyeOff
                      width={20}
                      data-testid="np-icon-eye-off"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />

          <CustomFormLabel htmlFor="confirmPassword">
            Confirm Password
          </CustomFormLabel>
          <CustomTextField
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            fullWidth
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
            InputProps={{
              endAdornment: (
                <InputAdornment style={{ cursor: "pointer" }} position="end">
                  {showConfirmPassword ? (
                    <IconEye
                      width={20}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  ) : (
                    <IconEyeOff
                      width={20}
                      data-testid="cp-icon-eye-off"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  )}
                </InputAdornment>
              ),
            }}
          />

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
                Submit
              </Button>
            )}
          </Box>
        </Stack>
      </form>
    </>
  );
}
