'use client'

import React, { useState, useContext } from "react";
import axios from 'axios';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [adminDetails, setAdminDetails] = useState([]);
    const [openSidebar, setOpenSidebar] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(false);

    const handleOpenSidebar = () => {
        setOpenSidebar(!openSidebar);
    }

    const handleOpenDropdown = () => {
        setOpenDropdown(!openDropdown);
    }

    const getAdminDetails = async () => {
        try {
          const res = await axios.get("/api/admin/dashboard");
          setAdminDetails(res.data.admin);
        } catch (error) {
          console.error(error);
        }
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const handleLoader = () => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

   return(
    <AppContext.Provider
        value={{
            loading,
            showPassword,
            showConfirmPassword,
            adminDetails,
            openSidebar,
            openDropdown,
            handleOpenDropdown,
            getAdminDetails,
            handleOpenSidebar,
            setLoading,
            handleLoader,
            handleShowPassword,
            handleShowConfirmPassword
        }}
    >
       {children} 
    </AppContext.Provider>
   )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}

export { AppContext, AppProvider }