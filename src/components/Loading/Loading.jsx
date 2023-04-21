import React from "react";
import { RingLoader } from "react-spinners";

const Loading = () => {
  const loadingStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div style={loadingStyle}>
      <RingLoader color="#007bff" />
    </div>
  );
};

export default Loading;
