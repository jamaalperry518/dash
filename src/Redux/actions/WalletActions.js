import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { assets } from "../../data/assets/tokens";
import { ERC20_ABI } from "../../data/ABI";
import axios from "axios";
import rpcProvider from "../../helpers/provider";
import Web3 from "web3";

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: process.env.REACT_APP_INFURA_KEY, // required
      },
    },
  },
});

export const setProvider = () => (dispatch) => {
  dispatch({
    type: "SET_PROVIDER",
  });
};

const addProviderEvents = (provider, userData) => {
  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    console.log("web3 account changed: ", accounts);
    if (accounts[0].toLowerCase() !== userData.id.toLowerCase())
      connectUserWallet();
  });

  // Subscribe to chainId change
  // provider.on("chainChanged", (chainId) => {
  //   console.log("chain changed: ", chainId);
  // });

  // Subscribe to provider connection
  provider.on("connect", (info) => {
    console.log("web3 connection changed: ", info.chainId);
  });

  // Subscribe to provider disconnection
  provider.on("disconnect", (error) => {
    console.log("web3 connection interrupted: ", error);
  });
};
let signer;
const getUserAccount = async (provider) => {
  let eth;
  let account;
  if (provider || window.ethereum) {
    eth = new ethers.providers.Web3Provider(provider || window.ethereum);
    const accounts = await eth.listAccounts();
    signer = await eth.getSigner();
    account = accounts[0];
  }

  return account || undefined;
};
export const connectUserWallet = () => async (dispatch) => {
  const provider = await web3Modal.connect();
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
  } else {
    window.web3 = new Web3(rpcProvider);
  }

  const userData = await getUserAccount(provider);
  if (provider.isMetaMask) {
    addProviderEvents(provider, userData);
  }

  dispatch({
    type: "CONNECT_WALLET",
    address: userData,
    provider: signer.provider,
    signer: signer,
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

      return price;
    })
    .catch((err) => {
      console.log(err);
    });
};
