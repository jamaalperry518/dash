import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import scss from "./assetInput.module.scss";
import { formatInput } from "../../../../helpers/utils";
import {
  selectAsset,
  setAssetAmount,
} from "../../../../Redux/actions/WalletActions";

const AssetInput = (props) => {
  const dispatch = useDispatch();
  const [depositAmount, setDeposit] = useState();

  const changeHandler = (e) => {
    setDeposit(e.target.valueAsNumber || e.target.value);
  };
  const checkHandler = (e, asset) => {
    props.setActive(e.target.id);
    dispatch(selectAsset(asset));
  };
  const blurHandler = (e) => {
    if (e.target.value) {
      dispatch(
        setAssetAmount(formatInput(e.target.value, props.asset.decimals))
      );
    }
  };

  const setMax = () => {
    if (props.vaults[props.asset.name].user_balance > 0) {
      setDeposit(props.vaults[props.asset.name].user_balance);
    }
  };
  const clear = () => {
    setDeposit(0);
  };

  return (
    <div className="asset-input">
      <div className={scss["checkbox-container"]}>
        <input
          type="radio"
          className={scss["checkbox"]}
          name="asset"
          checked={props.active === props.asset.symbol}
          onChange={(e) => checkHandler(e, props.asset)}
          id={props.asset.symbol}
        />
        {/* <div className={scss["little-circle"]}></div>
        </input> */}
        <h1 className="asset-name">{props.asset.symbol}</h1>
      </div>

      {props.active === props.asset.symbol ? (
        <div className={scss["set-max"]}>
          {depositAmount > 0 ? (
            <button className={scss["max-button"]} onClick={clear}>
              clear
            </button>
          ) : (
            <button className={scss["max-button"]} onClick={setMax}>
              max
            </button>
          )}
        </div>
      ) : null}

      <input
        type="number"
        className={
          props.active === props.asset.symbol
            ? "amount-input"
            : "amount-input inactive"
        }
        min={0}
        name="amount"
        value={depositAmount}
        onChange={changeHandler}
        onBlur={blurHandler}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    vaults: state.vaults.state,
    signer: state.wallet.signer,
    address: state.wallet.address,
  };
};
export default connect(mapStateToProps)(AssetInput);
