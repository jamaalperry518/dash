import React, { useState } from "react";
import { convertStandardNumber } from "../../../../../Redux/actions/currencyActions";
//components
import Withdraw from "./Withdraw";
import Deposit from "./Deposit";
const VaultButtons = (props) => {
  const vault = props.vault;
  const [cardDisplayed, setCardDisplayed] = useState("");

  const setCard = (e) => {
    setCardDisplayed(e.target.className);
  };

  return (
    <div className="withdraw-deposit">
      <div className="balance-info">
        <p className="section-heading">Your deposit in this vault</p>
        <p className="user-deposit-in-vault">
          {" "}
          {vault.vaultName} {vault.userDeposit}
        </p>
        <p className="deposit-fiat-amount">
          ( ~ {convertStandardNumber(888888)})
        </p>
      </div>
      {(() => {
        switch (cardDisplayed) {
          case "deposit":
            return <Deposit vault={props.vault} setCard={setCard} />;
          case "withdraw":
            return <Withdraw vault={props.vault} setCard={setCard} />;

          default:
            return (
              <div className="withdraw-deposit-buttons">
                <button className="withdraw" onClick={(e) => setCard(e)}>
                  Withdraw
                </button>
                <button className="deposit" onClick={(e) => setCard(e)}>
                  Deposit
                </button>
              </div>
            );
        }
      })()}
    </div>
  );
};

export default VaultButtons;
