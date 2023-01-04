"use client";
import React, { useContext, useEffect } from "react";
import ListComponent from "./ListComponent";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AccountContext } from "../context/accountprovider";

const SideBar = () => {
  const pathName = usePathname();

  const isActive = (path) => {
    let orgPath = pathName.split("/");
    if (path === pathName) {
      return true;
    }
    if (path === orgPath[1]) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="md:basis-1/5 border-r-[1px] border-[black]/10 shadow-lg border-b-[1px]  shadow-white bg-white  h-full">
      <div className="flex justify-center  ">
        <h2 className="italic mt-12 text-xl font-semibold mb-2">
          Select Your Analysis{" "}
        </h2>
      </div>
      <div className="border-b-[1px] border-black/20 mb-2">
        <ul className="flex flex-col my-2 items-right  space-y-1.5">
          <ListComponent active={isActive("/")} title="CPU Analysis" link="/" />
          <ListComponent
            active={isActive("ramanalysis")}
            title="Virtual Memory Analysis"
            link="ramanalysis"
          />
          <ListComponent
            active={isActive("diskanalysis")}
            title="Disk Analysis"
            link="diskanalysis"
          />
          <ListComponent
            active={isActive("networkanalysis")}
            title="Network Analysis"
            link="networkanalysis"
          />
          <ListComponent
            active={isActive("settings")}
            title="Settings"
            link="settings"
          />
        </ul>
      </div>
      <div className=" mb-2 pb-2">
        <h1 className="text-gray-600 font-semibold text-sm text-center"></h1>
      </div>
      <div className=" mb-2"></div>
    </div>
  );
};

export default SideBar;
