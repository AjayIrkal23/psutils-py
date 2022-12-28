"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const ListComponent = ({ title, active, link }) => {
  return (
    <Link href={link}>
      <li
        className={`px-4 hover:bg-blue-500 hover:text-white transition-all duration-200 ease-in-out cursor-pointer font-semibold ${
          active ? "bg-blue-500  text-white" : " bg-none"
        } py-3 rounded-md `}
      >
        {title}
      </li>
    </Link>
  );
};

export default ListComponent;
