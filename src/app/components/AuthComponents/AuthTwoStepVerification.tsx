import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import OtpInput from "react-otp-input";

export default function AuthTwoStepVerification() {
  const [submitting, setSubmitting] = useState(false);
  const [otpValue, setOtpValue] = useState(""); // Store OTP value
  const [errorMessage, setErrorMessage] = useState(""); // Store error message

  const handleOtpSubmit = async () => {
    // Reset error message
    setErrorMessage("");

    // Validate OTP input
    if (otpValue.length === 0) {
      setErrorMessage("OTP cannot be empty.");
      return;
    }

    if (otpValue.length < 6) {
      setErrorMessage("Please enter a valid 6-digit OTP.");
      return;
    }

    // Proceed with OTP submission
    console.log(otpValue);
    // You can add your API call logic here
    setSubmitting(true);
    // Simulate API call delay
    setTimeout(() => {
      setSubmitting(false);
      // Handle success or failure response
    }, 2000);
  };

  useEffect(() => {
    
  }, [otpValue])

  return (
    <Stack mt={4} spacing={2}>
      <Box
        sx={{
          transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out", // Smooth transition for OTP form
        }}
      >
        <>
          <OtpInput
            value={otpValue}
            onChange={setOtpValue}
            numInputs={6}
            inputType="tel"
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
          {errorMessage && (
            <Typography color="error" variant="body2" mt={1}>
              {errorMessage}
            </Typography>
          )}
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
                Verify OTP
              </Button>
            )}
          </Box>
        </>
      </Box>
    </Stack>
  );
}