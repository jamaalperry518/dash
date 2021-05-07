import React from "react";

const Stake = (props) => {
  const { vault, setCard } = props;

  return (
    <div className="vault-interaction-container">
      <p className="section-heading">Choose an amount to stake:</p>
      <div className="vault-interaction-input-container">
        <input type="number" className="amount-input" />
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
