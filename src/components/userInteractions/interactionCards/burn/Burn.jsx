import React, { useState } from "react";
import { connect } from "react-redux";

const Burn = (props) => {
  const [arrayToBurn, setArrayToBurn] = useState(0);

  const changeHandler = (e) => {
    setArrayToBurn(e.target.value);
  };

  return (
    <div className="burn-array-container">
      <div className="burn-input-container">
        <p className="section-heading">Choose an amount of array to burn</p>
        <input
          type="number"
          className="amount-input"
          value={arrayToBurn}
          onChange={changeHandler}
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

          <button className="burn-button">Burn</button>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    assets: state.vaults.assetArray,
  };
};
export default connect(mapStateToProps)(Burn);
