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
    // "BAL-WETH": {
    //   address: "0x59a19d8c652fa0284f44113d0ff9aba70bd46fb4",
    //   name: "BAL-WETH",
    //   tokens: {},
    // },
    // "GNO-WETH": {
    //   address: "0xe42237f32708bd5c04d69cc77e1e36c8f911a016",
    //   name: "GNO-WETH",
    //   tokens: {},
    // },
    "WETH-BAL-WBTC": {
      address: "0x102efb11d588fa03dfc9fb5e0894dd241839d3f8",
      name: "WETH-BAL-WBTC",
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
