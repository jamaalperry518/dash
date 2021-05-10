import React from "react";
import { PieChart } from "react-minimal-pie-chart";
import scss from "./chart.module.scss";
const Chart = (props) => {
  return (
    <div className={scss["chart-container"]}>
      <PieChart data={props.assetsArray} lengthAngle={-360} />
    </div>
  );
};

export default Chart;
