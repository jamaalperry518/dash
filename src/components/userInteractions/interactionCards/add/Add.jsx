import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { setCurrentPool } from "../../../../Redux/actions/poolActions";
import { motion } from "framer-motion";

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
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [props.assets, props.pools, dispatch]);

  const variants = {
    hidden: {
      y: "-5rem",

      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        default: {
          type: "spring",
          damping: 15,
        },
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scaleX: 0.98,
      y: "2rem",
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <>
      {props.currentPool && assetsToChart.length > 1 ? (
        <motion.div
          initial={variants.hidden}
          animate={variants.visible}
          exit={variants.exit}
          className="add-to-bags"
        >
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
        </motion.div>
      ) : (
        <Loading />
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    address: state.wallet.address,
    currentPool: state.pools.currentPool,
    assets: state.pools.assetArray,
    pools: state.pools.pools,
  };
};
export default connect(mapStateToProps)(Add);
