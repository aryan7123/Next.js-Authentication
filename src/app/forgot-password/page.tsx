'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import Loader from '../components/Loader'
import { useGlobalContext } from '../components/Context'

const page = () => {
    const { loading, handleLoader } = useGlobalContext();
    const [email, setEmail] = useState("");

    const handleChange = (e: any) => {
        setEmail(e.target.value);
    }

    const handleSendEmail = async () => {
        try {
            const res = await axios.post("/api/forgot-password", { email });
            if (res.data.message === "Mail sent to your email address") {
                toast.success(res.data.message, {
                    position: "top-right"
                });
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
                    <div className="w-[inherit] max-w-lg mx-auto bg-gray-300 rounded-md">
                        <h3 className="text-xl text-gray-800 font-semibold border-b border-gray-600 py-3 px-4">
                            Email Verification
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
                            <button
                                type="button"
                                onClick={handleSendEmail}
                                className="bg-[#B20D30] rounded-md p-2 text-white text-base font-semibold transition-colors hover:bg-[#E11340]"
                            >
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default page