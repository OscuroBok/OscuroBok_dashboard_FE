import { Box, Button, TextField, Typography } from '@mui/material';
import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

// Define TypeScript interface for form values
interface DocumentUploadFormValues {
  aadhaarId: File | null;
  liquorLicense: File | null;
  fssaiLicense: File | null;
  gstin: File | null;
  businessLicense: File | null;
  entertainmentLicense: File | null;
  flOnLicense: File | null;
  flBw: File | null;
  tempLiquorLicense: File | null;
}

// Yup validation schema
const validationSchema = Yup.object().shape({
  aadhaarId: Yup.mixed().required("Vendor's Aadhaar ID is required"),
  liquorLicense: Yup.mixed().required('Liquor License is required'),
  fssaiLicense: Yup.mixed().required('FSSAI License is required'),
  gstin: Yup.mixed().required('Regular GSTIN is required'),
  businessLicense: Yup.mixed().required('Business License is required'),
  flOnLicense: Yup.mixed().required('FL ON License is required'),
});

const DocumentUploadForm: React.FC = () => {
  const initialValues: DocumentUploadFormValues = {
    aadhaarId: null,
    liquorLicense: null,
    fssaiLicense: null,
    gstin: null,
    businessLicense: null,
    entertainmentLicense: null,
    flOnLicense: null,
    flBw: null,
    tempLiquorLicense: null,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        // Handle form submission logic here
      }}
    >
      {({ setFieldValue, touched, errors, isSubmitting }) => (
        <Form>
          <Box sx={{ p: 3, fontWeight: 400 }}>
            <Typography variant="h2" sx={{ py: 3 }}>
              Documents Upload
            </Typography>

            {/* Vendor's Aadhaar ID */}
            <TextField
              type="file"
              fullWidth
              label="Vendor's Aadhaar ID"
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: '.pdf' }}
              sx={{ mb: 2 }}
              error={touched.aadhaarId && Boolean(errors.aadhaarId)}
              helperText={<ErrorMessage name="aadhaarId" />}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue('aadhaarId', event.currentTarget.files?.[0] || null)
              }
            />

            {/* Liquor License */}
            <TextField
              type="file"
              fullWidth
              label="Liquor License"
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: '.pdf' }}
              required
              sx={{ mb: 2 }}
              error={touched.liquorLicense && Boolean(errors.liquorLicense)}
              helperText={<ErrorMessage name="liquorLicense" />}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue('liquorLicense', event.currentTarget.files?.[0] || null)
              }
            />

            {/* FSSAI License */}
            <TextField
              type="file"
              fullWidth
              label="FSSAI License"
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: '.pdf,.jpg,.jpeg,.png' }}
              required
              sx={{ mb: 2 }}
              error={touched.fssaiLicense && Boolean(errors.fssaiLicense)}
              helperText={<ErrorMessage name="fssaiLicense" />}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue('fssaiLicense', event.currentTarget.files?.[0] || null)
              }
            />

            {/* Regular GSTIN */}
            <TextField
              type="file"
              fullWidth
              label="Regular GSTIN"
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: '.pdf,.jpg,.jpeg,.png' }}
              required
              sx={{ mb: 2 }}
              error={touched.gstin && Boolean(errors.gstin)}
              helperText={<ErrorMessage name="gstin" />}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue('gstin', event.currentTarget.files?.[0] || null)
              }
            />

            {/* Business License */}
            <TextField
              type="file"
              fullWidth
              label="Business License"
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: '.pdf,.jpg,.jpeg,.png' }}
              required
              sx={{ mb: 2 }}
              error={touched.businessLicense && Boolean(errors.businessLicense)}
              helperText={<ErrorMessage name="businessLicense" />}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue('businessLicense', event.currentTarget.files?.[0] || null)
              }
            />

            {/* Entertainment License */}
            <TextField
              type="file"
              fullWidth
              label="Entertainment License"
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: '.pdf,.jpg,.jpeg,.png' }}
              sx={{ mb: 2 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue('entertainmentLicense', event.currentTarget.files?.[0] || null)
              }
            />

            {/* FL ON License */}
            <TextField
              type="file"
              fullWidth
              label="FL ON License"
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: '.pdf,.jpg,.jpeg,.png' }}
              required
              sx={{ mb: 2 }}
              error={touched.flOnLicense && Boolean(errors.flOnLicense)}
              helperText={<ErrorMessage name="flOnLicense" />}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue('flOnLicense', event.currentTarget.files?.[0] || null)
              }
            />

            {/* FL-BW */}
            <TextField
              type="file"
              fullWidth
              label="FL-BW"
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: '.pdf,.jpg,.jpeg,.png' }}
              sx={{ mb: 2 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue('flBw', event.currentTarget.files?.[0] || null)
              }
            />

            {/* Temporary Liquor License */}
            <TextField
              type="file"
              fullWidth
              label="Temporary Liquor License/Temporary Bar License"
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: '.pdf,.jpg,.jpeg,.png' }}
              sx={{ mb: 2 }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setFieldValue('tempLiquorLicense', event.currentTarget.files?.[0] || null)
              }
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button type="submit" variant="contained" disabled={isSubmitting}>
                Save Changes
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default DocumentUploadForm;
