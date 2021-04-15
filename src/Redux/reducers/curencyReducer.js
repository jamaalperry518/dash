const initialState = {
  array: {
    arrayPrice: 103.19,
    bondingPrice: 92.11,
    totalValueLocked: 2002192,
  },
  ethPrice: 0,
  btcPrice: 0,
  oneInchPrice: 0,
  crvPrice: 0,
  exchangeRates: {},
};

const vaultReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ETHEREUM_PRICE":
      return {
        ...state,
        ethPrice: action.payload,
      };
    case "GET_BITCOIN_PRICE":
      return {
        ...state,
        btcPrice: action.payload,
      };
    case "GET_ONEINCH_PRICE":
      return {
        ...state,
        oneInchPrice: action.payload,
      };
    case "GET_CRV_PRICE":
      return {
        ...state,
        crvPrice: action.payload,
      };
    case "GET_EXCHANGE_RATES":
      return {
        ...state,
        exchangeRates: action.payload,
      };
    default:
      return state;
  }
};

export default vaultReducer;
