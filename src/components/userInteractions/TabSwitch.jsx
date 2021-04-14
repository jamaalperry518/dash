import React from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { HiFire } from "react-icons/hi";
import { HiChartBar } from "react-icons/hi";
import { Link } from "react-router-dom";

const TabSwitch = () => {
  return (
    <div className="tab-switch">
      <div className="tab plus selected">
        <Link to="/">
          <HiOutlinePlus />
        </Link>
      </div>
      <div className="tab">
        <Link to="/burn">
          <HiFire />{" "}
        </Link>
      </div>
      <div className="tab">
        <Link to="/vaults">
          <HiChartBar />{" "}
        </Link>
      </div>
    </div>
  );
};

export default TabSwitch;
