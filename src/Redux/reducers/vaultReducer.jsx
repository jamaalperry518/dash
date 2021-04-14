import { SELECT_VAULT, CLEAR_VAULT } from "../types/vaultTypes";

import btc_logo from "../../assets/btc_logo.png";
import eth_logo from "../../assets/eth_logo.png";
import dai_logo from "../../assets/dai_logo.png";
import uni_logo from "../../assets/uni_logo.png";
import usdt_logo from "../../assets/usdt_logo.png";

const initialState = {
  selectedVault: {},
  vaults: {
    BTC: {
      id: 0,
      img: btc_logo,
      vaultName: "BTC",
      vaultSymbol: "BTC-Vault",
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
    default:
      return state;
  }
};

export default vaultReducer;
