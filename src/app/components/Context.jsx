"use client";

import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [adminDetails, setAdminDetails] = useState([]);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.theme = newTheme;
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleOpenSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const handleOpenDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  const getAdminDetails = async () => {
    try {
      const res = await axios.get("/api/admin/dashboard");
      setAdminDetails(res.data.admin);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleLoader = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        showPassword,
        showConfirmPassword,
        adminDetails,
        openSidebar,
        openDropdown,
        theme,
        toggleTheme,
        handleOpenDropdown,
        getAdminDetails,
        handleOpenSidebar,
        setLoading,
        handleLoader,
        handleShowPassword,
        handleShowConfirmPassword,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
