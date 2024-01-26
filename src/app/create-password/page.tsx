'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Loader from '../components/Loader'
import { useGlobalContext } from '../components/Context'

const page = () => {
  const { loading, handleLoader } = useGlobalContext();
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: ""
  });
  const router = useRouter();

  const { password, confirmPassword } = passwordData;

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  }

  const handleCreatePassword = async() => {
    try {
      const res = await axios.post("/api/create-password", passwordData);
      console.log(res);
    } catch (error) {
      console.error(error);
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
              Create New Password
            </h3>
            <form className="p-4">
              <div className="flex flex-col gap-2 mb-3">
                <label htmlFor="email" className="text-sm font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="bg-white rounded-md p-2 text-sm font-medium outline-none"
                  value={password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2 mb-3">
                <label htmlFor="password" className="text-sm font-semibold">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="bg-white rounded-md p-2 text-sm font-medium outline-none"
                  value={confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <button
                type="button"
                onClick={handleCreatePassword}
                className="bg-[#B20D30] rounded-md p-2 text-white text-base font-semibold transition-colors hover:bg-[#E11340]"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default page