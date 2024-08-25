import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

// nm
export function SignIn() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // setIsSubmitting(true);
    console.log(data);
    setTimeout(() => {
      // setIsSubmitting(false);
      // navigate('/auth/sign-in')
    }, 2000);
  };

  const googleSignIn = () => {
    console.log("Signing in with Google");
  };

  const facebookSignIn = () => {
    console.log("Signing in with Facebook");
  };

  const handleBackButton = () => {
    navigate(-1);
  };

  return (  
    <div className="p-8 h-full flex lg:px-2">
      <button
          onClick={handleBackButton}
          className="absolute top-2 lg:top-5 left-2 lg:left-5 text-[#749494]"
        >
          <IoMdArrowRoundBack className="h-8 w-8" />
        </button>
        
      <div className="w-full lg:w-3/5 mt-6 ">
        <div className="text-center flex items-center justify-center">
            <img className="h-10 w-10 xl:h-14 xl:w-14 object-cover" src="/img/logo-oscurobook.png" alt="" />
          <h1 className="text-3xl text-[#749494] flex items-center justify-center  xl:text-5xl font-semibold">
            Welcome Back <span className="text-4xl">👋</span>
          </h1>
        </div>
        <div  className="mt-8 mb-2 mx-auto w-80  lg:w-3/5  ">
          <form onSubmit={handleSubmit(onSubmit)} className="mb-1 flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col lg:gap-2 items-start justify-center">
              <label htmlFor="email" className="font-roboto text-[#A1A1A1]">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="h-[35px] text-[14px] text-[#5f5f5f] font-[500] w-full border px-3 py-4 rounded-md focus:outline-dotted"
                placeholder="Example@email.com"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                    message: "Please enter a valid Gmail address!",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-400 text-xs">
                  {errors.email.message || "Please provide a correct email!"}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col lg:gap-2 items-start justify-center">
              <label htmlFor="password" className="font-roboto text-[#A1A1A1]">Password</label>
              <input type="password" id="password"  className="h-[35px] text-[14px] text-[#5f5f5f] font-[500] w-full border px-3 py-4 rounded-md focus:outline-dotted" placeholder="Password" {...register("password", { 
          required: "Password is required", 
          minLength: { value: 8, message: "Password must be at least 8 characters long" }, 
          maxLength: { value: 20, message: "Password cannot exceed 20 characters" },
          pattern: {
            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,20}$/,
            message: "Password must include at least one uppercase letter, one lowercase letter, one digit."
                  }
            })} />
              {errors.password && <span className="text-red-400 text-xs">{ errors.password.message}</span>}
            </div>
            
          
          <div className="flex items-center justify-end ">
            
            <Typography variant="small" className="font-medium text-gray-900">
              <Link to={'/'} className="text-[#464F60] font-roboto">Forgot Password?</Link>
            </Typography>
          </div>

          <Button type="submit" className=" bg-[#749494] font-medium" fullWidth>
            Sign In
          </Button>
          </form>

          <div className="w-full mt-5">
              <div className="flex items-center">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-4 text-gray-500">Or</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
          </div>

          <div className="space-y-4 mt-5 ">
            <Button size="lg"  className="flex items-center gap-2 justify-center  bg-[#F3F9FA]" onClick={googleSignIn} fullWidth>
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1156_824)">
                  <path
                    d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z"
                    fill="#34A853"
                  />
                  <path
                    d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1156_824">
                    <rect
                      width="16"
                      height="16"
                      fill="white"
                      transform="translate(0.5)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <span className="text-[#313957] hidden xl:inline">
                Sign in With Google
              </span>
              <span className="text-[#313957] inline xl:hidden">Google</span>
            </Button>
            <Button
              size="lg"
              className="flex items-center gap-2 justify-center  bg-[#F3F9FA]"
              onClick={facebookSignIn}
              fullWidth
            >
              <img src="/img/logo-facebook.png" height={24} width={24} alt="" />
              <span className="text-[#313957] hidden xl:inline">
                Sign in With Facebook
              </span>
              <span className="text-[#313957] inline xl:hidden">Facebook</span>
            </Button>
          </div>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-1 text-sm">
            Not registered?
            <Link to="/auth/sign-up" className="text-[#525252] ml-1">Create account</Link>
          </Typography>
        </div>
      </div>
      <div className="lg:w-2/5  max-h-[700px] hidden lg:block">
        <img
          src="/img/Login Art.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
    </div>
  );
}

export default SignIn;
