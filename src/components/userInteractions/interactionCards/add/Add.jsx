import React from "react";
import tempChart from "../../../../assets/tempChart.png";
import AssetSelect from "./AssetSelect";
import Mint from "./Mint";

const Add = () => {
  return (
    <div className="add-to-bags">
      <div className="chart-container">
        <p className="section-heading">Array consist of:</p>
        <img src={tempChart} alt="chart displayin assets" className="temp" />
        <div className="asset-by-percentage">
          <div className="asset">
            <div className="color-code btc"></div>
            <p className="asset-name">BTC</p>
            <p className="percentage-of-portfolio">(44.16%)</p>
          </div>
          <div className="asset">
            <div className="color-code eth "></div>
            <p className="asset-name">ETH</p>
            <p className="percentage-of-portfolio">(28.22%)</p>
          </div>
          <div className="asset">
            <div className="color-code dai"></div>
            <p className="asset-name">DAI</p>
            <p className="percentage-of-portfolio">(8.16%)</p>
          </div>
          <div className="asset">
            <div className="color-code bnb"></div>
            <p className="asset-name">BNB</p>
            <p className="percentage-of-portfolio">(3.16%)</p>
          </div>
          <div className="asset">
            <div className="color-code usdt"></div>
            <p className="asset-name">USDT</p>
            <p className="percentage-of-portfolio">(16.30%)</p>
          </div>
        </div>
      </div>
      <AssetSelect />
      <Mint />
    </div>
  );
};

export default Add;
