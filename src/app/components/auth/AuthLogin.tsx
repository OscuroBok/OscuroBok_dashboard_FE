"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { authProps, loginFormValType } from "@/types/auth";
import { useState } from "react";
import { IconEye, IconEyeOff, IconTrash } from "@tabler/icons-react";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { setAuthState } from "@/store/auth/authSlice";
import { useRouter } from "next/navigation";
import {
  Divider,
  FormControlLabel,
  FormGroup,
  InputAdornment,
} from "@mui/material";
import { login } from "@/services/authService";
import { appPaths } from "@/utils/helper/appPaths";
import AuthSocialButtons from "@/app/auth/AuthForms/AuthSocialButtons";
import CustomCheckbox from "../forms/theme-elements/CustomCheckbox";

// Validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/^\S*$/, "Whitespace is not allowed")
    .min(8, "Password must be atleast 8 characters long"),
});

const initialFormValues: loginFormValType = {
  email: "",
  password: "",
};

const AuthLogin = ({ title, subtitle, subtext }: authProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (values: loginFormValType) => {
    // console.log("hit")
    setSubmitting(true);
    const data = await login(values);
    setSubmitting(false);
    if (data) {
      dispatch(setAuthState());
      router.push(appPaths.AUTH_ROUTES.DASHBOARD);
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
        <AuthSocialButtons title="Sign in with" />
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
              or sign in with
            </Typography>
          </Divider>
        </Box>

        <Stack>
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
                        data-testid="icon-eye-off"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <FormGroup>
              <FormControlLabel
                control={<CustomCheckbox defaultChecked />}
                label="I agree with the Terms and Conditions"
              />
            </FormGroup>
            <Typography
              component={Link}
              href={`${appPaths.AUTH_ROUTES.FORGET_PASSWORD}`}
              fontWeight="500"
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              Forgot Password ?
            </Typography>
          </Stack>
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
              Login
            </Button>
          )}
        </Box>
      </form>
      {subtitle}
    </>
  );
};

export default AuthLogin;
