import React, { useState } from "react";
import scss from "./assetInput.module.scss";

const AssetInput = (props) => {
  const [checked, setChecked] = useState(false);
  const [depositAmount, setDeposit] = useState(0);
  const changeHandler = (e) => {
    setDeposit(e.target.value);
  };
  const checkHandler = () => {
    setChecked(!checked);
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
      </div>

      <h1 className="asset-name">{props.asset.symbol}</h1>
      <input
        type="number"
        className={checked ? "amount-input" : "amount-input inactive"}
        min={0}
        name="amount"
        value={depositAmount}
        onChange={changeHandler}
      />
    </div>
  );
};

export default AssetInput;
