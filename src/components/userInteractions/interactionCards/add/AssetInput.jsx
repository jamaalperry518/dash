import React, { useState } from "react";
import scss from "./assetInput.module.scss";
import { formatInput } from "../../../../helpers/utils";

const AssetInput = (props) => {
  const [checked, setChecked] = useState(false);
  const [depositAmount, setDeposit] = useState();
  const changeHandler = (e) => {
    setDeposit(e.target.value);
  };
  const checkHandler = () => {
    setChecked(!checked);
  };
  const blurHandler = (e) => {
    console.log(formatInput(e.target.value));
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
          <button className={scss["max-button"]}>max</button>
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

export default AssetInput;
