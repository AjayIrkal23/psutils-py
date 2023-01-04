"use client";
import axios from "axios";
import { createContext, useState, useRef, useEffect } from "react";
import React from "react";
import { toast } from "react-hot-toast";

export const AccountContext = createContext(null);

export const Accountprovider = ({ children }) => {
  const [taskdata, settaskdata] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [client, setClient] = useState(null);
  const [sendMail, setSendMail] = useState(true);
  const [ramNotification, setRamNotification] = useState(true);
  const [cpuNotification, setcpuNotification] = useState(true);
  const [diskNotification, setdiskNotification] = useState(true);
  const [diskEmail, setdiskEmail] = useState(true);
  const [time, setTime] = useState(30000);
  console.log(time);

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

  const notify = () => {
    if (cpuNotification) {
      if (taskdata?.cpu > 85) {
        toast.error(" CPU Overloading!");
      }
    }

    if (ramNotification) {
      if (taskdata?.memory > 85) {
        toast.error(" Ram Overloading!");
      }
    }
  };

  useEffect(() => {
    if (ramNotification) {
      toast.success(`Ram Notification Changed to On`);
    } else {
      toast.error("Ram Notification Changed to Off");
    }
  }, [ramNotification]);

  useEffect(() => {
    if (cpuNotification) {
      toast.success(`Ram Notification Changed to On`);
    } else {
      toast.error("Ram Notification Changed to Off");
    }
  }, [cpuNotification]);

  useEffect(() => {
    if (diskNotification) {
      toast.success(`Disk Caution Changed to On`);
    } else {
      toast.error("Disk Caution Changed to Off");
    }
  }, [diskNotification]);

  useEffect(() => {
    if (diskEmail) {
      toast.success(`Alert Email Changed to On`);
    } else {
      toast.error("Alert Email Changed to Off");
    }
  }, [diskEmail]);

  const Getdata = async (CLIENT) => {
    const res = await axios.get("http://localhost:8000/getdata");

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
  }, time);

  useEffect(() => {
    toast.promise(Getdata(client), {
      loading: "Loading",
      success: "Client Data Fetch Successful",
      error: "Error when fetching",
    });
  }, [client]);

  useEffect(() => {
    notify();
  }, [taskdata]);

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
        Getdata,
        setRamNotification,
        ramNotification,
        cpuNotification,
        setcpuNotification,
        setdiskNotification,
        diskNotification,
        setdiskEmail,
        diskEmail,

        time,
        setTime,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
