import React, { useState } from "react";
import { connect } from "react-redux";

const AssetSelect = (props) => {
  const [assets] = useState([
    {
      name: "BTC",
      amount: 0,
    },
    {
      name: "ETH",
      amount: 0,
    },
    {
      name: "DAI",
      amount: 0,
    },
    {
      name: "BNB",
      amount: 0,
    },
    {
      name: "USDT",
      amount: 0,
    },
  ]);
  // const changeHandler = (e) => {
  //   setAssets({ ...assets, [e.target.name]: e.target.value });
  // };
  return (
    <div className={props.address ? "asset-select" : "asset-select inactive"}>
      <p className="section-heading">Select asset and amount to deposit:</p>
      {assets?.map((asset, i) => {
        return (
          <div key={i} className="asset-input">
            <input type="radio" name="asset" id={asset.name} />
            <h1 className="asset-name">{asset.name}</h1>
            <input
              type="number"
              className="amount-input"

              // name={asset.name}
              // value={assets[i].amount}
              //   onChange={changeHandler}
            />
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    address: state.wallet.address,
  };
};

export default connect(mapStateToProps)(AssetSelect);
