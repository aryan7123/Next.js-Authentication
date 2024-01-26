'use client'

import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Loader from '../components/Loader'
import { useGlobalContext } from '../components/Context'

const page = () => {
    const { loading, handleLoader } = useGlobalContext();
    const router = useRouter();
    const [otp, setOTP] = useState(['', '', '', '', '', '']);
    const inputRefs = Array.from(otp, () => useRef(otp));

    const handleChange = (value: any, index: any) => {
        try {
            if (!isNaN(value)) {
                const newOTP = [...otp];
                newOTP[index] = value;
                setOTP(newOTP);

                if (index < 5 && value !== '') {
                    inputRefs[index + 1].current.focus();
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handleVerify = async () => {
        try {
            let digits = '';
            otp.forEach((value) => {
                digits += value;
            });

            const res = await axios.post("/api/email-verification", { otp: digits });
            if (res.data.message === "OTP Verified Successfully") {
                toast.success(res.data.message, {
                    position: "top-right"
                });
                setTimeout(() => {
                    router.push("/login");
                }, 1500);
            }
            else {
                toast.error(res.data.message, {
                    position: "top-right"
                });
            }
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
                    <div className='w-[inherit] h-[inherit] mx-auto flex flex-col items-center justify-center'>
                        <div className="flex flex-col items-center gap-2 mb-4">
                            <h3 className='text-gray-600 font-semibold text-2xl'>OTP Verification</h3>
                            <span className='text-gray-400 font-semibold text-sm'>Enter 6-digit OTP to continue</span>
                        </div>
                        <div className="flex items-center gap-3">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="tel"
                                    name="otp"
                                    value={digit}
                                    maxLength={1}
                                    className='w-10 h-10 text-center bg-gray-800 rounded-md p-2 text-sm font-semibold text-white outline-blue-800'
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    ref={inputRefs[index]}
                                />
                            ))}
                        </div>
                        <button onClick={handleVerify} type="button" className='bg-blue-800 w-20 mt-6 text-white text-sm py-3 rounded-md font-semibold hover:bg-blue-700'>Verify</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default page