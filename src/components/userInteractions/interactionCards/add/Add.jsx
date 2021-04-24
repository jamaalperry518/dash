import React from "react";
import Chart from "../../../ui/Chart";
import AssetSelect from "./AssetSelect";
import Mint from "./Mint";

const Add = () => {
  const assetsToChart = {
    0: {
      name: "btc",
      value: 44.16,
      color: "#1330f4",
    },
    2: {
      name: "eth",
      value: 28.22,
      color: "#13a6f4",
    },
    3: {
      name: "dai",
      value: 8.16,
      color: "#bcd57e",
    },
    4: {
      name: "bnb",
      value: 3.16,
      color: "#c91a5b",
    },
    5: {
      name: "usdt",
      value: 16.3,
      color: "#c95b5b",
    },
  };
  const assetsArray = Object.values(assetsToChart);
  return (
    <div className="add-to-bags">
      <div className="chart-container">
        <p className="section-heading">Array consist of:</p>
        <Chart assetsArray={assetsArray} />
        <div className="asset-by-percentage">
          {assetsArray?.map((asset) => {
            return (
              <div className="asset">
                <div className={`color-code ${asset.name}`}></div>
                <p className="asset-name">{asset.name.toUpperCase()}</p>
                <p className="percentage-of-portfolio">(44.16%)</p>
              </div>
            );
          })}
        </div>
      </div>
      <AssetSelect />
      <Mint />
    </div>
  );
};

export default Add;
