import React, { useState, useEffect } from "react";
import { convertStandardNumber } from "../../../../../Redux/actions/currencyActions";
import axios from "axios";
import { FaAngleUp } from "react-icons/fa";
import { IconContext } from "react-icons";
//components
import Withdraw from "./Withdraw";
import Deposit from "./Deposit";
import Stake from "./Stake";
const VaultButtons = (props) => {
  const vault = props.vault;
  const [cardDisplayed, setCardDisplayed] = useState("");
  const [price, setPrice] = useState(0);

  const setCard = (e) => {
    setCardDisplayed(e.target.value);
  };
  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${vault.address}&vs_currencies=usd`
      )
      .then((res) => {
        setPrice(res.data[`${vault.address.toLowerCase()}`]["usd"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [vault.address]);
  return (
    <IconContext.Provider value={{ className: "close-vault" }}>
      <div
        className={props.show ? "withdraw-deposit show" : "withdraw-deposit"}
      >
        <div className="balance-info">
          <p className="section-heading">Your deposit in this vault</p>
          <p className="user-deposit-in-vault">
            {" "}
            {vault.depositInVault} {vault.symbol}
          </p>
          <p className="deposit-fiat-amount">
            ( ~ {convertStandardNumber(price * vault.depositInVault)})
          </p>
        </div>
        <FaAngleUp
          style={
            {
              // height: "3rem",
              // width: "3rem",
              // position: "absolute",
              // cursor: "pointer",
              // top: "8rem",
              // left: "0",
              // right: "0",
              // margin: "0 auto",
            }
          }
          onClick={props.vaultCloseHandler}
          className="close-vault"
        />
        {(() => {
          switch (cardDisplayed) {
            case "deposit":
              return <Deposit vault={props.vault} setCard={setCard} />;
            case "withdraw":
              return <Withdraw vault={props.vault} setCard={setCard} />;
            case "stake":
              return <Stake vault={props.vault} setCard={setCard} />;

            default:
              return (
                <div className="withdraw-deposit-buttons">
                  <select
                    onClick={(e) => setCard(e)}
                    name="vault-actions"
                    id="actions"
                  >
                    <option value="" className="action">
                      Actions
                    </option>
                    <option value="deposit" className="action">
                      Deposit
                    </option>
                    <option value="stake" className="action">
                      Stake
                    </option>
                    <option value="withdraw" className="action">
                      Withdraw
                    </option>
                  </select>
                </div>
              );
          }
        })()}
      </div>
    </IconContext.Provider>
  );
};

export default VaultButtons;
