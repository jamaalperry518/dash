const initialState = {
  currentPool: null,
  assetArray: [],
  loaded: false,
  pools: {
    "WETH-wBTC": {
      address: "0x1eff8af5d577060ba4ac8a29a13525bb0ee2a3d5",
      name: "WETH-WBTC",
      tokens: {},
    },
  },
};

const vaultReducer = (state = initialState, action) => {
  switch (action.type) {
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

    case "GET_ALL_POOLS":
      return {
        ...state,
        pools: action.payload,
      };
    case "ALL_LOADED":
      return {
        ...state,
        loaded: action.payload,
      };
    default:
      return state;
  }
};

export default vaultReducer;
