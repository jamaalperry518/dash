import axios from "axios";

// currency conversion helpers
export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const prettyBalance = (balance) => {
  return currencyFormatter.format(balance / 1000000);
};
export const convertStandardNumber = (num) => {
  return num ? currencyFormatter.format(num) : "$0.00";
};

export const getBigCoinsPrice = () => (dispatch) => {
  const bigCoins = ["bitcoin", "ethereum", "1inch", "curve-dao-token"];
  bigCoins.map((coin) => {
    let upper = coin.toUpperCase();
    if (coin === "curve-dao-token") {
      upper = "CRV";
    }
    if (coin === "1inch") {
      upper = "ONEINCH";
    }
    return axios
      .get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`
      )
      .then((res) => {
        return dispatch({
          type: `GET_${upper}_PRICE`,
          payload: convertStandardNumber(res.data[coin]["usd"]),
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};
