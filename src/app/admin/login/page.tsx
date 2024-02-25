'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Loader from '@/app/components/Loader'
import { useGlobalContext } from '@/app/components/Context'
import { LuEye, LuEyeOff } from "react-icons/lu"

const page = () => {
  const { loading, handleLoader, showPassword, handleShowPassword } = useGlobalContext();
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  });
  const router = useRouter();

  const { email, password } = userData;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  const handleLogin = async () => {
    try {
      const res = await axios.post("/api/admin/login", userData);
      if (res.data.message !== "You have logged in successfully") {
        toast.error(res.data.message, {
          position: "top-right"
        });
      }
      else {
        toast.success(res.data.message, {
          position: "top-right"
        });
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 500);
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
              Login Form
            </h3>
            <form className="p-4">
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
              <button
                type="button"
                onClick={handleLogin}
                className="bg-[#B20D30] rounded-md p-2 text-white text-base font-semibold transition-colors hover:bg-[#E11340]"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default page