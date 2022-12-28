import { usePathname } from "next/navigation";
import "../styles/globals.css";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

import { Accountprovider } from "../context/accountprovider";

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <Accountprovider>
        <body className="h-screen min-h-screen  bg-[whitesmoke]">
          <Navbar />
          <div className="flex md:flex-row flex-col   h-full">
            <div className="md:basis-1/5 border-r-[1px] border-[black]/10 shadow-lg shadow-white   h-full">
              <SideBar />
            </div>

            <div className="md:basis-4/5 md:p-5 p-1   relative  ">
              {children}{" "}
            </div>
          </div>
        </body>
      </Accountprovider>
    </html>
  );
}
