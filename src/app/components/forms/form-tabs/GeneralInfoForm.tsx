import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import CountrySelectAutocomplete from "../form-elements/autoComplete/CountrySelectAutocomplete";

const GeneralInfoForm = () => {
  const validationSchema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    mobileNumber: yup
      .string()
      .required("Mobile number is required")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    address: yup.string().required("Address is required"),
    state: yup.string().required("State is required"),
    country: yup.string().required("Country is required"),
    restaurantName: yup.string().required("Restaurant name is required"),
    cuisine: yup.string().required("Cuisine is required"),
  });

  const [selectedDate, setSelectedDate] = useState(null);

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange: handleInputChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobileNumber: "",
      email: "",
      address: "",
      state: "",
      country: "",
      biography: "",
      cuisine: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Box sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* First Name */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="First Name"
              id="firstName"
              name="firstName"
              value={values.firstName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={touched.firstName && Boolean(errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />
          </Grid>
          {/* Last Name */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Last Name"
              id="lastName"
              name="lastName"
              value={values.lastName}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={touched.lastName && Boolean(errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Grid>
          {/* Date of Birth */}
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of Birth"
                value={selectedDate}
                onChange={(newValue) => {
                  setSelectedDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          {/* Mobile Number */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Mobile Number"
              id="mobileNumber"
              name="mobileNumber"
              value={values.mobileNumber}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={touched.mobileNumber && Boolean(errors.mobileNumber)}
              helperText={touched.mobileNumber && errors.mobileNumber}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
            />
          </Grid>
          {/* Email */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
          </Grid>

          {/* Restaurant Name */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Address"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={touched.address && Boolean(errors.address)}
              helperText={touched.address && errors.address}
            />
            {/* <Button
                      variant="contained"
                      onClick={() => {
                        if (navigator.geolocation) {
                          navigator.geolocation.getCurrentPosition(
                            (position) => {
                              const { latitude, longitude } = position.coords;
                              // Fetch the address based on the coordinates using a reverse geocoding API
                              fetch(
                                `https://api.example.com/reverse-geocode?lat=${latitude}&lng=${longitude}`
                              )
                                .then((response) => response.json())
                                .then((data) => {
                                  // Assuming data.address contains the full address
                                  handleInputChange({
                                    target: {
                                      name: "address",
                                      value: data.address,
                                    },
                                  });
                                });
                            },
                            (error) => {
                              console.error("Error fetching location:", error);
                            }
                          );
                        } else {
                          console.error(
                            "Geolocation is not supported by this browser."
                          );
                        }
                      }}
                    >
                      Use Current Location
                    </Button> */}
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="cuisine-label">Cuisine</InputLabel>
              <Select
                labelId="cuisine-label"
                id="cuisine"
                name="cuisine"
                value={values.cuisine}
                label="Cuisine"
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={touched.cuisine && Boolean(errors.cuisine)}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Indian</MenuItem>
                <MenuItem value={20}>Chinese</MenuItem>
                <MenuItem value={30}>Italian</MenuItem>
              </Select>
              <FormHelperText
                error={touched.cuisine && Boolean(errors.cuisine)}
              >
                {touched.cuisine && errors.cuisine}
              </FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <CountrySelectAutocomplete />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                label="Biography"
                id="biography"
                name="biography"
                value={values.biography}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={touched.biography && Boolean(errors.biography)}
                helperText={touched.biography && errors.biography}
                multiline
                rows={4}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default GeneralInfoForm;
