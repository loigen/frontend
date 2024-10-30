import React from "react";
import "../../styles/loadingSpinner.css";
import Loading from "../../images/loading.gif";

const LoadingSpinner = () => {
  return (
    <div className="loading-container ">
      <img src= {Loading} alt="" className="w-56 h-56"/>
    </div>
  );
};

export default LoadingSpinner;
