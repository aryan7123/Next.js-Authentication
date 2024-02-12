'use client'

import React, { useState, useEffect } from 'react'
import Loader from '@/app/components/Loader'
import Navbar from "@/app/components/Navbar"

import { useGlobalContext } from '@/app/components/Context'
import { LuNetwork } from "react-icons/lu";
import { FaChromecast, FaUserShield } from "react-icons/fa";
import { RiCellphoneLine } from "react-icons/ri";

const page = () => {
  const { loading, handleLoader, adminDetails, getAdminDetails, openSidebar } = useGlobalContext();

  const { firstName, lastName, email, password } = adminDetails;

  useEffect(() => {
    handleLoader()
    getAdminDetails()
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className='w-full h-full bg-[#f1f5f9] md:relative md:flex md:items-start gap-2'>
          <section className="w-full flex flex-col">
            <Navbar />
            <div className='w-[inherit] h-[inherit]'>
              <div className='bg-white max-w-7xl md:mx-auto mx-6 p-6 mt-4 rounded'>
                <div className='border-b border-gray-200 mb-4'>
                  <h3 className='text-lg pb-1.5 font-semibold text-gray-700'>Welcome!</h3>
                </div>
                <div className="w-full border border-gray-200 rounded-md flex flex-col md:flex-row items-center justify-between p-6">
                  <div className="flex md:w-1/4 p-4 flex-col gap-3 items-center justify-center md:border-e border-gray-200">
                    <div className="flex items-center justify-center gap-3">
                      <LuNetwork size={30} className='text-blue-800' />
                      <h3 className="text-xl font-semibold text-gray-600">8954</h3>
                    </div>
                    <span className='text-sm font-medium text-gray-400'>Lifetime total sales</span>
                  </div>
                  <div className="flex md:w-1/4 p-4 flex-col gap-3 items-center justify-center md:border-e border-gray-200">
                    <div className="flex items-center justify-center gap-3">
                      <FaChromecast size={30} className='text-green-800' />
                      <h3 className="text-xl font-semibold text-gray-600">7542</h3>
                    </div>
                    <span className='text-sm font-medium text-gray-400'>Income amounts</span>
                  </div>
                  <div className="flex md:w-1/4 p-4 flex-col gap-3 items-center justify-center md:border-e border-gray-200">
                    <div className="flex items-center justify-center gap-3">
                      <FaUserShield size={30} className='text-blue-400' />
                      <h3 className="text-xl font-semibold text-gray-600">6740</h3>
                    </div>
                    <span className='text-sm font-medium text-gray-400'>Total users</span>
                  </div>
                  <div className="flex md:w-1/4 p-4 flex-col gap-3 items-center justify-center">
                    <div className="flex items-center justify-center gap-3">
                      <RiCellphoneLine size={30} className='text-red-800' />
                      <h3 className="text-xl font-semibold text-gray-600">3250</h3>
                    </div>
                    <span className='text-sm font-medium text-gray-400'>Total visits</span>
                  </div>
                </div>
                <div className='w-full mt-4 rounded-md flex flex-col md:flex-row gap-3 items-center justify-between'>
                  <div className='w-[inherit] md:w-1/2 border border-gray-200 rounded-md p-6'>
                    <h3 className="text-gray-600 font-semibold text-base">Total Revenue</h3>
                    <div className="flex items-center justify-center gap-6 mt-4">
                      <div className='flex items-center justify-center gap-2'>
                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                        <span className='text-sm font-medium text-gray-500'>Series A</span>
                      </div>
                      <div className='flex items-center justify-center gap-2'>
                        <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                        <span className='text-sm font-medium text-gray-500'>Series B</span>
                      </div>
                    </div>
                  </div>
                  <div className='w-[inherit] md:w-1/2 border border-gray-200 rounded-md p-6'>
                    <h3 className="text-gray-600 font-semibold text-base">Sales Analytics</h3>
                    <div className="flex items-center justify-center gap-6 mt-4">
                      <div className='flex items-center justify-center gap-2'>
                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                        <span className='text-sm font-medium text-gray-500'>Mobiles</span>
                      </div>
                      <div className='flex items-center justify-center gap-2'>
                        <div className="w-4 h-4 rounded-full bg-blue-300"></div>
                        <span className='text-sm font-medium text-gray-500'>Tablets</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  )
}

export default page