import React from "react";
import { useDispatch } from "react-redux";
import { connectUserWallet } from "../../../Redux/actions/WalletActions";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: false, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: "eccb6fa1fa2941bf82abe2b9c543bb14", // required
      },
    },
  },
});

const ConnectWallet = () => {
  const dispatch = useDispatch();
  const connectWallet = () => {
    web3Modal
      .connect()
      .then((provider) => {
        if (!provider) {
          console.log("No Provider");
        } else {
          window.ethereum
            .enable()
            .then((res) => {
              dispatch(connectUserWallet(res));
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="wallet-connection card ">
      <h1 className="title">connect your wallet to begin</h1>
      <button className="connect-wallet" onClick={connectWallet}>
        connect wallet
      </button>
    </div>
  );
};

export default ConnectWallet;
