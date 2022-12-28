"use client";
import ReactSpeedometer from "react-d3-speedometer";
import React, { useState } from "react";

const SpeedoMeter = ({ item, data }) => {
  const [value, setvalue] = useState(45);

  //   setInterval(() => {
  //     setvalue(value + 6);
  //   }, [5000]);

  return (
    <div className="basis-1/2 flex-[0.2]      p-2  md:p-6 my-4 h-[420px] border mt- border-black/20  rounded-lg shadow-lg md:m-5">
      <div className=" hidden md:flex absolute justify-center space-x-4 top-[25px] -right-[5px]    w-full">
        <div className="flex   flex-col items-center">
          {" "}
          <div className="h-[36px] w-[36px] rounded-xl bg-green-500"></div>
          <h1 className="text-sm font-semibold">Optimal</h1>
        </div>

        <div className="flex flex-col items-center">
          {" "}
          <div className="h-[36px] w-[36px] rounded-xl bg-orange-300"></div>
          <h1 className="text-sm font-semibold">Normal</h1>
        </div>
        <div className="flex flex-col items-center">
          {" "}
          <div className="h-[36px] w-[36px] rounded-xl bg-red-500"></div>
          <h1 className="text-sm font-semibold">Overload</h1>
        </div>
      </div>
      <div className=" md:flex mx-auto w-full h-full hidden flex-col">
        <h2 className="uppercase text-gray-600 font-semibold ">
          {item} Usage : {data}%{" "}
        </h2>
        <ReactSpeedometer
          maxValue={100}
          value={data}
          fluidWidth={true}
          //   forceRender={true}
          needleColor="blue"
          needleTransition="easeElastic"
          needleTransitionDuration={2000}
          startColor="green"
          segments={5555}
          maxSegmentLabels={5}
          endColor="#ff0000"
          needleHeightRatio={0.7}
        />
      </div>
      <div className="flex relative mx-auto w-full justify-center flex-col md:hidden">
        <h2 className="uppercase mb-4      text-gray-600  font-semibold ">
          {item} Usage : {data}%{" "}
        </h2>
        <ReactSpeedometer
          maxValue={100}
          value={data}
          width={300}
          height={250}
          //   forceRender={true}
          needleColor="blue"
          needleTransition="easeElastic"
          needleTransitionDuration={2000}
          startColor="green"
          segments={5555}
          maxSegmentLabels={5}
          endColor="#ff0000"
          needleHeightRatio={0.7}
        />
        <div className="flex  justify-center space-x-8  w-full">
          <div className="flex  flex-col items-center">
            {" "}
            <div className="h-[36px] w-[36px] rounded-xl bg-green-500"></div>
            <h1 className="text-sm font-semibold">Optimal</h1>
          </div>

          <div className="flex flex-col items-center">
            {" "}
            <div className="h-[36px] w-[36px] rounded-xl bg-orange-300"></div>
            <h1 className="text-sm font-semibold">Normal</h1>
          </div>
          <div className="flex flex-col items-center">
            {" "}
            <div className="h-[36px] w-[36px] rounded-xl bg-red-500"></div>
            <h1 className="text-sm font-semibold">Overload</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedoMeter;
