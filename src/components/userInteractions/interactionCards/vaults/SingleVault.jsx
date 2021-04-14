import React, { useState } from "react";
//components
import { FaExternalLinkAlt } from "react-icons/fa";
import VaultButtons from "./VaultInteraction/VaultButtons";
import Withdraw from "./VaultInteraction/Withdraw";
import Deposit from "./VaultInteraction/Deposit";
const SingleVault = (props) => {
  const vault = props.vault;

  const [cardDisplayed, setCardDisplayed] = useState("");

  const setCard = (e) => {
    setCardDisplayed(e.target.className);
  };

  return (
    <div className="single-vault">
      <div className="vault-top">
        <div className="vault-header">
          <div className="name-and-logo">
            <img
              src={vault.img}
              alt={`${vault.name} logo`}
              className="vault-logo"
            />
            <p className="vault-name">{vault.vaultSymbol}</p>
          </div>

          <FaExternalLinkAlt className="etherscan-link" />
        </div>

        <div className="vault-stats">
          <div className="vault-stat">
            <p className="section-heading">TVL</p>
            <p className="stat-text">${vault.vaultTvl}</p>
          </div>

          <div className="vault-stat">
            <p className="section-heading">APY total</p>
            <p className="stat-text">{vault.vaultApy}%</p>
          </div>

          <div className="vault-stat">
            <p className="section-heading">
              APY reinvested/ turned into Array tokens
            </p>
            <p className="stat-text">
              {vault.reinvestedAPY}% / {vault.reinvestedArray}%
            </p>
          </div>
        </div>
      </div>
      {(() => {
        switch (cardDisplayed) {
          case "deposit":
            return <Deposit />;
          case "withdraw":
            return <Withdraw />;

          default:
            return <VaultButtons vault={vault} setCard={setCard} />;
        }
      })()}
    </div>
  );
};

export default SingleVault;
