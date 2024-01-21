import React from "react";

import "./ProgressBar.scss";

const ProgressBar = ({ bgcolor, completed }) => {
  const test = {
    width: `${completed + 10}px`,
  };
  return (
    <div className={`progressbar`}>
      <div style={test} className={`progressbar-wrapper ${bgcolor}`}>
        <span>{`${completed}`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
