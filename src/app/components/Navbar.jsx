import { useGlobalContext } from "@/app/components/Context";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { RiMenuFill, RiSearchLine } from "react-icons/ri";
import { HiOutlineMoon, HiOutlineSun, HiOutlineBell } from "react-icons/hi";
import { CiUser, CiSettings, CiLock, CiLogout } from "react-icons/ci";
import axios from "axios";

const Navbar = () => {
  const router = useRouter();
  const { adminDetails, handleOpenSidebar, openDropdown, handleOpenDropdown, theme, toggleTheme, } = useGlobalContext();

  const { firstName, lastName, email, password } = adminDetails;

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/admin/logout");
      if(res.data.message === "Logout Successfull") {
        setTimeout(() => {
          router.push("/admin/login")
        }, 1000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <nav className="bg-[#f3f4f6] dark:bg-[#1e293b] w-full z-30 sticky top-0 left-0">
        {/* dropdown menu */}
        <div
          className={`bg-white dark:bg-[#1e293b] absolute rounded-md ${
            openDropdown ? "opacity-100" : "opacity-0"
          } border-gray-200 dark:border-slate-500 border top-[90%] right-[10%] shadow-md transition-opacity duration-100`}
        >
          <h4 className="text-gray-600 dark:text-gray-400 py-3 pl-6 font-semibold">Welcome !</h4>
          <ul className="flex flex-col items-start justify-start">
            <button className="w-full flex items-center justify-start gap-3 hover:bg-gray-100 dark:hover:bg-slate-500/30 py-3 px-6">
              <CiUser size={18} className="dark:text-gray-400"/>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                My Account
              </span>
            </button>
            <button className="w-full flex items-center justify-start gap-3 hover:bg-gray-100 dark:hover:bg-slate-500/30 py-3 px-6">
              <CiSettings size={18} className="dark:text-gray-400"/>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                Settings
              </span>
            </button>
            <button className="w-full flex items-center justify-start gap-3 hover:bg-gray-100 dark:hover:bg-slate-500/30 py-3 px-6">
              <CiLock size={18} className="dark:text-gray-400"/>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                Lock Screen
              </span>
            </button>
            <hr className="w-full border border-gray-200 dark:border-slate-500 mt-3" />
            <button onClick={handleLogout} className="w-full flex items-center justify-start gap-3 hover:bg-gray-100 dark:hover:bg-slate-500/30 py-3 px-6">
              <CiLogout size={18} className="dark:text-gray-400"/>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold">
                Logout
              </span>
            </button>
          </ul>
        </div>
        {/* dropdown menu */}
        <div className="max-w-7xl mx-auto p-6 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3 md:gap-0">
              <Image
                src="/logo-sm.png"
                width={25}
                height={25}
                alt="small-logo"
                className="block md:hidden"
              />
              <button
                onClick={handleOpenSidebar}
                type="button"
                className="text-gray-700 dark:text-gray-400"
              >
                <RiMenuFill size={22} />
              </button>
            </div>
            <div className="hidden md:flex items-center justify-between bg-white dark:bg-slate-700 border-none rounded-2xl px-3 py-2">
              <input
                type="text"
                placeholder="Search..."
                className="w-[inherit] bg-transparent text-sm font-medium text-gray-500 md:text-white outline-none"
              />
              <RiSearchLine size={16} className="text-gray-700 dark:text-gray-400" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button type="button" onClick={toggleTheme} className="text-gray-700 dark:text-gray-400">
              {theme === 'dark' ? <HiOutlineSun size={22} /> : <HiOutlineMoon size={22}/>}
            </button>
            <button type="button" className="text-gray-700 dark:text-gray-400">
              <HiOutlineBell size={22} />
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2"
              onClick={handleOpenDropdown}
            >
              <Image
                src="/teamwork.png"
                width={35}
                height={35}
                alt="teamwork"
              />
              <span className="text-gray-500 dark:text-gray-400 hidden md:block text-sm font-semibold">
                {firstName}
              </span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
