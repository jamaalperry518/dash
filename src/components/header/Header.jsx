import React from "react";
import { logo } from "../../assets/svg";

import WalletConnection from "./WalletConnection";

const Header = () => {
  return (
    <div className="header">
      <a href="http://array.finance" target="_blank" rel="noopener noreferrer">
        {logo}
      </a>
      <WalletConnection />
    </div>
  );
};

export default Header;
