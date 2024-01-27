'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Loader from '../components/Loader'
import { useGlobalContext } from '../components/Context'
import { LuEye, LuEyeOff  } from "react-icons/lu";

const page = () => {
  const { loading, handleLoader, showPassword, showConfirmPassword, handleShowPassword, handleShowConfirmPassword} = useGlobalContext();
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: ""
  });
  const router = useRouter();

  const { firstName, lastName, email, mobile, password, confirmPassword } = userData;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  const handleSignup = async () => {
    try {
      const res = await axios.post("/api/signup", userData);
      if (res.data.message !== "You have registered successfully") {
        toast.error(res.data.message, {
          position: "top-right"
        });
      }
      else {
        toast.success(res.data.message, {
          position: "top-right"
        });
        setTimeout(() => {
          router.push("/email-verification");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleLoader();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full h-full md:px-0 px-5 flex items-center justify-center">
          <ToastContainer autoClose={4000} />
          <div className="w-[inherit] max-w-lg mx-auto bg-gray-300 rounded-md">
            <h3 className="text-xl text-gray-800 font-semibold border-b border-gray-600 py-3 px-4">
              Signup Form
            </h3>
            <form className="p-4">
              <div className="flex flex-col gap-2 mb-3">
                <label htmlFor="firstName" className="text-sm font-semibold">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="bg-white rounded-md p-2 text-sm font-medium outline-none"
                  value={firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2 mb-3">
                <label htmlFor="lastName" className="text-sm font-semibold">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="bg-white rounded-md p-2 text-sm font-medium outline-none"
                  value={lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2 mb-3">
                <label htmlFor="email" className="text-sm font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="bg-white rounded-md p-2 text-sm font-medium outline-none"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2 mb-3">
                <label htmlFor="mobile" className="text-sm font-semibold">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  name="mobile"
                  className="bg-white rounded-md p-2 text-sm font-medium outline-none"
                  value={mobile}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2 mb-3">
                <label htmlFor="password" className="text-sm font-semibold">
                  Password
                </label>
                <div className='w-full flex items-center justify-between bg-white rounded-md p-2'>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-[inherit] text-sm font-medium outline-none"
                    value={password}
                    onChange={handleChange}
                  />
                  {showPassword ? (
                    <LuEyeOff onClick={handleShowPassword} className="cursor-pointer" size={18}/>
                  ) : (
                    <LuEye onClick={handleShowPassword} className="cursor-pointer" size={18} />
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 mb-3">
                <label htmlFor="confirmPassword" className="text-sm font-semibold">
                  Confirm Password
                </label>
                <div className='w-full flex items-center justify-between bg-white rounded-md p-2'>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    className="w-[inherit] text-sm font-medium outline-none"
                    value={confirmPassword}
                    onChange={handleChange}
                  />
                   {showConfirmPassword ? (
                    <LuEyeOff onClick={handleShowConfirmPassword} className="cursor-pointer" size={18}/>
                  ) : (
                    <LuEye onClick={handleShowConfirmPassword} className="cursor-pointer" size={18} />
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 pb-3">
                <span className="text-gray-800 text-sm font-medium">
                  Already have an account?
                </span>
                <Link
                  href="/login"
                  className="text-sm font-medium text-[#B20D30] hover:underline"
                >
                  Login
                </Link>
              </div>
              <button
                type="button"
                onClick={handleSignup}
                className="bg-[#B20D30] rounded-md p-2 text-white text-base font-semibold transition-colors hover:bg-[#E11340]"
              >
                Signup
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default page