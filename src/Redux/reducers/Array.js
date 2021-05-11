const initialState = {
  financialStats: {
    arrayPrice: {
      text: "Array token price",
      value: 76.13,
    },
    totalTvl: {
      text: "Tvl total",
      value: 102479.33,
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
};
const arrayReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default arrayReducer;
