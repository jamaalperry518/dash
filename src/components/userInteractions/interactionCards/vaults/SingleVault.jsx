import React, { useState, useEffect } from "react";
import { convertStandardNumber } from "../../../../Redux/actions/currencyActions";
//components
import { FaExternalLinkAlt } from "react-icons/fa";
import VaultButtons from "./VaultInteraction/VaultButtons";
import Chart from "../../../ui/Chart";

const SingleVault = (props) => {
  const vault = props.vault;
  const [poolTokens, setPoolTokens] = useState([]);

  useEffect(() => {
    let tokenArray = Object.values(vault.tokens);
    if (vault.tokens && poolTokens.length === 0) {
      const timer = setTimeout(() => {
        setPoolTokens(tokenArray);
      }, 50);
      return () => clearTimeout(timer);
    }

    //eslint-disable-next-line
  }, [vault.tokens]);

  return (
    <div className="single-vault">
      <div className="vault-top">
        <div className="vault-header">
          <div className="name-and-logo">
            <Chart assetsArray={poolTokens} />
            <p className="vault-name">{vault.name}</p>
          </div>

          <FaExternalLinkAlt className="etherscan-link" />
        </div>

        <div className="vault-stats">
          <div className="vault-stat">
            <p className="section-heading">TVL</p>
            <p className="stat-text">{convertStandardNumber(vault.vaultTvl)}</p>
          </div>

          <div className="vault-stat">
            <p className="section-heading">Swap Fee</p>
            <p className="stat-text">{vault.swapFee * 10}%</p>
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

      <VaultButtons vault={vault} />
    </div>
  );
};

export default SingleVault;
