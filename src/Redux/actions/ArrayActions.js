export const getTotalTvl = (data) => (dispatch) => {
  let arr = Object.values(data);
  let totalTvl = 0;
  arr.map((vault) => {
    return (totalTvl += vault.tvl);
  });

  return dispatch({
    type: "SET_TOTAL_TVL",
    payload: totalTvl,
  });
};
