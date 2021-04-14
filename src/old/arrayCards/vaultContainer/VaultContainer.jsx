import React from "react";
import { connect } from "react-redux";

//components
import VaultCard from "./VaultCard";
import NoVault from "../../placeholders/NoVault";

const VaultContainer = (props) => {
  return (
    <div className="vault-container">
      {props.state.selectedVault.vaultName ? <VaultCard /> : <NoVault />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    state: state.vaults,
  };
};

export default connect(mapStateToProps)(VaultContainer);
