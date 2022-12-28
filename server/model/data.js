import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    cpu: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    systemProcess: {
      type: String,
      required: true,
    },
    systemdets: {
      type: String,
      required: true,
    },
    downloadSpeed: {
      type: Number,
      required: true,
    },
    uploadSpeed: {
      type: Number,
      required: true,
    },
    networkDets: {
      type: Object,
      required: true,
    },
    details: {
      type: Object,
      required: true,
    },
    ram: {
      type: Number,
      required: true,
    },
    memory: {
      type: Number,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
    processes: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const data = mongoose.model("data", dataSchema);

export default data;
