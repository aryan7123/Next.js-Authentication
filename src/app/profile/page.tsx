'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Loader from '../components/Loader'
import { useGlobalContext } from '../components/Context'

const page = () => {
  const { loading, handleLoader } = useGlobalContext();
  const [userDetails, setUserDetails] = useState([]);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/logout");
      if (res.data.message === "Logout Successful") {
        toast.success(res.data.message, {
          position: "top-right"
        });
        router.push("/login");
      }
      else {
        toast.error(res.data.message, {
          position: "top-right"
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleFetchUser = async () => {
    try {
      const res = await axios.get("/api/profile");
      setUserDetails(res.data.user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleFetchUser();
    handleLoader();
  }, []);

  return (
    <>
      {
        loading ? (
          <Loader />
        ) : (
          <div className='w-full h-full md:px-0 px-5 flex items-center justify-center'>
            <ToastContainer autoClose={4000} />
            <div className="w-[inherit] blob max-w-sm mx-auto rounded-md">
              <div className="w-[inherit] p-4 flex items-center justify-between">
                <div className='bg-white rounded-full w-24 h-24 flex items-center justify-center'>
                  <Image
                    src="/programmer.png"
                    width={50}
                    height={50}
                    alt="user-profile"
                  />
                </div>
                <div className="">
                  <button onClick={handleLogout} type="button" className='rounded-md p-2 text-sm text-white font-semibold bg-blue-700 transition-colors hover:bg-blue-600'>Logout</button>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 pb-4">
                <div className='flex items-center gap-1'>
                  <span className='text-sm font-medium text-gray-300'>Name: </span>
                  <h3 className="text-base font-semibold text-gray-100">{userDetails?.firstName + ' ' + userDetails?.lastName}</h3>
                </div>
                <div className='flex items-center gap-1'>
                  <span className='text-sm font-medium text-gray-300'>Email: </span>
                  <h3 className="text-base font-semibold text-gray-100">{userDetails?.email}</h3>
                </div>
                <div className='flex items-center gap-1'>
                  <span className='text-sm font-medium text-gray-300'>Mobile: </span>
                  <h3 className="text-base font-semibold text-gray-100">{userDetails?.mobile}</h3>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default page