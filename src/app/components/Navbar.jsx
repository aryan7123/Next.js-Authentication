import { useGlobalContext } from "@/app/components/Context";
import Image from "next/image";

import { RiMenuFill, RiSearchLine } from "react-icons/ri";
import { HiOutlineMoon, HiOutlineSun, HiOutlineBell } from "react-icons/hi";
import { CiUser, CiSettings, CiLock, CiLogout } from "react-icons/ci";

const Navbar = () => {
  const { adminDetails, handleOpenSidebar, openDropdown, handleOpenDropdown } = useGlobalContext();

  const { firstName, lastName, email, password } = adminDetails;

  return (
    <>
      <nav className="bg-[#f3f4f6] w-full z-30 sticky top-0 left-0">
        {/* dropdown menu */}
        <div className={`bg-white absolute rounded-md ${openDropdown ? 'opacity-100' : 'opacity-0'} border-gray-200 border top-[90%] right-[10%] shadow-md transition-opacity duration-100`}>
          <h4 className="text-gray-600 py-3 pl-6 font-semibold">Welcome !</h4>
          <ul className="flex flex-col items-start justify-start">
            <button className="w-full flex items-center justify-start gap-3 hover:bg-gray-100 py-3 px-6">
              <CiUser size={18}/>
              <span className="text-sm text-gray-500 font-semibold">My Account</span>
            </button>
            <button className="w-full flex items-center justify-start gap-3 hover:bg-gray-100 py-3 px-6">
              <CiSettings size={18}/>
              <span className="text-sm text-gray-500 font-semibold">Settings</span>
            </button>
            <button className="w-full flex items-center justify-start gap-3 hover:bg-gray-100 py-3 px-6">
              <CiLock size={18}/>
              <span className="text-sm text-gray-500 font-semibold">Lock Screen</span>
            </button>
            <button className="w-full flex items-center justify-start gap-3 hover:bg-gray-100 py-3 px-6">
              <CiLogout size={18}/>
              <span className="text-sm text-gray-500 font-semibold">Logout</span>
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
                <button onClick={handleOpenSidebar} type="button" className="text-gray-700">
                    <RiMenuFill size={22} />
                </button>
            </div>
            <div className="hidden md:flex items-center justify-between bg-white border-none rounded-2xl px-3 py-2">
              <input
                type="text"
                placeholder="Search..."
                className="w-[inherit] text-sm font-medium text-gray-500 outline-none"
              />
              <RiSearchLine size={16} className="text-gray-700" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button type="button" className="text-gray-700">
              <HiOutlineMoon size={22} />
            </button>
            <button type="button" className="text-gray-700">
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
              <span className="text-gray-500 hidden md:block text-sm font-semibold">
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
