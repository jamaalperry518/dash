import React from "react";

const VaultButtons = (props) => {
  const vault = props.vault;

  return (
    <div className="withdraw-deposit">
      <div className="balance-info">
        <p className="section-heading">Your deposit in this vault</p>
        <p className="user-deposit-in-vault">
          {" "}
          {vault.vaultName} {vault.userDeposit}
        </p>
        <p className="deposit-fiat-amount">( ~ $888888)</p>
      </div>

      <div className="withdraw-deposit-buttons">
        <button className="withdraw" onClick={(e) => props.setCard(e)}>
          Withdraw
        </button>
        <button className="deposit" onClick={(e) => props.setCard(e)}>
          Deposit
        </button>
      </div>
    </div>
  );
};

export default VaultButtons;
