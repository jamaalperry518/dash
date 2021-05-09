import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { setCurrentPool } from "../../../../Redux/actions/vaultActions";
import { delay } from "../../../../helpers/utils";

//components
import Chart from "../../../ui/Chart";
import AssetSelect from "./AssetSelect";
import Mint from "./Mint";
import Loading from "../../../ui/Loading";

const Add = (props) => {
  const dispatch = useDispatch();
  const [assetsToChart, setAssetsToChart] = useState([]);

  useEffect(() => {}, [props.currentPool, props.pools, dispatch]);

  useEffect(() => {
    if (props.assets.length > 1) {
      setAssetsToChart(props.assets);
    } else {
      const timer = setTimeout(() => {
        dispatch(setCurrentPool(props.pools["WETH-WBTC"]));
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [props.assets, props.pools]);

  return (
    <>
      {props.currentPool && assetsToChart.length > 1 ? (
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
                    <p className="asset-name">{asset.symbol}</p>
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
        <Loading />
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    address: state.wallet.address,
    currentPool: state.vaults.currentPool,
    assets: state.vaults.assetArray,
    pools: state.vaults.pools,
    loaded: state.vaults.loaded,
  };
};
export default connect(mapStateToProps)(Add);
