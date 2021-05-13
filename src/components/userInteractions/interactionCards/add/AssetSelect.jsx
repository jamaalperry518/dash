import React, { useState } from "react";
import { connect } from "react-redux";
//components
import AssetInput from "./AssetInput";

const AssetSelect = (props) => {
  const [active, setActive] = useState("");
  return (
    <div className={props.address ? "asset-select" : "asset-select inactive"}>
      <p className="section-heading">Select asset and amount to deposit:</p>
      <div className="asset-inputs">
        {props.assets?.map((asset, i) => {
          return (
            <AssetInput
              key={i}
              active={active}
              setActive={setActive}
              asset={asset}
            />
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    address: state.wallet.address,
    assets: state.pools.assetArray,
  };
};

export default connect(mapStateToProps)(AssetSelect);
