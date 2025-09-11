import { Lock, User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/auth/authSlice";
import {useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({username,email,password,role,}).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (error) {
        console.log(error);
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <>
      <div className="mx-auto items-center w-screen md: bg-gray-100 h-screen">
        <div className="flex flex-col mt-14 mx-auto w-full sm:w-[80%] md:w-[60%] lg:w-[50%] gap-4 md:bg-white p-6 rounded-lg md:shadow-lg">
          <h1 className="text-2xl font-semibold mb-1 underline">Sign-In</h1>
          <form onSubmit={submitHandler}>
            {/* Username Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <div className="flex items-center border rounded border-gray-300">
                <User className="text-gray-400 ml-2" size={20} />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-2 py-2 outline-none"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <div className="flex items-center border rounded border-gray-300">
                <User className="text-gray-400 ml-2" size={20} />
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-2 py-2 outline-none"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="flex items-center border rounded border-gray-300">
                <Lock className="text-gray-400 ml-2" size={20} />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-2 py-2 outline-none"
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="flex items-center border rounded border-gray-300">
                <Lock className="text-gray-400 ml-2" size={20} />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-2 py-2 outline-none"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Role
              </label>
              <div className="flex items-center space-x-6">
                {/* Teacher Option */}
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="teacher"
                    checked={role === "teacher"}
                    onChange={(e) => setRole(e.target.value)}
                    className="text-blue-500 accent-blue-500"
                  />
                  <span>Teacher</span>
                </label>

                {/* Student Option */}
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    checked={role === "student"}
                    onChange={(e) => setRole(e.target.value)}
                    className="text-blue-500 accent-blue-500"
                  />
                  <span>Student</span>
                </label>
              </div>
            </div>

            {/* Submit button */}

            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded cursor-pointer my-1 w-30"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
