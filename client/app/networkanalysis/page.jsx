"use client";
import React, { useContext, useEffect, useState } from "react";
import SpeedoMeter from "../SpeedoMeter";

import ReactSpeedometer from "react-d3-speedometer";
import { AccountContext } from "../../context/accountprovider";
import ReactApexChart from "react-apexcharts";
const Network = () => {
  const { taskdata, filterData } = useContext(AccountContext);
  const [ChartData, setChartData] = useState([]);

  let tempdata = [];
  taskdata?.networkDets.Ethernet.map((item) => {
    item.map((object, index) => {
      if (index === 1) {
        tempdata.push(object);
      }
    });
  });

  const options = {
    series: [
      {
        name: "Upload Speed",
        data: ChartData?.map((item) => Math.round(item.uploadSpeed)),
      },
      {
        name: "Download Speed",
        data: ChartData?.map((item) => Math.round(item.downloadSpeed)),
      },
    ],
    chart: {
      height: 10,
      type: "line",
      dropShadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: true,
      },
    },
    colors: ["#77B6EA", "#545454"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Network Download And Upload Speed",
      align: "left",
    },
    grid: {
      borderColor: "#e7e7e7",
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: ChartData?.map(
        (item) => new Date(item.createdAt).toTimeString().split(" ")[0]
      ),
    },
    yaxis: {
      title: {
        text: "Speed",
      },
      min: 0,
      max: 100,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  };
  let data = [];
  useEffect(() => {
    let date = new Date().toDateString();
    data = [];
    const res = filterData?.map((item) => {
      if (date === new Date(item?.createdAt).toDateString()) {
        data.push(item);
      }
    });
    setChartData(data);
  }, [filterData]);

  return (
    <div>
      <div>
        <h1 className="text-xl border-b-[1px] pb-2 border-b-black/20 text-gray-600 font-semibold italic  text-center">
          Network Information
        </h1>
      </div>
      <div className=" my-4 mb-8 border-b-[1px] border-black/20 pb-4   flex justify-evenly">
        <div className="flex flex-col text-center">
          <p className="text-2xl italic">
            <span className="font-bold">
              {Math.round(taskdata?.downloadSpeed)}
            </span>{" "}
            MBPS{" "}
          </p>
          <p className="italic">Download Speed</p>
        </div>
        <div className="flex flex-col text-center">
          <p className="text-2xl italic">
            <span className="font-bold">
              {" "}
              {Math.round(taskdata?.uploadSpeed)}
            </span>{" "}
            MBPS{" "}
          </p>
          <p className="italic">Upload Speed</p>
        </div>
      </div>
      <div className="flex justify-center md:flex-row flex-col   items-center">
        <div className="flex md:flex-row flex-col pt-8 bg-white px-16 rounded-lg py-1 shadow-md   justify-evenly w-[80%] items-center ">
          <div className="basis-1/2 md:border-r-[1px] mr-8">
            <h1 className="text-gray-600 mb-4 font-semibold ">
              Upload : {Math.round(taskdata?.uploadSpeed)} MBPS
            </h1>
            <div className="flex relative mx-auto  justify-center flex-col ">
              <ReactSpeedometer
                maxValue={100}
                value={Math.round(taskdata?.uploadSpeed)}
                width={300}
                height={250}
                //   forceRender={true}
                needleColor="blue"
                needleTransition="easeElastic"
                needleTransitionDuration={2000}
                startColor="#ff0000"
                segments={2222}
                maxSegmentLabels={5}
                endColor="green"
                needleHeightRatio={0.7}
              />
            </div>
          </div>

          <div className="basis-1/2 relative ">
            <h1 className="text-gray-600 mb-4 font-semibold ">
              Download : {Math.round(taskdata?.downloadSpeed)} MBPS
            </h1>
            <div className="flex relative mx-auto justify-center flex-col ">
              <ReactSpeedometer
                maxValue={100}
                value={Math.round(taskdata?.downloadSpeed)}
                width={300}
                height={250}
                //   forceRender={true}
                needleColor="blue"
                needleTransition="easeElastic"
                needleTransitionDuration={2000}
                startColor="#ff0000"
                segments={2222}
                maxSegmentLabels={5}
                endColor="green"
                needleHeightRatio={0.7}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-[0.5] -mt-[110px] px-[150px] py-[200px]">
        <div className="bg-white py-4 px-6">
          {" "}
          <ReactApexChart options={options} series={options.series} />
        </div>
      </div>
      <div className="flex flex-col px-6 -mt-[110px] mx-auto py-2 bg-white shadow-lg text-center my-12 max-w-[60%]">
        <h1 className="my-6 text-gray-600 text-lg text-center underline  font-semibold italic ">
          Additional NetWork Information
        </h1>
        <p>{tempdata.length > 0 && `LAN : ${tempdata[1]}`}</p>
        <p>{tempdata.length > 0 && `Mac Address : ${tempdata[0]}`}</p>
        <p>{tempdata.length > 0 && `Wifi : ${tempdata[2]}`}</p>
      </div>
    </div>
  );
};

export default Network;
