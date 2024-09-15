// import { Typography, Alert } from "@material-tailwind/react";
// import { Link, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { userRegistration } from "../../../utils/auth/index";

import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { userRegistration } from "../../../utils/auth/index";
import { FaGoogle, FaFacebook } from "react-icons/fa";

export function SignUp() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { mutateAsync, isError, error } = useMutation({
    mutationKey: ["user-registration"],
    mutationFn: (data) => {
      return userRegistration(data);
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const response = await mutateAsync(data);
    setIsSubmitting(false);
    if (response.success && !isError) {
      navigate("/auth/sign-in");
    } else {
      console.log("Signup Error", error.message);
    }
    reset();
  };

  const googleSignUp = () => {};
  const facebookSignUp = () => {};

  return (
    <div className="m-8 lg:m-0 bg-[#8BB2B2] flex">
      <div className="hidden lg:flex lg:w-2/5 lg:h-screen flex-col px-4 py-2 relative">
        <div className="flex flex-col items-center justify-center h-full">
          <img
            className="h-[74px] xl:h-[80px] w-[74px] xl:w-[80px] mb-4"
            src="/img/logo-oscurobook.png"
            alt="Logo"
          />
          <div className="text-center">
            <h2 className="text-[50px] xl:text-[55px] font-semibold text-white">
              OscuroBok
            </h2>
            <h2 className="text-[34px] font-semibold text-white">
              Sign Up Form
            </h2>
            <h4 className="mt-4 text-white">
              Make OscuroBok into reality
            </h4>
          </div>
        </div>
        <img
          className="absolute bottom-0 right-0 h-80 w-96 object-contain rotate-3"
          src="/img/abstraction-removebg.png"
          alt="Abstraction"
        />
      </div>

      <div className="w-full lg:w-3/5 bg-white shadow-lg rounded-l-3xl p-4 flex flex-col items-center">
        <div className="w-full md:w-3/5 mx-auto">
          {isError && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              Some error occurred, please try again
            </div>
          )}
          <h3 className="text-2xl font-semibold text-gray-600 mb-4">
            Create Account
          </h3>
          <div className="flex gap-3 flex-col lg:flex-row mb-4">
            <button
              onClick={googleSignUp}
              className="flex items-center justify-center w-full lg:w-1/2 h-10 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-200"
            >
              <FaGoogle className="h-6 w-6 mr-2" />
              <span className="hidden xl:inline">Continue with Google</span>
              <span className="inline xl:hidden">Google</span>
            </button>
            <button
              onClick={facebookSignUp}
              className="flex items-center justify-center w-full lg:w-1/2 h-10 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition duration-200"
            >
              <FaFacebook className="h-6 w-6 mr-2" />
              <span className="hidden xl:inline">Continue with Facebook</span>
              <span className="inline xl:hidden">Facebook</span>
            </button>
          </div>
        </div>

        <form
          className="w-full md:w-3/5 mx-auto flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <span className="text-center text-gray-500 font-medium text-sm">
            -OR-
          </span>

          {/* Full Name Input */}
          <div className="flex flex-col">
            <input
              className="border-b border-gray-300 p-2 text-gray-700 placeholder-gray-500"
              placeholder="Full Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="text-red-500 text-xs">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Login Type */}
          <div className="flex flex-col">
            <select
              className="border-b border-gray-300 p-2 text-gray-700 bg-white"
              {...register("role_id", { required: "Please select an option" })}
            >
              <option value="" disabled hidden>
                Log in as:
              </option>
              <option value="4">User</option>
              <option value="1">Super Admin</option>
              <option value="2">Admin</option>
            </select>
            {errors.role_id && (
              <span className="text-red-500 text-xs">
                {errors.role_id.message}
              </span>
            )}
          </div>

          {/* Email Input */}
          <div className="flex flex-col">
            <input
              className="border-b border-gray-300 p-2 text-gray-700 placeholder-gray-500"
              placeholder="Email Address"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <input
              type="password"
              className="border-b border-gray-300 p-2 text-gray-700 placeholder-gray-500"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password cannot exceed 20 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,20}$/,
                  message: "Password must include at least one uppercase letter, one lowercase letter, and one digit.",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Phone Number Input */}
          <div className="flex flex-col">
            <input
              type="text"
              className="border-b border-gray-300 p-2 text-gray-700 placeholder-gray-500"
              placeholder="Phone Number"
              {...register("contact_no", { required: "Phone number is required" })}
            />
            {errors.contact_no && (
              <span className="text-red-500 text-xs">
                {errors.contact_no.message}
              </span>
            )}
          </div>

          {/* Submit */}
          <div className="flex flex-col">
            <button
              type="submit"
              className={`w-full py-2 text-white font-semibold text-lg rounded-md bg-[#8BB2B2] cursor-pointer hover:bg-[#76a4a4] transition duration-200 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Account"}
            </button>
            <span className="text-xs text-gray-500 mt-2">
              Already have an account?{" "}
              <Link to="/auth/sign-in" className="text-[#8BB2B2]">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
