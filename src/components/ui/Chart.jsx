import React from "react";
import { connect } from "react-redux";
import { PieChart } from "react-minimal-pie-chart";
import scss from "./chart.module.scss";
const Chart = (props) => {
  return (
    <div className={scss["chart-container"]}>
      <PieChart data={props.assetsArray} lengthAngle={-360} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentPool: state.vaults.currentPool,
  };
};

export default connect(mapStateToProps)(Chart);
