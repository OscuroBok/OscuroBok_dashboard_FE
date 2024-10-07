import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useFormik } from "formik";
import CustomTextField from "@/app/components/forms/theme-elements/CustomTextField";
import CustomFormLabel from "@/app/components/forms/theme-elements/CustomFormLabel";
import { forgotPasswordValType } from "@/types/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { IconTrash } from "@tabler/icons-react";
import { verifyOtp } from "@/services/authService";
import { appPaths } from "@/utils/helper/appPaths";
import OtpInput from "react-otp-input";

// Initial form values for testing
const initialFormValues: forgotPasswordValType = {
  email: "test@example.com", // Pre-fill a default email for testing
};

export default function AuthForgotPassword() {
  const [submitting, setSubmitting] = useState(false);
  const [otpFormVisible, setOtpFormVisible] = useState(false); // Start with email form visible
  const [otpValue, setOtpValue] = useState(""); // Store OTP value
  const dispatch = useDispatch();
  const router = useRouter();

  // Handle OTP submission
  const handleOtpSubmit = async () => {
    setSubmitting(true);
    const data = await verifyOtp({ email: formik.values.email, otp: otpValue });
    if (data) {
      toast.success("OTP verified! Password reset process initiated.");
      formik.resetForm();
      setOtpValue(""); // Clear OTP input after success
    } else {
      toast.error("Invalid OTP, please try again.");
    }
    setSubmitting(false);
  };

  // Handle email submission to switch to OTP form
  const handleSubmit = async (values: forgotPasswordValType) => {
    setSubmitting(true);
    // Here you'd usually send the email to the server to trigger OTP
    toast.success("Simulating email submission, showing OTP form.");
    formik.resetForm();
    setOtpFormVisible(true); // Show the OTP form
    setSubmitting(false);
  };

  // Handle going back to the email form
  const handleBackToEmailForm = () => {
    setOtpFormVisible(false); // Go back to email form
  };

  // Formik setup
  const formik = useFormik({
    initialValues: initialFormValues,
    onSubmit: handleSubmit, // Skip validation for testing
  });

  const handleBackToLogin = () => {
    router.push(appPaths.AUTH_ROUTES.SIGNIN);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack mt={4} spacing={2}>
        <Box
          sx={{
            transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out", // Smooth transition
            opacity: otpFormVisible ? 0 : 1,
            transform: otpFormVisible ? "translateX(-100%)" : "translateX(0)",
            position: otpFormVisible ? "absolute" : "relative",
          }}
        >
          {/* Email Form */}
          {!otpFormVisible && (
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
          )}
        </Box>

        <Box
          sx={{
            transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out", // Smooth transition for OTP form
            opacity: otpFormVisible ? 1 : 0,
            transform: otpFormVisible ? "translateX(0)" : "translateX(100%)",
            position: otpFormVisible ? "relative" : "absolute",
          }}
        >
          {/* OTP Form */}
          {otpFormVisible && (
            <>
              <CustomFormLabel htmlFor="otp">
                Enter OTP sent to {formik.values.email}
                <br />
                <span
                  onClick={handleBackToEmailForm}
                  style={{
                    marginLeft: "8px",
                    color: "blue",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  (Edit Email)
                </span>
              </CustomFormLabel>
              <OtpInput
                value={otpValue}
                onChange={setOtpValue} // Use direct setOtpValue
                numInputs={6}
                inputType="tel" // To allow numeric inputs
                renderInput={(inputProps) => (
                  <input
                    {...inputProps}
                    style={{
                      width: "40px",
                      height: "40px",
                      fontSize: "18px",
                      borderRadius: "4px",
                      border: "1px solid #ccc",
                      textAlign: "center",
                    }}
                  />
                )}
                containerStyle={{ justifyContent: "center", gap: "8px" }}
              />
              <Box mt={2}>
                {submitting ? (
                  <LoadingButton
                    loading
                    variant="contained"
                    color="secondary"
                    size="large"
                    fullWidth
                  >
                    Verifying OTP
                  </LoadingButton>
                ) : (
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleOtpSubmit}
                  >
                    Submit OTP
                  </Button>
                )}
              </Box>
            </>
          )}
        </Box>

        {/* Back to Login Button */}
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
