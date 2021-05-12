import React, { useState } from "react";
import { formatInput } from "../../../../../helpers/utils";

const Withdraw = (props) => {
  const { vault, setCard } = props;
  const [withdrawal, setWithdrawal] = useState(0);
  const [isMax, setIsMax] = useState(false);
  const changeHandler = (e) => {
    setWithdrawal(e.target.value);
  };
  const blurHandler = (e) => {
    setWithdrawal(formatInput(e.target.value));
  };
  const setMax = () => {
    setIsMax(true);
    setWithdrawal(vault.depositInVault);
  };
  const clear = () => {
    setIsMax(false);

    setWithdrawal(0);
  };
  return (
    <div className="vault-interaction-container">
      <p className="section-heading">Choose an amount to deposit:</p>
      <div className="vault-interaction-input-container">
        {withdrawal > 0 || isMax ? (
          <button className="max-button" onClick={clear}>
            clear
          </button>
        ) : (
          <button className="max-button" onClick={setMax}>
            max
          </button>
        )}
        <input
          type="number"
          onChange={changeHandler}
          onBlur={blurHandler}
          className="amount-input"
          value={withdrawal}
        />
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
        <button className="vault-interaction-button">Withdraw</button>
      </div>
    </div>
  );
};

export default Withdraw;
