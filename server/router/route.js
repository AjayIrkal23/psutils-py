import express from "express";
import data from "../model/data.js";

const route = express.Router();

export const addUser = async (request, response) => {
  try {
    console.log(request.body);
    const newUser = new data(request.body);
    await newUser.save();
    response.status(200).json(newUser);
    console.log(newUser);
  } catch (error) {
    response.status(500).json(error);
  }
};

export const getData = async (req, res) => {
  try {
    let resp = await data.find({});
    res.status(200).json(resp);
  } catch (e) {
    console.log(e);
  }
};

route.post("/add", addUser);
route.get("/getdata", getData);
route.get("/", async (req, res) => {
  res.status(200).json("hello from serverr vaiiiiiiiiiiiiiiiiiii");
});

export default route;
