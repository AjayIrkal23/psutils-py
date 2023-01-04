"use client";
import "react-calendar/dist/Calendar.css";

import React, { useContext, useEffect, useState } from "react";
import "../styles/globals.css";
import Calendar from "react-calendar";
import SpeedoMeter from "./SpeedoMeter";
import { AccountContext } from "../context/accountprovider";
import Modal2 from "./Modal";
import { Toaster, toast } from "react-hot-toast";

const HomePage = () => {
  const [value, onChange] = useState(new Date());
  const [value2, onChange2] = useState(new Date());
  const { taskdata, filterData, setClient, client, cpuNotification } =
    useContext(AccountContext);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [selectClient, setSelectClient] = useState([]);
  const [dates, setdates] = useState([]);
  const [open, setOpen] = useState(false);
  const [dateData, setDateData] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    setShow(false);
    setShow2(false);
  };

  const chartData = {
    chart: {
      type: "line",
      id: "apexchart-example",
    },
    xaxis: {
      categories: dateData?.map(
        (item) => `${item.date.split(" ")[2]} ${item.date.split(" ")[0]} `
      ),
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 100],
        // colorStops: []
      },
    },
    legend: {
      // position: '',
      width: 400,
      // position: 'top',
    },
    series: [
      {
        name: "Cpu Consumed",
        type: "column",
        data: dateData?.map((item) => `${item.data.cpu}`),
      },
    ],
  };

  const updateDateData = () => {
    let tempdata = [];

    dates.map((item) => {
      console.log(client);
      const found = filterData?.some(
        (el) =>
          new Date(el.updatedAt).toDateString() === item &&
          el.details.name === client
      );

      if (found) {
        let index = filterData.findIndex((item2) => {
          return new Date(item2.updatedAt).toDateString() === item;
        });
        tempdata.push({ data: filterData[index], date: item });
      }
      setDateData(tempdata);
    });
  };
  useEffect(() => {
    updateDateData();
  }, [dates]);

  var getDaysArray = function (s, e) {
    for (
      var a = [], d = new Date(s);
      d <= new Date(e);
      d.setDate(d.getDate() + 1)
    ) {
      a.push(new Date(d).toDateString());
    }
    setdates(a);
    return a;
  };

  useEffect(() => {
    getDaysArray(value.toDateString(), value2.toDateString());
  }, [value, value2]);

  return (
    <div className="relative">
      <h1 className="text-center italic font-semibold text-xl text-gray-700    ">
        Select The Date
      </h1>
      <div className="flex mt-5 md:mt-3 flex-col md:flex-row mx-auto md:space-x-6 justify-center items-center border-b-[1px] border-black/10 pb-6   ">
        <div className=" flex  flex-col">
          <button
            className="px-2 py-1.5 shadow-md bg-blue-500 mb-4 rounded-md font-semibold hover:scale-105 transition-all duration-200 ease-in-out   text-white"
            onClick={(e) => {
              setShow(!show);
            }}
          >
            Select From Date
          </button>
          <input
            className="px-3 py-1.5 bg-[whitesmoke] border rounded-lg border-black/20"
            type="text"
            aria-label="hello"
            disabled={true}
            value={value.toDateString()}
          />
        </div>
        <h1 className="items-center text-gray-600 font-bold">To</h1>
        <div className=" flex flex-col ">
          <button
            className="px-2 py-1.5 mb-3 shadow-md bg-blue-500 rounded-md font-semibold hover:scale-105 transition-all duration-200 ease-in-out   text-white"
            onClick={(e) => {
              setShow2(!show2);
            }}
          >
            Select To Date
          </button>
          <input
            className="px-3 py-1.5 bg-[whitesmoke] border rounded-lg border-black/20"
            type="text"
            disabled={true}
            aria-label="hello"
            value={value2.toDateString()}
          />
        </div>
        <button
          className="px-6 md:mt-0 mt-3 rounded-lg  text-white font-semibold py-1.5 bg-blue-500"
          onClick={handleOpen}
        >
          Search
        </button>
      </div>

      <div className="absolute left-[50%] z-[99999] md:left-[150px] md:translate-x-[0%] -translate-x-[50%] -mt-8 md:-mt-4   ">
        {show && (
          <div className="h-[100px] ">
            <Calendar
              onClickWeekNumber={handleClick}
              maxDetail="month"
              onChange={onChange}
              value={value}
            />
          </div>
        )}
      </div>
      <div className="absolute z-[99999] left-[50%] -translate-x-[50%] md:translate-x-[0%] md:right-[50px] -mt-8 md:-mt-4   ">
        {show2 && (
          <div className="h-[100px]">
            <Calendar onChange={onChange2} maxDetail="month" value={value2} />
          </div>
        )}
      </div>
      <div className=" flex relative md:flex-row flex-col ">
        <SpeedoMeter item="CPU" data={taskdata?.cpu} />
        <div className="flex flex-[0.8] flex-col  px-4 py-2 rounded-md shadow-lg space-y-2   items-start   border  border-black/20 my-4 md:m-6">
          <h1 className="font-semibold text-center mx-auto">System Details</h1>
          <h1 className="">
            {" "}
            <span className="font-semibold">Status</span> :{" "}
            {(taskdata?.cpu < 50 && "Optimal") ||
              (taskdata?.cpu <= 85 && "Ok") ||
              (taskdata?.cpu > 85 && "Action Needed")}
          </h1>
          <h1 className="">
            {" "}
            <span className="font-semibold">Type</span> : {taskdata?.type}
          </h1>
          <h1 className="">
            {" "}
            <span className="font-semibold">Processor</span> :{" "}
            {taskdata?.systemProcess}
          </h1>
          <h1 className="">
            {" "}
            <span className="font-semibold">Processor Description</span> :{" "}
            {taskdata?.systemdets}
          </h1>
          <h1 className="">
            {" "}
            <span className="font-semibold">RAM Size</span> : {taskdata?.ram} GB
          </h1>
          <h1 className="">
            {" "}
            <span className="font-semibold">Internet</span> : Connected
          </h1>

          <h1 className="">
            <span className="font-semibold">Vendor : </span>{" "}
            {taskdata?.details?.manufacturer}
          </h1>
          <h1 className="">
            <span className="font-semibold">Model : </span>{" "}
            {taskdata?.details?.model}
          </h1>
          <h1 className="">
            <span className="font-semibold">System Type : </span>{" "}
            {taskdata?.details?.systemtype}
          </h1>
          <h1 className="">
            <span className="font-semibold">System Name : </span>{" "}
            {taskdata?.details?.name}
          </h1>
          <h1 className="">
            <span className="font-semibold">Last Updated</span> :{" "}
            {new Date(taskdata?.updatedAt).toDateString()}
          </h1>
        </div>
        <Modal2
          open={open}
          handleOpen={handleOpen}
          handleClose={handleClose}
          chartData={chartData}
          date={`${value.toDateString()} to ${value2.toDateString()}`}
        />
      </div>
    </div>
  );
};

export default HomePage;
