import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
//components
import AssetInput from "./AssetInput";
import {
  checkForApproval,
  selectAsset,
} from "../../../../Redux/actions/WalletActions";

const AssetSelect = (props) => {
  const [active, setActive] = useState("");
  let assetArray = Object.values(props.assets);
  const [currentAssets, setCurrentAssets] = useState(assetArray);
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.address && props.signer) {
      dispatch(
        checkForApproval(
          props.assets,
          props.address,
          props.poolAddress,
          props.signer
        )
      );
      console.log(assetArray);
    }
    //eslint-disable-next-line
  }, [props.assets, props.ARRAY]);

  useEffect(() => {
    setCurrentAssets(props.ARRAY);
    setActive("");
    dispatch(selectAsset(""));
    //eslint-disable-next-line
  }, [props.ARRAY]);
  return (
    <div className={props.address ? "asset-select" : "asset-select inactive"}>
      <p className="section-heading">Select asset and amount to deposit:</p>
      <div className="asset-inputs">
        {currentAssets?.map((asset, i) => {
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
    assets: state.pools.currentPool.tokens,
    ARRAY: state.pools.assetArray,
    poolAddress: state.pools.poolAddress,
    signer: state.wallet.signer,
  };
};

export default connect(mapStateToProps)(AssetSelect);
