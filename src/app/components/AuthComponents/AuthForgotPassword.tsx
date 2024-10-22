import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useFormik } from "formik";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { forgotPasswordValType } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { IconTrash } from "@tabler/icons-react";
import { appPaths } from "@/utils/helper/appPaths";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Must be a valid email")
    .required("Email is required"),
});

// Initial form values for testing
const initialFormValues: forgotPasswordValType = {
  email: "", // Pre-fill a default email for testing
};

export default function AuthForgotPassword() {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: forgotPasswordValType) => {
    console.log(values);
    setSubmitting(true);
    toast.success("Simulating email submission, showing OTP form.");
    router.push(appPaths.AUTH_ROUTES.TWO_STEP_VERIFICATION)
    formik.resetForm();
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  const handleBackToLogin = () => {
    router.push(appPaths.AUTH_ROUTES.SIGNIN);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack mt={4} spacing={2}>
        <Box
          sx={{
            transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
          }}
        >
          <>
            <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
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
                  Submitting...
                </LoadingButton>
              ) : (
                <Button
                  style={{ marginTop: "20px" }}
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  type="submit"
                >
                  Submit Email
                </Button>
              )}
            </Box>
          </>
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
  );
}
