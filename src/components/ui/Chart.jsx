import React from "react";
import { PieChart } from "react-minimal-pie-chart";
const Chart = (props) => {
  return (
    <div>
      <PieChart data={props.assetsArray} lengthAngle={-360} />
    </div>
  );
};

export default Chart;
