import { SELECT_VAULT, CLEAR_VAULT } from "../types/vaultTypes";

import btc_logo from "../../assets/btc_logo.png";
import eth_logo from "../../assets/eth_logo.png";
import dai_logo from "../../assets/dai_logo.png";
import uni_logo from "../../assets/uni_logo.png";
import usdt_logo from "../../assets/usdt_logo.png";

const initialState = {
  currentVault: "0x1eff8af5d577060ba4ac8a29a13525bb0ee2a3d5",
  currentPool: {},
  assetArray: [],
  swapFee: 0,

  vaults: {
    WBTC: {
      id: 0,
      img: btc_logo,
      vaultName: "WBTC",
      vaultSymbol: "WBTC-Vault",
      vaultTvl: 402192,
      vaultApy: 68,
      reinvestedAPY: 7,
      reinvestedArray: 3,
      userDeposit: 2.875,
    },
    ETH: {
      id: 0,
      img: eth_logo,
      vaultName: "ETH",
      vaultSymbol: "ETH-Vault",
      vaultTvl: 402192,
      vaultApy: 68,
      reinvestedAPY: 7,
      reinvestedArray: 3,
      userDeposit: 2.875,
    },
    DAI: {
      id: 0,
      img: dai_logo,
      vaultName: "DAI",
      vaultSymbol: "DAI-Vault",
      vaultTvl: 402192,
      vaultApy: 68,
      reinvestedAPY: 7,
      reinvestedArray: 3,
      userDeposit: 2.875,
    },
    UNI: {
      id: 0,
      img: uni_logo,
      vaultName: "UNI",
      vaultSymbol: "UNI-Vault",
      vaultTvl: 402192,
      vaultApy: 68,
      reinvestedAPY: 7,
      reinvestedArray: 3,
      userDeposit: 2.875,
    },
    USDT: {
      id: 0,
      img: usdt_logo,
      vaultName: "USDT",
      vaultSymbol: "USDT-Vault",
      vaultTvl: 402192,
      vaultApy: 68,
      reinvestedAPY: 7,
      reinvestedArray: 3,
      userDeposit: 2.875,
    },
  },
  pools: {
    "wETH-wBTC": {
      address: "0x1eff8af5d577060ba4ac8a29a13525bb0ee2a3d5",
      name: "wETH-wBTC",
      tokens: {},
    },
    "BAL-wETH": {
      address: "0x59a19d8c652fa0284f44113d0ff9aba70bd46fb4",
      name: "BAL-wETH",
      tokens: {},
    },
    // 0x5b2dc8c02728e8fb6aea03a622c3849875a48801 : {
    //   address: "0x5b2dc8c02728e8fb6aea03a622c3849875a48801",
    //   name: "wPE_GIFT_IMPACT_YFU_PIXEL_NFTS_LIFT_STR",
    //   tokens: {}
    // },
    "wBTC-wETH": {
      address: "0x221bf20c2ad9e5d7ec8a9d1991d8e2edcfcb9d6c",
      name: "wETH-wBTC",
      tokens: {},
    },
    "GNO-wETH": {
      address: "0xe42237f32708bd5c04d69cc77e1e36c8f911a016",
      name: "GNO-wETH",
      tokens: {},
    },
  },
};

const vaultReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_VAULT:
      return {
        ...state,
        selectedVault: action.payload,
      };
    case CLEAR_VAULT:
      return {
        ...state,
        selectedVault: {},
      };
    case "SET_CURRENT_POOL":
      return {
        ...state,
        currentPool: action.payload,
      };
    case "SET_ASSET_ARRAY":
      return {
        ...state,
        assetArray: action.payload,
      };
    case "SET_SWAP_FEE":
      return {
        ...state,
        swapFee: action.payload,
      };
    case "GET_ALL_POOLS":
      return {
        ...state,
        pools: action.payload,
      };
    default:
      return state;
  }
};

export default vaultReducer;
