import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link,useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form"
import { useState } from "react";


export function SignUp() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  // Handling Form Submission
  const onSubmit = (data) => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log(data);
      setIsSubmitting(false);
      navigate('/auth/sign-in')
    }, 2000); 
  };
  

  return (
    <section className="m-8 lg:m-0 w-[100vw] rounded-lg flex">
      <div className="lg:w-2/5 lg:h-screen bg-[#8BB2B2] hidden lg:flex lg:flex-col">
        
      </div>
      <div className="w-full flex flex-col  mx-auto lg:w-3/5  items-start lg:p-4 px-9  lg:items-center  justify-center">
        <div className="">
          <Typography variant="h3" className="h-[42px] text-[#525252]  mb-4">Create Account</Typography>
          <div className="flex gap-3 flex-col lg:flex-row ">
            <button className="h-[40px]  flex gap-1 rounded-lg text-[#A1A1A1] text-[16px] border border-[#E8E8E8] px-4 py-2">
            <img src="../../../public/img/logo-google.png" /> Continue with Google</button>
            <button className="h-[40px]  flex gap-1 rounded-lg text-[#A1A1A1] text-[16px] border border-[#E8E8E8] px-4 py-2"><img src="../../../public/img/logo-facebook.png" />Continue with Facebook</button>
          </div>
        </div>

        {/* Form */}
        <form className="mt-10 flex flex-col gap-7  " onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name Input */}
          <input className="h-[29px] text-[14px] font-[500] lg:w-[464px] border-b px-2 py-1 focus:outline-none " placeholder="Full Name" {...register("fullName",{required: true})} />
          {errors.fullName && <span className="text-red-400">Name cannot be empty!</span>}

          {/* Login Type */}
          <select
        className="h-[29px] lg:w-[464px] text-[14px] font-[500]  border-b-2 px-2 py-1 focus:outline-none bg-white text-[#A1A1A1]"
        {...register("dropdown", { required: "Please select an option" })}
          >
            <option value="" disabled selected hidden>Log in as:</option>
            <option value="user" className="text-[#464F60] text-[14px] font-[500]">User</option>
            <option value="superAdin" className="text-[#D1293D] text-[14px] font-[500]">Super Admin</option>
            <option value="Vendor" className="text-[#FF964F] text-[14px] font-[500]">Vendor</option>
          </select>
          {errors.dropdown && <span className="text-red-400">{errors.dropdown.message}</span>}

          {/* Email Input */}
          <input className="h-[29px] text-[14px] font-[500] lg:w-[464px] border-b px-2 py-1 focus:outline-none" placeholder="Email Address" {...register("email",{required: true})} />
          {errors.email && <span className="text-red-400">Please give correct email!</span>}

          {/* Password Input */}
          <input type="password" className="h-[29px] text-[14px] font-[500] lg:w-[464px] border-b px-2 py-1 focus:outline-none" placeholder="Password" {...register("Password", { 
          required: "Password is required", 
          minLength: { value: 8, message: "Password must be at least 8 characters long" }, 
          maxLength: { value: 20, message: "Password cannot exceed 20 characters" },
          pattern: {
            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,20}$/,
            message: "Password must include at least one uppercase letter, one lowercase letter, one digit."
                  }
            })}  />
          {errors.Password && <span className="text-red-400 max-w-md">{errors.Password.message}</span>}

          {/* Phone Number Input */}
          <input type="text" className="h-[29px] text-[14px] font-[500] lg:w-[464px] border-b px-2 py-1 focus:outline-none" placeholder="Phone Number" {...register("phone", { required: true })} />
          {errors.phone && <span className="text-red-400">Please provide with a phone number.</span>}

          {/* Submit  */}
          <div className="flex flex-col">
            <button
          type="submit"
          className={`w-full py-2 text-white font-semibold text-lg rounded-md bg-[#8BB2B2] cursor-pointer hover:bg- [#76a4a4] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitting}
          >
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
            <span className="text-xm text-[#A1A1A1]">Already have an account? <Link to={'/auth/sign-in'}><span className="text-[#8BB2B2]">Login</span></Link> </span>
        </div>
         
        </form>
          

      </div>
    </section>
  );
}

export default SignUp;
