"use client";
import axios from "axios";
import { createContext, useState, useRef, useEffect } from "react";
import React from "react";

export const AccountContext = createContext(null);

export const Accountprovider = ({ children }) => {
  const [taskdata, settaskdata] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [Client, setClientData] = useState(null);

  const Getdata = async () => {
    const res = await axios.get("http://localhost:8000/getdata");
    setFilterData(res?.data);
    if (Client === null) {
      settaskdata(res.data[res.data.length - 1]);
    } else {
      console.log("select by sort hehheheheh");
    }
  };
  console.log(taskdata);
  useState(() => {
    setInterval(() => {
      Getdata();
    }, 40000);
  }, []);

  useEffect(() => {
    Getdata();
  }, []);

  return (
    <AccountContext.Provider
      value={{
        taskdata,
        settaskdata,
        filterData,
        setFilterData,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
