import React, { useState } from "react";
import { formatInput } from "../../../../../helpers/utils";

const Deposit = (props) => {
  const { vault, setCard } = props;
  const [deposit, setDeposit] = useState(0);
  const changeHandler = (e) => {
    setDeposit(e.target.value);
  };
  const blurHandler = (e) => {
    console.log(formatInput(e.target.value));
  };
  return (
    <div className="vault-interaction-container">
      <p className="section-heading">Choose an amount to deposit:</p>
      <div className="vault-interaction-input-container">
        <input
          type="number"
          onChange={changeHandler}
          onBlur={blurHandler}
          className="amount-input"
        />
        <h1 className="asset-name">{vault.vaultName}</h1>
      </div>
      <div className="vault-interaction-container-buttons">
        <button
          onClick={(e) => {
            setCard(e);
          }}
          className="cancel"
        >
          cancel
        </button>
        <button className="vault-interaction-button">Deposit</button>
      </div>
    </div>
  );
};

export default Deposit;
