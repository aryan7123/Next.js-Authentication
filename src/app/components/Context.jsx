'use client'

import React, { useState, useContext } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);

    const handleLoader = () => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

   return(
    <AppContext.Provider
        value={{
            loading, 
            setLoading,
            handleLoader
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