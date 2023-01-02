"use client";
import axios from "axios";
import { createContext, useState, useRef, useEffect } from "react";
import React from "react";

export const AccountContext = createContext(null);

export const Accountprovider = ({ children }) => {
  const [taskdata, settaskdata] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [client, setClient] = useState(null);
  const [sendMail, setSendMail] = useState(true);
  console.log(client);

  function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const Getdata = async (CLIENT) => {
    const res = await axios.get(
      "https://serverbackend-lz47.onrender.com/getdata"
    );

    setFilterData(res?.data);
    console.log(CLIENT);
    if (CLIENT === null) {
      settaskdata(res.data[res.data.length - 1]);
    } else {
      const pos = filterData.map((e) => e.details.name).lastIndexOf(CLIENT);
      console.log(pos);
      settaskdata(filterData[pos]);
    }
  };
  useInterval(() => {
    // Your custom logic here
    Getdata(client);
  }, 40000);

  useEffect(() => {
    Getdata(client);
  }, [client]);

  return (
    <AccountContext.Provider
      value={{
        taskdata,
        settaskdata,
        filterData,
        setFilterData,
        setClient,
        client,
        sendMail,
        setSendMail,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
