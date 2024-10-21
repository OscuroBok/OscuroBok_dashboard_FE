import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";

import { useFormik } from "formik";
import * as Yup from "yup";

import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { forgotPasswordValType } from "@/types/auth";
import { setAuthState } from "@/store/auth/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { IconTrash } from "@tabler/icons-react";
import { forgotPassword } from "@/services/authService";
import { appPaths } from "@/utils/helper/appPaths";

// Validation schema using YUP
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is required"),
});

const initialFormValues: forgotPasswordValType = {
  email: "",
};

export default function AuthForgotPassword() {
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (values: forgotPasswordValType) => {
    setSubmitting(true);
    const data = await forgotPassword(values);
    if(data) {
      formik.resetForm();
    }
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const handleBackToLogin = () => {
    router.push(appPaths.AUTH_ROUTES.SIGNIN)
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack mt={4} spacing={2}>
          <CustomFormLabel htmlFor="email">Email Adddress</CustomFormLabel>
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
          <Button
            color="primary"
            size="large"
            fullWidth
            onClick={handleBackToLogin}
          >
            Back to Login
          </Button>
        </Stack>
      </form>
    </>
  );
}
