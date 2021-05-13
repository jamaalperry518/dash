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
  return num ? currencyFormatter.format(num) : "0.00";
};
export const getExchangeRates = () => (dispatch) => {
  axios
    .get("https://api.ratesapi.io/api/latest?base=USD")
    .then((res) => {
      dispatch({
        type: "GET_EXCHANGE_RATES",
        payload: res.data.rates,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
