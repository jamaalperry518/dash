import React from "react";
import { connect } from "react-redux";

//components
import SingleVault from "./SingleVault";

const Vaults = (props) => {
  const allVaults = Object.values(props.vaults);

  return (
    <div className="vaults-container">
      <p className="section-heading">Vaults currently available.</p>
      {allVaults?.map((vault, i) => {
        return <SingleVault key={i} vault={vault} />;
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    vaults: state.vaults.state,
    address: state.wallet.address,
  };
};
export default connect(mapStateToProps)(Vaults);
