import React, { useEffect } from "react";
import { connect } from "react-redux";

//components
import SingleVault from "./SingleVault";

const Vaults = (props) => {
  const allVaults = Object.values(props.pools);
  useEffect(() => {
    console.log(props.pools);
  }, [props.pools]);
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
    vaults: state.vaults.vaults,
    address: state.wallet.address,
    pools: state.vaults.pools,
  };
};
export default connect(mapStateToProps)(Vaults);
