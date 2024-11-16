import React from "react";
import "../../styles/loadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="spinner-wrapper">
        <div className="loading-spinner"></div>
        <p className="spinner-text">SafePlace</p>
      </div>
      <p>Loading, Please Wait...</p>
    </div>
  );
};

export default LoadingSpinner;
