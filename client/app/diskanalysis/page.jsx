"use client";
import emailjs from "@emailjs/browser";
import "react-calendar/dist/Calendar.css";
import Alert from "react-bootstrap/Alert";
import React, { useContext, useEffect, useState } from "react";
import { GrTasks } from "react-icons/gr";
import Calendar from "react-calendar";
import ReactSpeedometer from "react-d3-speedometer";
import SpeedoMeter from "../SpeedoMeter";
import { Chart } from "react-google-charts";

import { AccountContext } from "../../context/accountprovider";
import Modal2 from "../Modal";

const Disk = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data1, setData1] = useState([
    ["Total Memory", "Utilized Memory"],

    ["Utilized", 0.2],
    ["Total", 1],
  ]);
  const [data2, setData2] = useState([
    ["Total Memory", "Utilized Memory"],

    ["Utilized", 0.2],
    ["Total", 1],
  ]);
  const [data3, setData3] = useState([
    ["Total Memory", "Utilized Memory"],

    ["Utilized", 0.2],
    ["Total", 1],
  ]);
  const [dates, setdates] = useState([]);
  const { taskdata, filterData } = useContext(AccountContext);
  const [dateData, setDateData] = useState([]);
  let keys = taskdata && Object.keys(taskdata?.data);
  let values = taskdata && Object.values(taskdata?.data);

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
        tempdata.push({ data: filterData[index].data, date: item });
      }
      setDateData(tempdata);
    });
  };
  useEffect(() => {
    updateDateData();
  }, [dates]);

  const options1 = {
    title: keys && `${keys[0]}  Total Memory Usage`,
    is3D: true,
    pieSliceText: "none",
    tooltip: { text: "none" },
  };
  const options2 = {
    title: keys && `${keys[1]}  Total Memory Usage`,
    is3D: true,
    pieSliceText: "none",
    tooltip: { text: "none" },
  };
  const options3 = {
    title: keys && ` ${keys[2]}  Total Memory Usage`,
    is3D: true,
    pieSliceText: "none",
    tooltip: { text: "none" },
  };
  const [value, onChange] = useState(new Date());
  const [value2, onChange2] = useState(new Date());

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

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

  useEffect(() => {}, []);

  useEffect(() => {
    getDaysArray(value.toDateString(), value2.toDateString());
  }, [value, value2]);

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
        name: keys && keys[0],
        type: "column",
        data: [245, 124, 265, 236, 214, 324, 225],
      },
      {
        name: keys && keys[1],
        type: "column",
        data: [120, 124, 265, 146, 144, 240, 265],
      },
      {
        name: keys && keys[2],
        type: "column",
        data: [145, 184, 165, 186, 134, 150, 255],
      },
    ],
  };

  const handleSubmit = (freespace, drive) => {
    if (taskdata) {
      var templateParams = {
        drive: drive,
        client: taskdata?.name,
        message:
          "This is a kind request to Take Action on Specified Drive Before it Runs Out Of Storage",
      };
      alert(`${freespace} ${drive}`);
      // emailjs
      //   .send(
      //     "service_xjuo98l",
      //     "template_vw4jivf",
      //     templateParams,
      //     "ZjwB97wKIznKoRg2C"
      //   )
      //   .then((res) => {
      //     console.log(res);
      //   });
    }
  };

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
          Disk information
        </h1>
        <div className=" flex  border-b-[1px] border-black/20 relative flex-col justify-center ">
          {values?.map((item, i) => (
            <div className="mt-6 flex justify-start border-b-[1px] border-black/20 py-3">
              <div className="basis-1/2 shadow-lg">
                <Chart
                  chartType="PieChart"
                  data={[
                    ["Total Memory", "Utilized Memory"],

                    ["Utilized", item[0] - item[1]],
                    ["Total", item[0]],
                  ]}
                  options={
                    (i === 0 && options1) ||
                    (i === 1 && options2) ||
                    (i === 2 && options3)
                  }
                  width={"100%"}
                  height={"300px"}
                />
              </div>
              <div className="basis-1/2 m-6 h-full">
                <div className="flex border flex-col border-black/20 rounded-lg h-[300px] bg-white shadow-lg ">
                  <h1 className="text-gray-600 font-semibold text-center w-full text-xl my-4 underline">
                    {(i === 0 && keys[0]) ||
                      (i === 1 && keys[1]) ||
                      (i === 2 && keys[2])}{" "}
                    Disk Information
                  </h1>
                  <p className="text-gray-600 font-semibold p-5">
                    Total : {item[0]} GB
                  </p>
                  <p className="text-gray-600 font-semibold p-5">
                    Used : {item[0] - item[1]} GB
                  </p>
                  <p className="text-gray-600 font-semibold p-5">
                    Free : {item[1]} GB
                  </p>
                  {item[1] < 45 && (
                    <button
                      className=" bg-red-500 w-full text-white z-[999999]  font-semibold p-5"
                      onClick={handleSubmit(item[1], keys[i])}
                    >
                      Caution Free Space is Less Then Specified Threshold{" "}
                      {item[1]}/45 GB
                    </button>
                  )}{" "}
                </div>
              </div>
            </div>
          ))}
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

export default Disk;
