import React, { useState, useEffect } from "react";
import Chart from "../../../ui/Chart";
import AssetSelect from "./AssetSelect";
import Mint from "./Mint";
import { connect } from "react-redux";

const Add = (props) => {
  const [assetsToChart, setAssetsToChart] = useState([]);

  useEffect(() => {
    if (props.assets.length >= 2 && props.address) {
      console.log(props.assets);
      setAssetsToChart(props.assets);
    }
    //eslint-disable-next-line
    if (assetsToChart == 0) {
      const timer = setTimeout(() => {
        setAssetsToChart(props.assets);
      }, 250);
      return () => clearTimeout(timer);
    }
    //eslint-disable-next-line
  }, [props.assets, props.currentPool]);

  return (
    <>
      {props.assets.length > 1 ? (
        <div className="add-to-bags">
          <div className="chart-container">
            <p className="section-heading">Array consist of:</p>
            <Chart assetsArray={assetsToChart} />
            <div className="asset-by-percentage">
              {assetsToChart?.map((asset, i) => {
                return (
                  <div key={i} className="asset">
                    <div
                      className="color-code"
                      style={{ backgroundColor: asset.color }}
                    ></div>
                    <p className="asset-name">{asset.name.toUpperCase()}</p>
                    <p className="percentage-of-portfolio">
                      {asset.value * 100}%
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <AssetSelect assetsToChart={assetsToChart} />
          <Mint />{" "}
        </div>
      ) : (
        <h1 className="loading">LOADING</h1>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    address: state.wallet.address,
    currentPool: state.vaults.currentPool,
    assets: state.vaults.assetArray,
  };
};
export default connect(mapStateToProps)(Add);
