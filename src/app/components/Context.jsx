'use client'

import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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