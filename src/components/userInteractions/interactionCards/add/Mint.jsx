import React from "react";
import { connect } from "react-redux";

const Mint = (props) => {
  return (
    <div className={props.address ? "mint-array" : "mint-array inactive"}>
      <div className="mint-stats">
        <h1>Amount of array</h1>
        <h1 className="number-amount">0.0</h1>
        <h1 className="asset-name">Array</h1>
      </div>

      <button className="mint-button">Mint</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    address: state.wallet.address,
  };
};

export default connect(mapStateToProps)(Mint);
