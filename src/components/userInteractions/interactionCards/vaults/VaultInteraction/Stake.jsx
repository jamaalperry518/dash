import React, { useState } from "react";
import { formatInput } from "../../../../../helpers/utils";

const Stake = (props) => {
  const { vault, setCard } = props;
  const [stake, setStake] = useState(0);
  const changeHandler = (e) => {
    setStake(e.target.value);
  };
  const blurHandler = (e) => {
    console.log(formatInput(e.target.value));
  };

  return (
    <div className="vault-interaction-container">
      <p className="section-heading">Choose an amount to stake:</p>
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
        <button className="cancel" onClick={(e) => setCard(e)}>
          cancel
        </button>
        <button className="vault-interaction-button">Stake</button>
      </div>
    </div>
  );
};

export default Stake;
