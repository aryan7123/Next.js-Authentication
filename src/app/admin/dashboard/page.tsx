'use client'

import React, { useState, useEffect } from 'react'
import Loader from '@/app/components/Loader'
import { useGlobalContext } from '@/app/components/Context'
import Image from 'next/image'

import { RiMenuFill, RiSearchLine } from "react-icons/ri";
import { HiOutlineMoon, HiOutlineSun, HiOutlineBell } from "react-icons/hi";

const page = () => {
  const { loading, handleLoader, adminDetails, getAdminDetails } = useGlobalContext();

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
          <div className="w-full flex flex-col">
            <nav className='bg-[#f3f4f6] w-full z-30 sticky top-0 left-0'>
              <div className='max-w-7xl mx-auto p-6 flex items-center justify-between'>
                <div className="flex items-center gap-5">
                  <button type="button" className='text-gray-700'>
                    <RiMenuFill size={22}/>
                  </button>
                  <div className="flex items-center justify-between bg-white border-none rounded-2xl px-3 py-2">
                    <input type="text" placeholder='Search...' className='w-[inherit] text-sm font-medium text-gray-500 outline-none'/>
                    <RiSearchLine size={16} className='text-gray-700'/>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button type="button" className='text-gray-700'>
                    <HiOutlineMoon size={22}/>
                  </button>
                  <button type="button" className='text-gray-700'>
                    <HiOutlineBell size={22}/>
                  </button>
                  <button type="button" className='flex items-center justify-center gap-2'>
                    <Image
                      src="/teamwork.png"
                      width={35}
                      height={35}
                      alt='teamwork'
                    />
                    <span className='text-gray-500 text-xs font-semibold'>{firstName}</span>
                  </button>
                </div>
              </div>
            </nav>
          </div>
        </main>
      )}
    </>
  )
}

export default page