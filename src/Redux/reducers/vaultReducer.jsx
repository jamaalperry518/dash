import { SELECT_VAULT, CLEAR_VAULT } from "../types/vaultTypes";

const initialState = {
  currentVault: "0x1eff8af5d577060ba4ac8a29a13525bb0ee2a3d5",
  currentPool: {},
  assetArray: [],
  swapFee: 0,

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
