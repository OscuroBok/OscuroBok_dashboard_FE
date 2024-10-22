"use client";
import DocumentUploadForm from "@/app/components/forms/form-tabs/DocumentUploadForm";
import GeneralInfoForm from "@/app/components/forms/form-tabs/GeneralInfoForm";
import ImagesUploadForm from "@/app/components/forms/form-tabs/ImagesUploadForm";
import SocialSitesForm from "@/app/components/forms/form-tabs/SocialSitesForm";
import {
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Link,
  Stack,
  Tab,
  Tabs,
  Typography
} from "@mui/material";
import React, { useState } from "react";
// import UploadBanner from "../../assets/upload-banner.png";
// import UploadImage from "../../assets/upload-image.png";



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
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
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
            <GeneralInfoForm />
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
          {value === 1 && 
            <DocumentUploadForm />
          }
        </Box>

        {/* Social Sites Tab */}
        <Box
          role="tabpanel"
          hidden={value !== 2}
          id={`social-sites-panel`}
          aria-labelledby={`social-sites-tab`}
        >
          {value === 2 && 
            <SocialSitesForm />
          }
        </Box>
        {/* Profile & Banner Tab */}
        <Box
          role="tabpanel"
          hidden={value !== 3}
          id={`profile-banner-panel`}
          aria-labelledby={`profile-banner-tab`}
        >
          {value === 3 && (
            <ImagesUploadForm />
          )}
        </Box>  
      </Box>
    </Box>
  );
};

export default page;
