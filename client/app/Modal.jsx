import React from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/system";
import ReactApexChart from "react-apexcharts";

const Modal2 = ({ open, handleClose, chartData, date }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1>
            Cpu Data Analysis from <span className="font-semibold">{date}</span>
          </h1>
          <ReactApexChart options={chartData} series={chartData.series} />
        </Box>
      </Modal>
    </div>
  );
};

export default Modal2;
