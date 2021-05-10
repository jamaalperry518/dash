import React from "react";
import { connect, useDispatch } from "react-redux";
import { selectVault } from "../../Redux/actions/poolActions";

const AllVaultsCards = (props) => {
  const vaults = Object.values(props.state.vaults);
  const dispatch = useDispatch();
  const vaultPicker = (vault) => {
    dispatch(selectVault(vault));
  };

  return (
    <div className="all-vaults-card card">
      <h1 className="title">vaults</h1>
      <button className="view-vaults">coming soon</button>

      <div className="mining-interactions">
        <h1 className="title">mine array</h1>
        <p className="subtext">
          turn your interest directly into collateralized Array tokens
        </p>
        <div className="mining-buttons">
          {vaults?.map((vault, i) => {
            return (
              <button
                vault={vault}
                key={i}
                className="mining-button"
                onClick={() => vaultPicker(vault)}
              >
                <div className="button-text">
                  <p className="vault-name">{vault.vaultName}</p>
                  <p className="vault-apy">{vault.vaultApy}% apy</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    state: state.pools.vaults,
  };
};

export default connect(mapStateToProps)(AllVaultsCards);
