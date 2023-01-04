"use client";

import React, { useContext, useEffect } from "react";
import Switch from "react-switch";
import { AccountContext, Accountprovider } from "../../context/accountprovider";
import { toast } from "react-hot-toast";
import { CgDanger } from "react-icons/cg";

const Settings = () => {
  const {
    ramNotification,
    setRamNotification,
    setcpuNotification,
    cpuNotification,
    diskNotification,
    setdiskNotification,
    setdiskEmail,
    diskEmail,
    time,
    setTime,
  } = useContext(AccountContext);

  const handleChange = () => {
    setRamNotification(!ramNotification);
  };

  const handleChange2 = () => {
    setcpuNotification(!cpuNotification);
  };

  const handleChange3 = () => {
    setdiskNotification(!diskNotification);
  };

  const handleChange4 = () => {
    setdiskEmail(!diskEmail);
  };

  return (
    <div>
      <div>
        <h1 className="text-gray-600 font-semibold   text-2xl italic text-center border-b-[1px] pb-2 ">
          Settings
        </h1>
        <div className="flex flex-col md:flex-row justify-evenly items-center w-full flex-wrap my-4  ">
          <div className=" w-[300px] p-4 h-[300px] bg-white rounded-lg shadow-lg border  ">
            <p className="text-center font-semibold text-gray-600 italic border-b-[1px] ">
              Ram Settings
            </p>
            <div className="flex-col justify-center font-semibold ">
              <p className="text-gray-600  font-normal text-center mt-4">
                Notification
              </p>

              <div className="flex justify-center items-center mx-auto mt-3">
                {" "}
                <Switch
                  onChange={handleChange}
                  checked={ramNotification}
                  offColor="#FF0000"
                  height={28}
                  width={60}
                  className="react-switch"
                />
              </div>
              <p className="text-center border-b-[1px] pb-2  text-gray-500 my-2 font-normal">
                {ramNotification ? "On" : "Off"}
              </p>
            </div>
          </div>
          <div className=" w-[300px] p-4 h-[300px] bg-white rounded-lg shadow-lg border  ">
            <p className="text-center font-semibold text-gray-600 italic border-b-[1px] ">
              CPU Settings
            </p>
            <div className="flex-col justify-center font-semibold ">
              <p className="text-gray-600  font-normal text-center mt-4">
                Notification
              </p>

              <div className="flex justify-center items-center mx-auto mt-3">
                {" "}
                <Switch
                  onChange={handleChange2}
                  checked={cpuNotification}
                  offColor="#FF0000"
                  height={28}
                  width={60}
                  className="react-switch"
                />
              </div>
              <p className="text-center border-b-[1px] pb-2  text-gray-500 my-2 font-normal">
                {cpuNotification ? "On" : "Off"}
              </p>
            </div>
          </div>
          <div className=" w-[300px] p-4 h-[300px] bg-white rounded-lg shadow-lg border  ">
            <p className="text-center font-semibold text-gray-600 italic border-b-[1px] ">
              Disk Settings
            </p>
            <div className="flex-col justify-center font-semibold ">
              <p className="text-gray-600  font-normal text-center mt-4">
                Notification
              </p>

              <div className="flex justify-center items-center mx-auto mt-3">
                {" "}
                <Switch
                  onChange={handleChange3}
                  checked={diskNotification}
                  offColor="#FF0000"
                  height={28}
                  width={60}
                  className="react-switch"
                />
              </div>
              <p className="text-center border-b-[1px] pb-2  text-gray-500 my-2 font-normal">
                {diskNotification ? "On" : "Off"}
              </p>
              <p className="text-gray-600  font-normal text-center mt-4">
                Alert Email
              </p>

              <div className="flex justify-center items-center mx-auto mt-3">
                {" "}
                <Switch
                  onChange={handleChange4}
                  checked={diskEmail}
                  offColor="#FF0000"
                  height={28}
                  width={60}
                  className="react-switch"
                />
              </div>
              <p className="text-center  pb-2  text-gray-500 my-2 font-normal">
                {diskEmail ? "On" : "Off"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-[1px] py-2  mx-auto max-w-[1000px]">
        <div className=" mx-auto">
          <p className="text-center text-gray-600 font-semibold  italic text-2xl">
            General Settings
          </p>
          <div className="flex bg-white border py-6 rounded-lg shadow-lg w-full justify-around my-4 px-8">
            <div className="flex flex-col">
              <div>
                <p className="text-gray-600 text-center italic font-semibold">
                  Data Refresh
                </p>
                <p className="text-xs text-center font-thin text-gray-500">
                  Please Select The Refresh TimeFrame
                </p>
                <select
                  name=""
                  id=""
                  className="px-8 my-2 py-1.5 w-full shadow-md italic text-gray-700 outline-none bg-transparent border-black/20 border rounded-md"
                  onChange={(e) => {
                    e.target.value == "30" || e.target.value == "60"
                      ? setTime(e.target.value * 1000)
                      : setTime(e.target.value * 60000);
                  }}
                >
                  {["30", "60", "2", "4", "6", "8", "10"].map((item) => (
                    <option className="bg-white" value={item}>
                      {item}{" "}
                      {item === "30" || item === "60" ? "Seconds" : "Mins"}
                    </option>
                  ))}
                </select>
                <p>
                  Selected : {time == 30000 || time == 60000 ? time : time}{" "}
                </p>
              </div>
            </div>
            <div className="flex items-center  ">
              <p className="text-gray-500 italic inline-flex items-center gap-2  font-semibold text-center ">
                More Settings Will be Available Soon{" "}
                <CgDanger className="text-center text-xl" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
