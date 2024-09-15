// import { userSignIn } from "../../../utils/auth/index";
// import {
//   Card,
//   Input,
//   Checkbox,
//   Button,
//   Typography,
//   Alert,
// } from "@material-tailwind/react";
// import { useMutation } from "@tanstack/react-query";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

import { userSignIn } from "../../../utils/auth/index";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaTwitter } from 'react-icons/fa';

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const { mutateAsync, isError, error } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => userSignIn({ email, password }),
  });

  async function submitHandler(e) {
    e.preventDefault();
    if (email.trim() !== "" && password.trim() !== "") {
      try {
        const data = await mutateAsync();
        sessionStorage.setItem("token", data.token);
        setEmail("");
        setPassword("");
        navigate("/");
      } catch (err) {
        setShowAlert(true);
        console.error(`Error occurred in SignIn route: ${error}`);
      }
    } else {
      setShowAlert(true);
    }
  }

  return (
    <section className="m-8 flex gap-4">
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Sign In</h2>
          <p className="text-lg text-blue-gray-600 font-normal">
            Enter your email and password to Sign In.
          </p>
        </div>
        {showAlert && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
            Please fill values
          </div>
        )}
        {isError && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
            Something Went Wrong
          </div>
        )}
        <form
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
          onSubmit={submitHandler}
        >
          <div className="mb-6">
            <label className="block text-sm text-blue-gray-600 mb-1 font-medium" htmlFor="email">
              Your email
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@mail.com"
              className="w-full p-3 border border-blue-gray-200 rounded-lg focus:border-gray-900 focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm text-blue-gray-600 mb-1 font-medium" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="********"
              className="w-full p-3 border border-blue-gray-200 rounded-lg focus:border-gray-900 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              id="terms"
              className="mr-2"
            />
            <label htmlFor="terms" className="text-sm text-gray-600 font-medium">
              I agree to the
              <a href="#" className="text-black underline ml-1 hover:text-gray-900">
                Terms and Conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600"
          >
            Sign In
          </button>
          <div className="flex items-center justify-between gap-2 mt-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="subscribe"
                className="mr-2"
              />
              <label htmlFor="subscribe" className="text-sm text-gray-600 font-medium">
                Subscribe me to newsletter
              </label>
            </div>
            <a href="#" className="text-sm text-gray-900 hover:underline font-medium">
              Forgot Password
            </a>
          </div>
          <div className="space-y-4 mt-8">
            <button
              type="button"
              className="w-full bg-white text-gray-900 py-3 rounded-lg shadow-md flex items-center justify-center gap-2"
            >
              <FaGoogle size={24} className="text-blue-500" />
              <span>Sign in With Google</span>
            </button>
            <button
              type="button"
              className="w-full bg-white text-gray-900 py-3 rounded-lg shadow-md flex items-center justify-center gap-2"
            >
              <FaTwitter size={24} className="text-blue-500" />
              <span>Sign in With Twitter</span>
            </button>
          </div>
          <p className="text-center text-blue-gray-500 font-medium mt-4">
            Not registered?
            <Link to="/auth/sign-up" className="text-gray-900 ml-1">
              Create account
            </Link>
          </p>
        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
          alt="Decorative pattern"
        />
      </div>
    </section>
  );
}

export default SignIn;
