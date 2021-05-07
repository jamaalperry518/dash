import React, { useState } from "react";
import { convertStandardNumber } from "../../../../../Redux/actions/currencyActions";
//components
import Withdraw from "./Withdraw";
import Deposit from "./Deposit";
const VaultButtons = (props) => {
  const vault = props.vault;
  const [cardDisplayed, setCardDisplayed] = useState("");

  const setCard = (e) => {
    console.log(e.target);
    setCardDisplayed(e.target.value);
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
                <select
                  onClick={(e) => setCard(e)}
                  name="vault-actions"
                  id="actions"
                >
                  <option value="" className="action">
                    Actions
                  </option>
                  <option value="deposit" className="action">
                    Deposit
                  </option>
                  <option value="stake" className="action">
                    Stake
                  </option>
                  <option value="withdraw" className="action">
                    Withdraw
                  </option>
                </select>
              </div>
            );
        }
      })()}
    </div>
  );
};

export default VaultButtons;
