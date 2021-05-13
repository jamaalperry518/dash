import React, { useState } from "react";
import { connect } from "react-redux";
import scss from "./assetInput.module.scss";
import { formatInput } from "../../../../helpers/utils";

const AssetInput = (props) => {
  const [checked, setChecked] = useState(false);
  const [depositAmount, setDeposit] = useState();
  const [isMax, setIsMax] = useState(false);
  const changeHandler = (e) => {
    setDeposit(e.target.value);
  };
  const checkHandler = () => {
    setChecked(!checked);
  };
  const blurHandler = (e) => {
    console.log(formatInput(e.target.value));
  };

  const setMax = () => {
    if (props.vaults[props.asset.name].user_balance > 0) {
      setIsMax(true);
      setDeposit(props.vaults[props.asset.name].user_balance);
    }
  };
  const clear = () => {
    setIsMax(false);

    setDeposit(0);
  };

  return (
    <div className="asset-input">
      <div className={scss["checkbox-container"]}>
        <div
          className={checked ? scss["checkbox-checked"] : scss["checkbox"]}
          name="asset"
          onClick={checkHandler}
          id={props.asset.symbol}
        >
          <div className={scss["little-circle"]}></div>
        </div>
        <h1 className="asset-name">{props.asset.symbol}</h1>
      </div>

      {checked ? (
        <div className={scss["set-max"]}>
          {depositAmount > 0 || isMax ? (
            <button
              className={
                scss[
                  props.vaults[props.asset.name].user_balance > 0
                    ? "max-button"
                    : "disabled"
                ]
              }
              onClick={clear}
            >
              clear
            </button>
          ) : (
            <button className={scss["max-button"]} onClick={setMax}>
              max
            </button>
          )}
        </div>
      ) : (
        <div className={scss["set-max"]}></div>
      )}
      <input
        type="number"
        className={checked ? "amount-input" : "amount-input inactive"}
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
