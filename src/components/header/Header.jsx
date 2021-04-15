import React from "react";
import { logo } from "../../assets/svg";

import WalletConnection from "./WalletConnection";

const Header = () => {
  return (
    <div className="header">
      {logo} <WalletConnection />
    </div>
  );
};

export default Header;
