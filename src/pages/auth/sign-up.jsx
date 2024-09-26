import {
  Typography,
  Alert
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { signUp } from "@/services/auth/authService";
import { appPaths } from "@/utils/constants";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is mandatory"),
  email: Yup.string().email("Must be an email").required("Email address is mandatory"),
  contact_no: Yup.string()
  .matches(/^\d{10}$/, "Contact Number must be exactly 10 digits and contain only numbers")
  .required("Contact Number is mandatory"),
  password: Yup.string().min(9).required("Password is mandatory"),
  role_id: Yup.string().required("Please select a role") // Added validation for the dropdown
});

const initialValues = {
  email: "",
  name: "",
  contact_no: "",
  password: "",
  role_id: "" // Added initial value for the dropdown
};

export function SignUp() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    const data = await signUp(values);
    setIsSubmitting(false);
    if(data) {
      navigate(appPaths.AUTH_ROUTES.SIGNIN)
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const googleSignUp = () => { /* Google sign-up logic */ };
  const facebookSignUp = () => { /* Facebook sign-up logic */ };

  return (
    <div className="m-8 lg:m-0 bg-[#8BB2B2] flex">
      <div className="lg:w-[40%] lg:h-screen px-4 py-2 hidden lg:flex lg:flex-col">
        <div className="flex flex-col items-center justify-center h-screen">
          <div>
            <img className="h-[74px] xl:h-[80px] w-[74px] xl:w-[80px] ml-[-20px] mt-2 justify-center" src="/img/logo-oscurobook.png" alt="" />
            <div className="w-[227px] flex flex-col gap-3 items-center xl:gap-4">
              <h2 className="text-[50px] xl:text-[55px] font-[500] text-[#FFFFFF] font-poppins">OscuroBok</h2>
              <h2 className="text-[34px] font-[500] text-[#FFFFFF] font-poppins">Sign Up Form</h2>
            </div>
            <h4 className="mt-4 text-[#FFFFFF]">Make OscuroBok into reality</h4>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full flex flex-col lg:shadow-lg bg-[#FFFFFF] mx-auto lg:w-4/6 lg:rounded-l-3xl max-w-6xl items-start lg:p-4 lg:items-center justify-center">
        <div className="md:w-[60%] mx-auto">
          <Typography variant="h3" className="h-[42px] text-[#525252] font-poppins mb-4">Create Account</Typography>
          <div className="flex gap-3 flex-col lg:flex-row">
            <div className="lg:flex-1">
              <button onClick={googleSignUp} className="w-full h-[40px] flex gap-2 items-center justify-center rounded-lg text-[#A1A1A1] text-[16px] border border-[#E8E8E8] px-4 py-2 hover:bg-[#f3f3f3] transition-all duration-200">
                <img src="/img/logo-google.png" alt="Google logo" className="h-6" />
                <span className="hidden xl:inline">Continue with Google</span>
                <span className="inline xl:hidden">Google</span>
              </button>
            </div>
            <div className="lg:flex-1">
              <button onClick={facebookSignUp} className="w-full h-[40px] flex gap-2 items-center justify-center rounded-lg text-[#A1A1A1] text-[16px] border border-[#E8E8E8] px-4 py-2 hover:bg-[#f3f3f3] transition-all duration-200">
                <img src="/img/logo-facebook.png" alt="Facebook logo" className="h-6" />
                <span className="hidden xl:inline">Continue with Facebook</span>
                <span className="inline xl:hidden">Facebook</span>
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5 mt-5 md:w-[60%] mx-auto" onSubmit={formik.handleSubmit}>
          <span className="text-center text-[#A1A1A1] font-[500] text-[14px]">-OR-</span>

          {/* Full Name Input */}
          <div className="flex flex-col items-start justify-center">
            <input 
              className="h-[29px] text-[14px] text-[#6e6e6e] font-[500] w-full border-b px-2 py-1 focus:outline-none" 
              id="name" 
              name="name" 
              placeholder="Full Name" 
              value={formik.values.name} 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
            />
            {formik.touched.name && formik.errors.name && (
              <span className="text-red-400 text-xs">{formik.errors.name}</span>
            )}
          </div>

          {/* Role Dropdown */}
          <div className="flex flex-col w-full items-start justify-center">
            <select
              className="h-[29px] w-full text-[14px] font-[500] border-b-2 px-1 py-1 focus:outline-none bg-white text-[#A1A1A1]"
              id="role_id"
              name="role_id"
              value={formik.values.role_id}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="" disabled hidden>Log in as:</option>
              <option value="4" className="text-[#464F60] xl:text-[16px] font-[500]">User</option>
              <option value="1" className="text-[#D1293D] xl:text-[16px] font-[500]">Super Admin</option>
              <option value="2" className="text-[#FF964F] xl:text-[16px] font-[500]">Admin</option>
            </select>
            {formik.touched.role_id && formik.errors.role_id && (
              <span className="text-red-400 text-xs">{formik.errors.role_id}</span>
            )}
          </div>

          {/* Email Input */}
          <div className="flex flex-col items-start justify-center">
            <input 
              className="h-[29px] text-[14px] text-[#6e6e6e] font-[500] w-full border-b px-2 py-1 focus:outline-none" 
              id="email" 
              name="email" 
              placeholder="Email Address" 
              value={formik.values.email} 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-red-400 text-xs">{formik.errors.email}</span>
            )}
          </div>

          {/* Password Input */}
          <div className="flex flex-col items-start justify-center">
            <input 
              type="password" 
              className="h-[29px] text-[14px] text-[#6e6e6e] font-[500] w-full border-b px-2 py-1 focus:outline-none" 
              id="password" 
              name="password" 
              placeholder="Password" 
              value={formik.values.password} 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
            />
            {formik.touched.password && formik.errors.password && (
              <span className="text-red-400 text-xs">{formik.errors.password}</span>
            )}
          </div>

          {/* Phone Number Input */}
          <div className="flex flex-col items-start justify-center">
            <input 
              type="text" 
              className="h-[29px] text-[14px] text-[#6e6e6e] font-[500] w-full border-b px-2 py-1 focus:outline-none" 
              id="contact_no" 
              name="contact_no" 
              placeholder="Phone Number" 
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={formik.values.contact_no} 
              onChange={formik.handleChange} 
              onBlur={formik.handleBlur} 
              onKeyPress={(event) => {
                // Only allow numbers
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
            {formik.touched.contact_no && formik.errors.contact_no && (
              <span className="text-red-400 text-xs">{formik.errors.contact_no}</span>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col">
            <button
              type="submit"
              className={`w-full py-2 text-white font-semibold text-lg rounded-md bg-[#8BB2B2] cursor-pointer hover:bg-[#76a4a4] transition-all duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Account'}
            </button>
            <span className="text-xm text-[#A1A1A1]">Already have an account? <Link to={'/auth/sign-in'}><span className="text-[#8BB2B2]">Login</span></Link></span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
