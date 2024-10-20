"use client";
import {
  Box,
  Breadcrumbs,
  Link,
  Stack,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Image from "next/image";
import FormTabs from "@/app/components/forms/form-horizontal/FormTabs";
import BasicLayout from "@/app/components/forms/form-horizontal/BasicLayout";
import CountrySelectAutocomplete from "@/app/components/forms/form-elements/autoComplete/CountrySelectAutocomplete";
// import UploadBanner from "../../assets/upload-banner.png";
// import UploadImage from "../../assets/upload-image.png";

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

const page = () => {
  function handleClick(): void {
    console.info("You clicked a breadcrumb.");
  }
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
      onClick={handleClick}
    >
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/profile"
      onClick={() => handleClick()}
    >
      Profile
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/domain/manage-vendor"
      sx={{ cursor: "pointer", fontWeight: "bold" }}
      onClick={() => handleClick()}
    >
      Account Settings
    </Link>,
  ];

  const [value, setValue] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange: handleInputChange,
    handleSubmit,
    setFieldValue,
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
    <Box
      sx={{
        display: "block",
        flexDirection: "column",
        flexGrow: 1,
        height: "100vh",
        zIndex: 1,
        width: "100%",
        backgroundColor: "#f2f2f2",
        padding: "12px",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          marginBottom: "12px",
        }}
      >
        Account Settings
      </Typography>
      <Stack spacing={2}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>

      {/* FORM TABS */}
      <Box sx={{ width: "100%", mt: 5 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs">
            <Tab label="General Info" id="general-info-tab" />
            <Tab label="Documents" id="documents-tab" />
            <Tab label="Social Sites" id="social-sites-tab" />
            <Tab label="Profile & Banner" id="profile-banner-tab" />
          </Tabs>
        </Box>
        {/* General Info Tab */}
        <Box
          role="tabpanel"
          hidden={value !== 0}
          id={`general-info-panel`}
          aria-labelledby={`general-info-tab`}
        >
          {value === 0 && (
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
                        renderInput={(params) => (
                          <TextField {...params} fullWidth />
                        )}
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
                      error={
                        touched.mobileNumber && Boolean(errors.mobileNumber)
                      }
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
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                >
                  <Button type="submit" variant="contained">
                    Save Changes
                  </Button>
                </Box>
              </form>
            </Box>
          )}
        </Box>
        {/* Documents Tab */}
        <Box
          role="tabpanel"
          hidden={value !== 1}
          id={`documents-panel`}
          display={"flex"}

          aria-labelledby={`documents-tab`}
        >
          {value === 1 && (
            <Box sx={{ p: 3, fontWeight: 400 }}>
              {/* Document upload components */}
              <Typography variant="h2" sx={{py:3}}>Documents Upload</Typography>

              {/* Vendor's Aadhaar ID */}
              <TextField
                type="file"
                fullWidth
                label="Vendor's Aadhaar ID"
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: ".pdf" }}
                sx={{ mb: 2 }}
              />

              {/* Liquor License* */}
              <TextField
                type="file"
                fullWidth
                label="Liquor License"
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: ".pdf" }}
                required
                sx={{ mb: 2 }}
              />

              {/* FSSAI License */}
              <TextField
                type="file"
                fullWidth
                label="FSSAI License"
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: ".pdf,.jpg,.jpeg,.png" }}
                required
                sx={{ mb: 2 }}
              />

              {/* Regular GSTIN */}
              <TextField
                type="file"
                fullWidth
                label="Regular GSTIN"
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: ".pdf,.jpg,.jpeg,.png" }}
                required
                sx={{ mb: 2 }}
              />

              {/* Business License* */}
              <TextField
                type="file"
                fullWidth
                label="Business License*"
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: ".pdf,.jpg,.jpeg,.png" }}
                required
                sx={{ mb: 2 }}
              />

              {/* Entertainment License */}
              <TextField
                type="file"
                fullWidth
                label="Entertainment License"
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: ".pdf,.jpg,.jpeg,.png" }}
                sx={{ mb: 2 }}
              />

              {/* FL ON License */}
              <TextField
                type="file"
                fullWidth
                label="FL ON License"
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: ".pdf,.jpg,.jpeg,.png" }}
                required
                sx={{ mb: 2 }}
              />

              {/* FL-BW */}
              <TextField
                type="file"
                fullWidth
                label="FL-BW"
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: ".pdf,.jpg,.jpeg,.png" }}
                sx={{ mb: 2 }}
              />

              {/* Temporary Liquor License/Temporary Bar License */}
              <TextField
                type="file"
                fullWidth
                label="Temporary Liquor License/Temporary Bar License"
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: ".pdf,.jpg,.jpeg,.png" }}
                sx={{ mb: 2 }}
              />
            </Box>
          )}
        </Box>

        {/* Social Sites Tab */}
        <Box
          role="tabpanel"
          hidden={value !== 2}
          id={`social-sites-panel`}
          aria-labelledby={`social-sites-tab`}
        >
          {value === 2 && (
            <Box sx={{ p: 3 }}>
              {/* Add social site input fields here */}
              Social Sites Tab Content
            </Box>
          )}
        </Box>
        {/* Profile & Banner Tab */}
        <Box
          role="tabpanel"
          hidden={value !== 3}
          id={`profile-banner-panel`}
          aria-labelledby={`profile-banner-tab`}
        >
          {value === 3 && (
            <Box sx={{ p: 3 }}>
              {/* Add profile picture and banner upload components here */}
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  {/* Profile Picture Upload */}
                  <Box
                    sx={{
                      border: "1px dashed #ccc",
                      borderRadius: "4px",
                      p: 3,
                      textAlign: "center",
                      position: "relative",
                      height: "300px",
                    }}
                  >
                    {/* Image Preview (If Available) */}
                    {/* Example: */}
                    {/* {selectedProfileImage && (
                      <Image
                        src={URL.createObjectURL(selectedProfileImage)}
                        alt="Profile Preview"
                        layout="fill"
                        objectFit="cover"
                      />
                    )} */}

                    {/* Upload Icon */}
                    {/* <Image src={UploadImage} alt="Upload Profile" /> */}

                    <Typography variant="body2" color="textSecondary">
                      Upload Profile Picture
                    </Typography>

                    {/* Hidden File Input */}
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id="profilePictureInput"
                      // onChange={handleProfileImageChange}
                    />

                    {/* Button Triggering File Input */}
                    <Button
                      variant="contained"
                      component="label"
                      htmlFor="profilePictureInput"
                      sx={{ mt: 2 }}
                    >
                      Choose File
                    </Button>
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  {/* Banner Image Upload */}
                  <Box
                    sx={{
                      border: "1px dashed #ccc",
                      borderRadius: "4px",
                      p: 3,
                      textAlign: "center",
                      position: "relative",
                      height: "300px",
                    }}
                  >
                    {/* Image Preview (If Available) */}
                    {/* Example: */}
                    {/* {selectedBannerImage && (
                      <Image
                        src={URL.createObjectURL(selectedBannerImage)}
                        alt="Banner Preview"
                        layout="fill"
                        objectFit="cover"
                      />
                    )} */}

                    {/* Upload Icon */}
                    {/* <Image src={UploadBanner} alt="Upload Banner" /> */}

                    <Typography variant="body2" color="textSecondary">
                      Upload Banner Image
                    </Typography>

                    {/* Hidden File Input */}
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      id="bannerImageInput"
                      // onChange={handleBannerImageChange}
                    />

                    {/* Button Triggering File Input */}
                    <Button
                      variant="contained"
                      component="label"
                      htmlFor="bannerImageInput"
                      sx={{ mt: 2 }}
                    >
                      Choose File
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default page;
