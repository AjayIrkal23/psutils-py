"use client";
import React from "react";

import { Blocks } from "react-loader-spinner";
const loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-full ">
      <Blocks
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
      />
    </div>
  );
};

export default loading;
