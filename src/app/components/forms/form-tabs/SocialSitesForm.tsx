import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const SocialSitesForm = () => {
  const validationSchema = yup.object({
    facebookUrl: yup
      .string()
      .url("Enter a valid Facebook URL")
      .required("Facebook URL is required"),
    instagramUrl: yup
      .string()
      .url("Enter a valid Instagram URL")
      .required("Instagram URL is required"),
  });
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange: handleInputChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      facebookUrl: "",
      instagramUrl: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Box sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Box display={"flex"} flexDirection={"column"} gap={5} width={"50%"}>
          <Typography variant="h2" sx={{ py: 3 }}>
            Social Sites
          </Typography>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Facebook URL"
              id="facebookUrl"
              name="facebookUrl"
              value={values.facebookUrl}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={touched.facebookUrl && Boolean(errors.facebookUrl)}
              helperText={touched.facebookUrl && errors.facebookUrl}
            />
          </Grid>
          {/* Instagram Url */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Instagram URL"
              id="instagramUrl"
              name="instagramUrl"
              value={values.instagramUrl}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={touched.instagramUrl && Boolean(errors.instagramUrl)}
              helperText={touched.instagramUrl && errors.instagramUrl}
            />
          </Grid>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SocialSitesForm;
