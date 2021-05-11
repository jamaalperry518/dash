const initialState = {
  financialStats: {
    arrayPrice: {
      text: "Array token price",
      value: 76.13,
    },
    tvlCollateral: {
      text: "Tvl as collateral",
      value: 44456.04,
    },
    collateralPrice: {
      text: "Collateral price",
      value: 1.0023,
    },
  },
  tvl: 0,
};
const arrayReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOTAL_TVL":
      return {
        ...state,
        tvl: action.payload,
      };
    default:
      return state;
  }
};

export default arrayReducer;
