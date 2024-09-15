import {
Typography,
  Alert
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { userRegistration } from "@/services/auth";


export function SignUp() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()
  const { mutateAsync, isError, error } = useMutation({
    mutationKey: ['user-registration'],
    mutationFn: (data) => { return userRegistration(data) }
  })
  // Handling Form Submission
  const onSubmit = async (data) => {
    setIsSubmitting(true)
    const response = await mutateAsync(data);
    setIsSubmitting(false)
    if (response.success && !isError) {
      navigate("/auth/sign-in")
    }else{
      console.log("Signup Error",error.message)
    }
    reset()
  };

  const googleSignUp = () => {}
  const facebookSignUp = () => {}


  return (
    <div className="m-8 lg:m-0 bg-[#8BB2B2] flex">
      <div className="lg:w-[40%] lg:h-screen px-4 py-2  hidden lg:flex lg:flex-col">
        <div className="flex flex-col  items-center justify-center h-screen ">
          
          <div className="">
            <img className="h-[74px] xl:h-[80px] w-[74px] xl:w-[80px] ml-[-20px] mt-2" src="/img/logo-oscurobook.png" alt="" />
            <div className=" w-[227px] flex flex-col gap-3 items-center xl:gap-4">
              <h2 className="text-[50px] xl:text-[55px]  font-[500] h-[40px] text-[#FFFFFF] font-poppins left-[74px]">OscuroBok</h2>
              <h2 className="text-[34px]  font-[500] text-[#FFFFFF] font-poppins left-[74px]">Sign Up Form</h2>
            </div>
            <h4 className="mt-4 text-[#FFFFFF] ">Make OsccuroBok into reality</h4>
          </div>
        </div>
        <img
          className="h-80 z-10 w-96 bg-transparent object-contain justify-end self-end absolute top-[270.41px] left-[93.15px] "
          src="/img/abstraction-removebg.png"
          alt="abstraction.png"
          style={{ transform: 'rotate(2.72deg)' }}
        />
      </div>

      {/* Right Side */}
      <div className="w-full flex flex-col lg:shadow-lg bg-[#FFFFFF] mx-auto lg:w-4/6 lg:rounded-l-3xl max-w-6xl  items-start lg:p-4   lg:items-center justify-center ">

        <div className="md:w-[60%] mx-auto">
        {isError&&<Alert severity="error">Some Error Occured Pleaser Try Again</Alert>}
          <Typography variant="h3" className="h-[42px] text-[#525252] font-poppins  mb-4">Create Account</Typography>
          <div className="flex gap-3 flex-col lg:flex-row ">
            <div className="lg:flex-1">
              <button onClick={googleSignUp} className="w-full h-[40px] flex gap-2 items-center justify-center rounded-lg text-[#A1A1A1] text-[16px] border border-[#E8E8E8] px-4 py-2 hover:bg-[#f3f3f3] transition-all duration-200">
                <img src="/img/logo-google.png" alt="Google logo" className="h-6" />
                <span className="hidden xl:inline">Continue with Google</span>
                <span className="inline xl:hidden">Google</span>
              </button>
            </div>
            <div className="lg:flex-1">
              <button onClick={facebookSignUp} className="w-full h-[40px]  flex gap-2 items-center justify-center rounded-lg text-[#A1A1A1] text-[16px] border border-[#E8E8E8] px-4 py-2 hover:bg-[#f3f3f3] transition-all duration-200">
                <img src="/img/logo-facebook.png" alt="Facebook logo" className="h-6" />
                <span className="hidden xl:inline">Continue with Facebook</span>
                <span className="inline xl:hidden">Facebook</span>
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className=" flex flex-col gap-5 mt-5  md:w-[60%] mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <span className="text-center text-[#A1A1A1] font-[500] text-[14px]">-OR-</span>

          {/* Full Name Input */}
          <div className="flex flex-col items-start justify-center">
            <input className="h-[29px] text-[14px] text-[#6e6e6e] font-[500] w-full border-b px-2 py-1 focus:outline-none " placeholder="Full Name" {...register("name", { required: true })} />
            {errors.name && <span className="text-red-400 text-xs">Name cannot be empty!</span>}
          </div>

          {/* Login Type */}
          <div className="flex flex-col w-full items-start justify-center">
            <select
              className="h-[29px] w-full text-[14px]    font-[500]  border-b-2 px-1 py-1 focus:outline-none bg-white text-[#A1A1A1]"
              {...register("role_id", { required: "Please select an option" })}
            >
              <option value="" disabled selected hidden>Log in as:</option>
              <option value="4" className="text-[#464F60] xl:text-[16px] font-[500]">User</option>
              <option value="1" className="text-[#D1293D] xl:text-[16px] font-[500]">Super Admin</option>
              <option value="2" className="text-[#FF964F] xl:text-[16px] font-[500]">Admin</option>
            </select>
            {errors.dropdown && <span className="text-red-400 text-xs">{errors.dropdown.message}</span>}
          </div>

          {/* Email Input */}
          <div className="flex flex-col items-start justify-center">
            <input className="h-[29px] text-[14px] text-[#6e6e6e] font-[500] w-full border-b px-2 py-1 focus:outline-none" placeholder="Email Address" {...register("email", { required: true })} />
            {errors.email && <span className="text-red-400 text-xs">Please give correct email!</span>}
          </div>

          {/* Password Input */}
          <div className="flex flex-col items-start justify-center">
            <input type="password" className="h-[29px] text-[14px] text-[#6e6e6e] font-[500] w-full border-b px-2 py-1 focus:outline-none" placeholder="Password" {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters long" },
              maxLength: { value: 20, message: "Password cannot exceed 20 characters" },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,20}$/,
                message: "Password must include at least one uppercase letter, one lowercase letter, one digit."
              }
            })} />
            {errors.password && <span className="text-red-400 max-w-md text-xs">{errors.password.message}</span>}
          </div>

          {/* Phone Number Input */}
          <div className="flex flex-col items-start justify-center">
            <input type="text" className="h-[29px] text-[14px] text-[#6e6e6e] font-[500] w-full border-b px-2 py-1 focus:outline-none" placeholder="Phone Number" {...register("contact_no", { required: true })} />
            {errors.contact_no && <span className="text-red-400 text-xs">Please provide with a phone number.</span>}
          </div>

          {/* Submit  */}
          <div className="flex flex-col">
            <button
              type="submit"
              className={`w-full py-2 text-white font-semibold text-lg rounded-md bg-[#8BB2B2] ] cursor-pointer hover:bg-[#76a4a4] transition-all duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Account'}
            </button>
            <span className="text-xm text-[#A1A1A1]">Already have an account? <Link to={'/auth/sign-in'}><span className="text-[#8BB2B2]">Login</span></Link> </span>
          </div>

        </form>

      </div>
    </div>
  );
}

export default SignUp;
