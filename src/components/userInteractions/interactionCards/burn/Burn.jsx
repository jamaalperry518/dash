import React, { useState } from "react";
import { connect } from "react-redux";
import { formatInput } from "../../../../helpers/utils";
import { motion } from "framer-motion";

const Burn = (props) => {
  const [arrayToBurn, setArrayToBurn] = useState(0);
  const [isMax, setIsMax] = useState(false);
  const changeHandler = (e) => {
    setArrayToBurn(e.target.value);
  };
  const blurHandler = (e) => {
    console.log(formatInput(e.target.value));
  };

  const setMax = () => {
    setIsMax(true);
    setArrayToBurn(props.arrayBalance);
  };
  const clear = () => {
    setIsMax(false);

    setArrayToBurn(0);
  };
  const variants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
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
    <motion.div
      initial={variants.hidden}
      animate={variants.visible}
      exit={variants.exit}
      className="burn-array-container"
    >
      <div className="burn-input-container">
        <p className="section-heading">Choose an amount of array to burn</p>
        {arrayToBurn > 0 || isMax ? (
          <button className="max-button" onClick={clear}>
            clear
          </button>
        ) : (
          <button className="max-button" onClick={setMax}>
            max
          </button>
        )}
        <input
          type="number"
          className="amount-input"
          value={arrayToBurn}
          onChange={changeHandler}
          onBlur={blurHandler}
        />
        <h1 className="array">Array</h1>
      </div>
      <div className="amount-to-burn">
        <div className="amounts-to-receive">
          <div className="tokens-to-receive">
            <p className="section-heading">This burn will yield:</p>
            {props.assets?.map((token, i) => {
              return (
                <div key={i} className="burn-token">
                  <p className="burn-token-amount asset-name">{token.symbol}</p>
                  <p className="burn-token-name asset-name">0</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="fiat-to-receive">
          <p className="section-heading">Total value</p>
          <h1 className="fiat-amount">0.0</h1>

          <button
            className={arrayToBurn ? "burn-button" : "burn-button inactive"}
          >
            Burn
          </button>
        </div>
      </div>
    </motion.div>
  );
};
const mapStateToProps = (state) => {
  return {
    assets: state.pools.assetArray,
    arrayBalance: state.wallet.arrayBalance,
  };
};
export default connect(mapStateToProps)(Burn);
