"use client";
import { usePathname } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import "../styles/globals.css";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

import { AccountContext, Accountprovider } from "../context/accountprovider";
import { useContext } from "react";

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <Accountprovider>
        <body className="h-screen min-h-screen  bg-[whitesmoke]">
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={12}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: "",

              style: {
                background: "#363636",
                color: "#fff",
              },

              // Default options for specific types
              success: {
                duration: 3000,
                theme: {
                  primary: "green",
                  secondary: "black",
                },
              },
            }}
          />

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
