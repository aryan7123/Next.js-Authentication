'use client'

import React, { useState, useEffect } from 'react'
import Loader from '@/app/components/Loader'
import { useGlobalContext } from '@/app/components/Context'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

const page = () => {
  const { loading, handleLoader } = useGlobalContext();
  const [adminDetails, setAdminDetails] = useState([]);

  const getAdminDetails = async() => {
    try {
      const res = await axios.get("/api/admin/dashboard");
      setAdminDetails(res.data.admin);
    } catch (error) {
      console.error(error);
    }
  }

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
        <main className='w-full h-full bg-[#f1f5f9]'>
          <aside className='w-60 h-full z-40 bg-[#334155] transition'>
            <Link href="/admin/dashboard" className='w-full py-6 flex items-center justify-center'>
              <Image
                src="/logo-light.png"
                width={100}
                height={100}
                alt='logo-light'
              />
            </Link>
            <div className="w-full flex items-center justify-center gap-3 py-4 px-6">
              <div className='w-12 h-12'>
                <Image
                  src="/teamwork.png"
                  width={100}
                  height={100}
                  alt='teamwork'
                />
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-white font-semibold text-sm">{firstName + " " + lastName}</h3>
                <span className="text-white font-medium text-xs">Admin</span>
              </div>
            </div>
          </aside>
        </main>
      )}
    </>
  )
}

export default page