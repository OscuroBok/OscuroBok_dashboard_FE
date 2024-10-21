import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";

const ImagesUploadForm = () => {
  // State for storing selected images and errors
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [errors, setErrors] = useState({
    profileImage: "",
    bannerImage: "",
  });

  // Function to handle image selection and validation
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<File | null>>,
    imageType: "profileImage" | "bannerImage"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validation for file type and size
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          [imageType]: "Invalid file type. Please upload an image.",
        }));
        setImage(null);
      } else if (file.size > 2 * 1024 * 1024) {
        // 2MB size limit
        setErrors((prev) => ({
          ...prev,
          [imageType]: "File size exceeds 2MB. Please upload a smaller image.",
        }));
        setImage(null);
      } else {
        // If valid, clear errors and set the image
        setErrors((prev) => ({
          ...prev,
          [imageType]: "",
        }));
        setImage(file);
      }
    }
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profileImage || !bannerImage) {
      // Set error messages if images are not uploaded
      setErrors((prev) => ({
        profileImage: !profileImage ? "Please upload a profile image." : "",
        bannerImage: !bannerImage ? "Please upload a banner image." : "",
      }));
      return;
    }

    // Handle form submission (e.g., uploading images)
    const formData = new FormData();
    formData.append("profileImage", profileImage);
    formData.append("bannerImage", bannerImage);

    // Example submission (replace with your API call)
    console.log("Form Submitted");
    console.log(profileImage, bannerImage);

    // Reset form after submission if needed
    setProfileImage(null);
    setBannerImage(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <form onSubmit={handleSubmit}>
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
                "&:hover .upload-btn": {
                  opacity: profileImage ? 1 : 1, // Button visible if profile image exists
                },
              }}
            >
              {profileImage && (
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <img
                    src={URL.createObjectURL(profileImage)}
                    alt="Profile Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              )}
              {!profileImage && (
                <Typography variant="body2" color="textSecondary">
                  Upload Profile Picture
                </Typography>
              )}

              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="profilePictureInput"
                onChange={(e) =>
                  handleImageChange(e, setProfileImage, "profileImage")
                }
              />

              {/* Error Message */}
              {errors.profileImage && (
                <Typography variant="caption" color="error">
                  {errors.profileImage}
                </Typography>
              )}

              {/* Button Triggering File Input (Visible based on image state) */}
              <Button
                variant="contained"
                component="label"
                htmlFor="profilePictureInput"
                sx={{
                  mt: 2,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: profileImage ? 0 : 1, // Hide button if image exists
                  transition: "opacity 0.3s ease", // Smooth fade-in/out
                }}
                className="upload-btn"
              >
                {profileImage ? "Change Picture" : "Choose File"}
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
                "&:hover .upload-btn": {
                  opacity: bannerImage ? 1 : 1, // Button visible if banner image exists
                },
              }}
            >
              {bannerImage && (
                <Box
                  sx={{
                    height: "100%",
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <img
                    src={URL.createObjectURL(bannerImage)}
                    alt="Banner Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              )}
              {!bannerImage && (
                <Typography variant="body2" color="textSecondary">
                  Upload Banner Image
                </Typography>
              )}

              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                id="bannerImageInput"
                onChange={(e) =>
                  handleImageChange(e, setBannerImage, "bannerImage")
                }
              />

              {/* Error Message */}
              {errors.bannerImage && (
                <Typography variant="caption" color="error">
                  {errors.bannerImage}
                </Typography>
              )}

              {/* Button Triggering File Input (Visible based on image state) */}
              <Button
                variant="contained"
                component="label"
                htmlFor="bannerImageInput"
                sx={{
                  mt: 2,
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: bannerImage ? 0 : 1, // Hide button if image exists
                  transition: "opacity 0.3s ease", // Smooth fade-in/out
                }}
                className="upload-btn"
              >
                {bannerImage ? "Change Banner" : "Choose File"}
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Submit Button */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ImagesUploadForm;
