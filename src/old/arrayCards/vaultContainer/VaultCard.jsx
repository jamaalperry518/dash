import React from "react";
import { connect } from "react-redux";

const VaultCard = (props) => {
  const selected = props.state.selectedVault;
  return (
    <div className="vault-card card">
      <div className="vault-header">
        <h1 className="vault-title">
          {" "}
          <span>{selected.vaultName}</span> vault
        </h1>
        <p className="subtext">
          deposit {selected.vaultSymbol} and mint Array tokens directly
        </p>
        <button className="buy-token">get {selected.vaultSymbol} </button>
      </div>
      <div className="vault-statistics">
        <div className="vault-apy-container vault-stat">
          <h1 className="vault-apy stat">{selected.vaultApy}%</h1>
          <p className="subtext">apy</p>
        </div>
        <div className="vault-tvl-container vault-stat">
          <h1 className="vault-tvl stat">${selected.vaultTvl}</h1>
          <p className="subtext">locked in vault</p>
        </div>
      </div>
      <div className="vault-interactions">
        <div className="interaction-input">
          <input type="text" className="amount" />
          <button className="set-max">max</button>
        </div>

        <div className="interaction-buttons">
          <button className="deposit interaction-button">deposit</button>
          <button className="withdraw interaction-button">withdraw</button>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    state: state.vaults,
  };
};

export default connect(mapStateToProps)(VaultCard);
