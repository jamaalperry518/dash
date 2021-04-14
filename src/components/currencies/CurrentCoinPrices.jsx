import React from "react";
import { connect } from "react-redux";

const CurrentCoinPrices = (props) => {
  return (
    <div className="coin-prices card">
      {" "}
      <h1>ETH - {props.prices.ethPrice}</h1>{" "}
      <h1>BTC - {props.prices.btcPrice}</h1>{" "}
      <h1>1INCH - {props.prices.oneInchPrice}</h1>{" "}
      <h1>CRV - {props.prices.crvPrice}</h1>{" "}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    prices: state.currency,
  };
};

export default connect(mapStateToProps)(CurrentCoinPrices);
