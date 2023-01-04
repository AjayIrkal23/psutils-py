"use client";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "../context/accountprovider";
const Navbar = () => {
  const { taskdata, filterData, setClient, client } =
    useContext(AccountContext);
  const [selectClient, setSelectClient] = useState([]);

  const removeDublicates = () => {
    let dubliArray = [];
    filterData?.forEach((item, index) => {
      if (!dubliArray.includes(item?.details?.name)) {
        dubliArray.push(item?.details?.name);
      }
    });
    console.log(dubliArray);
    setSelectClient(dubliArray);
  };

  useEffect(() => {
    removeDublicates();
  }, [filterData]);

  return (
    <div className="sticky top-0 z-40 flex w-full  shadow-md shadow-black/">
      <div className="flex items-center px-12 py-3  bg-white md:basis-3/5 flex-1 ">
        <img src="/jsw.png" height="120" width="120" alt="" />
      </div>
      <div className="md:flex justify-end pr-16 gap-8 items-center bg-[#16469d] hidden  md:basis-2/5">
        <div className="flex items-center  justify-end  pr-8 font-semibold cursor-pointer ">
          <div className="flex gap-5">
            <h2 className="inline-flex items-center justify-center text-white ">
              Select Client
            </h2>
            <div>
              <select
                name=""
                className="px-4 py-2 bg-white rounded-md border border-black/20 shadow-md "
                onChangeCapture={(e) => {
                  setClient(e.target.value);
                }}
                id=""
              >
                {selectClient.map((item) => (
                  <option value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
