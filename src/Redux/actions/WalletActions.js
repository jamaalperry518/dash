import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const web3Modal = new Web3Modal({
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

const setProvider = async (provider) => {
  const eth = new ethers.providers.Web3Provider(provider || window.ethereum);

  const signer = eth.getSigner();
  let connectDataObject = {
    provider: provider,
    signer: signer,
    network: await eth.getNetwork(),
  };
  return connectDataObject;
};
export const connectUserWallet = () => (dispatch) => {
  web3Modal
    .connect()
    .then(async () => {
      const provider = await web3Modal.connect();
      if (!provider) {
        console.log("No Provider");
      } else {
        window.ethereum
          .enable()
          .then(async (res) => {
            let connectionResponse = await setProvider(provider);
            console.log(connectionResponse);
            let networkName;
            if (connectionResponse.network.chainId === 100) {
              networkName = "xDai";
            } else {
              networkName = connectionResponse.network.name;
            }

            dispatch({
              type: "CONNECT_WALLET",
              address: res[0],
              provider: connectionResponse.provider,
              signer: connectionResponse.signer,
              network: networkName,
            });
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
