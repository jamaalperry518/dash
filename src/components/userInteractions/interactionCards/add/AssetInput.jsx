import React, { useState } from "react";
import { connect } from "react-redux";
import scss from "./assetInput.module.scss";
import { formatInput } from "../../../../helpers/utils";

const AssetInput = (props) => {
  const [depositAmount, setDeposit] = useState();
  const changeHandler = (e) => {
    setDeposit(e.target.value);
  };
  const checkHandler = (e) => {
    props.setActive(e.target.id);
  };
  const blurHandler = (e) => {
    console.log(formatInput(e.target.value));
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
          onChange={(e) => checkHandler(e)}
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
  };
};
export default connect(mapStateToProps)(AssetInput);
