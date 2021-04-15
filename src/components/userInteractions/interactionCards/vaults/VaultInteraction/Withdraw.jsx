import React from "react";

const Withdraw = (props) => {
  const { vault, setCard } = props;
  return (
    <div className="vault-interaction-container">
      <p className="section-heading">Choose an amount to deposit:</p>
      <div className="vault-interaction-input-container">
        <input type="number" className="amount-input" />
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
        <button className="vault-interaction-button">Withdraw</button>
      </div>
    </div>
  );
};

export default Withdraw;
