import React, { useState } from "react";
import { connect } from "react-redux";

const AssetSelect = (props) => {
  const [assets, setAssets] = useState(props.assets);
  const changeHandler = (e, i) => {
    console.log(assets[i].amount);
    let copy = assets[i];
    copy.amount = e.target.value;
    console.log(copy);
    let newArr = [...assets];
    newArr[i] = copy;
    setAssets(newArr);
  };

  return (
    <div className={props.address ? "asset-select" : "asset-select inactive"}>
      <p className="section-heading">Select asset and amount to deposit:</p>
      <div className="asset-inputs">
        {assets?.map((asset, i) => {
          return (
            <div key={i} className="asset-input">
              <input type="radio" name="asset" id={asset.name} />
              <h1 className="asset-name">{asset.name}</h1>
              <input
                type="number"
                className="amount-input"
                min={0}
                name="amount"
                value={asset.amount}
                onChange={(e) => changeHandler(e, i)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    address: state.wallet.address,
    assets: state.vaults.assetArray,
  };
};

export default connect(mapStateToProps)(AssetSelect);
