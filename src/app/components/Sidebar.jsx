import Image from 'next/image'
import Link from 'next/link'

const Sidebar = () => {
  return (
    <>
      <aside className="w-60 md:w-72 sticky top-0 left-0 h-full z-40 bg-[#334155] transition">
        <Link
          href="/admin/dashboard"
          className="w-full py-6 flex items-center justify-center"
        >
          <Image
            src="/logo-light.png"
            width={100}
            height={100}
            alt="logo-light"
          />
        </Link>
        <div className="w-full flex items-center justify-center gap-3 py-4 px-6">
          <div className="w-12 h-12">
            <Image
              src="/teamwork.png"
              width={100}
              height={100}
              alt="teamwork"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <h3 className="text-white font-semibold text-sm">
              {firstName + " " + lastName}
            </h3>
            <span className="text-white font-medium text-xs">Admin</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
