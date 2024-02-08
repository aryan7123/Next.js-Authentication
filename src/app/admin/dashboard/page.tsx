'use client'

import React, { useState, useEffect } from 'react'
import Loader from '@/app/components/Loader'
import Navbar from "@/app/components/Navbar"

import { useGlobalContext } from '@/app/components/Context'

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
                <div className='border-b border-gray-300'>
                  <h3 className='text-lg pb-1 font-semibold text-gray-700'>Welcome!</h3>
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