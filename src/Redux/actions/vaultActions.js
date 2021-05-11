import axios from "axios";

export const getSupplyAtCurrentBlock = (token, currentBlock) => {
  axios
    .get(
      `https://api.etherscan.io/api?module=stats&action=tokensupplyhistory&contractaddress=${token}&blockno=${currentBlock}&apikey=${process.env.REACT_APP_ETHERSCAN_KEY}`
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
