import React from "react";
import { connect, useDispatch } from "react-redux";
import { approveAsset } from "../../../../Redux/actions/WalletActions";

import scss from "./mint.module.scss";
const Mint = (props) => {
  const dispatch = useDispatch();
  const handleApprove = () => {
    dispatch(
      approveAsset(
        props.asset,
        props.signer,
        props.address,
        props.poolAddress,
        props.assetAmount
      )
    );
  };

  return (
    <div className={props.address ? "mint-array" : "mint-array inactive"}>
      <div className="mint-content">
        <div className="mint-stats">
          <h1>Amount of array</h1>
          <h1 className="number-amount">0.0</h1>
          <h1 className="asset-name">Array</h1>
        </div>

        {props.asset ? (
          parseInt(props.asset.allowance) > 0 ? (
            <button className="mint-button">Mint</button>
          ) : (
            <button className={scss["approve-asset"]} onClick={handleApprove}>
              Approve
            </button>
          )
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    address: state.wallet.address,
    poolAddress: state.wallet.poolAddress,
    signer: state.wallet.signer,
    asset: state.wallet.selectedAsset,
    assetAmount: state.wallet.assetAmount,
  };
};

export default connect(mapStateToProps)(Mint);
