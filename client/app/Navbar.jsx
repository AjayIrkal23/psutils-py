import Link from "next/link";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-40 flex w-full  shadow-md shadow-black/">
      <div className="flex items-center px-12 py-3  bg-white md:basis-3/5 flex-1 ">
        <img src="/jsw.png" height="120" width="120" alt="" />
      </div>
      <div className="md:flex justify-end pr-16 gap-8 items-center bg-[#16469d] hidden  md:basis-2/5">
        <div className="flex items-center md:hidden justify-end flex-grow pr-8 font-semibold cursor-pointer bg-[#2159c2] ">
          <Link href="/login">
            <p className="px-4 text-black bg-white py-1.5 rounded-md text-md shadow-lg shadow-white/20">
              Login
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
