import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { assets } from "../../data/assets/tokens";
import { ERC20_ABI } from "../../data/ABI";
import axios from "axios";

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

const setProvider = async () => {
  const eth = new ethers.providers.Web3Provider(window.ethereum);

  const signer = eth.getSigner();
  let connectDataObject = {
    provider: eth,
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

export const getBalance = async (provider, address) => {
  const assetArray = Object.values(assets);
  //eslin-disable-next-line

  assetArray.map(async (asset) => {
    const contract = new ethers.Contract(asset.address, ERC20_ABI, provider);

    const balance = ethers.utils.formatUnits(await contract.balanceOf(address));
    if (balance > 0) {
      axios
        .get(
          `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${asset.address}&vs_currencies=usd`
        )
        .then((res) => {})
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

export const getTokenPrice = (token) => {
  axios
    .get(
      `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${token}&vs_currencies=usd`
    )
    .then((res) => {
      let price = res.data[`${token.toLowerCase()}`]["usd"];
      console.log(price);
      return price;
    })
    .catch((err) => {
      console.log(err);
    });
};
