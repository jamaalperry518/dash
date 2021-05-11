import React, { useState, useEffect } from "react";
import { convertStandardNumber } from "../../../../Redux/actions/currencyActions";
import { calculateAPY } from "../../../../helpers/utils";
import {
  getSupplyAtCurrentBlock,
  getSupplyAtLastBlock,
} from "../../../../Redux/actions/vaultActions";

//components
import { FaExternalLinkAlt } from "react-icons/fa";
import VaultButtons from "./VaultInteraction/VaultButtons";

const SingleVault = (props) => {
  const vault = props.vault;
  const [apyObj, setApy] = useState({
    APY: 0,
    reinvested: 0,
    minted: 0,
  });
  useEffect(() => {
    setApy(calculateAPY(vault.supplyRate));
  }, []);
  return (
    <div className="single-vault">
      <div className="vault-top">
        <div className="vault-header">
          <div className="name-and-logo">
            <div className="logo-container">
              <img className="vault-logo" src={vault.logoUrl} alt="" />
            </div>

            <p className="vault-name">{vault.symbol}</p>
          </div>

          <FaExternalLinkAlt className="etherscan-link" />
        </div>

        <div className="vault-stats">
          <div className="vault-stat">
            <p className="section-heading">TVL</p>
            <p className="stat-text">{convertStandardNumber(vault.tvl)}</p>
          </div>

          <div className="vault-stat">
            <p className="section-heading">APY</p>
            <p className="stat-text">{apyObj.APY}%</p>
          </div>

          <div className="vault-stat">
            <p className="section-heading">
              APY reinvested/ turned into Array tokens
            </p>
            <p className="stat-text">
              {apyObj.reinvested}% / {apyObj.minted}%
            </p>
          </div>
        </div>
      </div>

      <VaultButtons vault={vault} />
    </div>
  );
};

export default SingleVault;
