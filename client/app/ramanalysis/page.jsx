"use client";
import "react-calendar/dist/Calendar.css";

import React, { useContext, useEffect, useState } from "react";
import { GrTasks } from "react-icons/gr";
import Calendar from "react-calendar";
import ReactSpeedometer from "react-d3-speedometer";
import SpeedoMeter from "../SpeedoMeter";
import { Chart } from "react-google-charts";
import { AccountContext } from "../../context/accountprovider";
import Modal2 from "../Modal";

import { Toaster, toast } from "react-hot-toast";

const Ram = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { taskdata, filterData, ramNotification } = useContext(AccountContext);
  const options = {
    title: "Total Memory Usage",
    is3D: true,
    pieSliceText: "none",
    tooltip: { text: "none" },
  };

  const [value, onChange] = useState(new Date());
  const [value2, onChange2] = useState(new Date());
  const [dates, setdates] = useState([]);
  const [dateData, setDateData] = useState([]);

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [data, setData] = useState([
    ["Total Memory", "Utilized Memory"],

    ["Utilized", taskdata?.memory],
    ["Total", 100],
  ]);

  const handleClick = () => {
    setShow(false);
    setShow2(false);
  };

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

  const updateDateData = () => {
    let tempdata = [];

    dates.map((item) => {
      const found = filterData?.some(
        (el) => new Date(el.updatedAt).toDateString() === item
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
        data: dateData?.map((item) => `${item.data.memory}`),
      },
    ],
  };

  useEffect(() => {
    getDaysArray(value.toDateString(), value2.toDateString());
  }, [value, value2]);

  return (
    <div className="  ">
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
      <div>
        <h1 className="text-center mt-4 text-2xl capitalize text-gray-700 italic font-semibold">
          Virtual Memory information and status
        </h1>
        <div className=" flex border-b-[1px] border-black/20 relative md:flex-row flex-col ">
          <SpeedoMeter item="Virtual Memory" data={taskdata?.memory} />
          <div className="mt-6">
            <Chart
              chartType="PieChart"
              data={data}
              options={options}
              width={"100%"}
              height={"400px"}
            />
          </div>
        </div>
        <div className=" pb-6 ">
          <h1 className="text-center mt-4 text-2xl capitalize text-gray-700 italic font-semibold">
            Task Manager{" "}
          </h1>
          <div className="h-[400px] w-[85%] overflow-scroll my-4 mx-auto bg-white border border-black/20 rounded-lg flex  flex-col shadow-lg">
            <div className="flex py-2 bg-[whitesmoke] px-4 items-center  gap-4  w-full text-start  rounded-t-[0.6rem] border-b-[1px] border-black/20 ">
              <GrTasks className="text-gray-600 text-xl " />
              <p className="italic font-semibold text-gray-600">Task Manager</p>
            </div>
            <div className="flex flex-col ">
              <div className="flex text-sm w-full font-bold px-4 py-0.5 border-b-[1px] border-black-10 bg-gray-200 ">
                <div className="basis-2/5 justify-self-start text-left w-full border-r-[1px] border-black/10 bg-gray-200">
                  Name
                </div>
                <div className="basis-1/5 justify-self-center text-center border-r-[1px] border-black/10  w-full bg-gray-200">
                  Pid
                </div>
                <div className="basis-1/5  w-full border-r-[1px] text-center border-black/10 bg-gray-200">
                  User
                </div>
                <div className="basis-1/5 justify-self-end text-right  w-full bg-gray-200">
                  Cpu Utilization
                </div>
              </div>
              {taskdata?.processes?.map((item) => (
                <div className="flex text-sm w-full px-4 py-0.5 border-b-[1px] border-black-10  ">
                  <div className="basis-2/5 justify-self-start text-left w-full border-r-[1px] border-black/10">
                    {item.name}
                  </div>
                  <div className="basis-1/5 justify-self-center text-center border-r-[1px] border-black/10  w-full">
                    {item.pid}
                  </div>
                  <div className="basis-1/5  w-full border-r-[1px] text-center border-black/10">
                    {item.username}
                  </div>
                  <div className="basis-1/5 justify-self-end text-right  w-full">
                    {item.memory_percent?.toFixed(2)} %
                  </div>
                </div>
              ))}
            </div>
          </div>
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

export default Ram;
