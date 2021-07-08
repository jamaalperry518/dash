import { ethers } from "ethers";
import { balancerABI } from "../../data/balancerABI";
import { ERC20_ABI, Curve_ABI } from "../../data/ABI";

import { tokenMaster } from "../../data/assets/tokenMaster";

import axios from "axios";

const arrayCurve = `0xa0bc1aEF5A4645a774Bd38F4733c6c4B4A4B0D0A`;
const arrayContractAddress = `0x1Bc65a16b8305C3186f88237C0AdeaD145396De0`;

let resultObject = {};
let assetObject = tokenMaster.tokens;

export const getPoolInfo =
  (poolName, asset, provider, address) => async (dispatch) => {
    const contract = new ethers.Contract(asset, balancerABI.abi, provider);
    let vaultSwapFee = await contract.getSwapFee().catch((err) => {
      console.log(err);
    });

    let swapFee = ethers.utils.formatUnits(vaultSwapFee.toString(), 18) * 100;

    let tokensInPool = {};
    let currentTokens = await contract.getCurrentTokens().catch((err) => {
      console.log(err);
    });
    currentTokens?.map(async (token) => {
      let currentToken = {};
      let normalizedWeight = 0;
      let tokenContract = new ethers.Contract(token, ERC20_ABI, provider);
      let result = await contract.getNormalizedWeight(token).catch((err) => {
        console.log(err);
      });
      normalizedWeight = ethers.utils.formatUnits(result.toString(), 18);
      let tokenPrice = axios
        .get(
          `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${token}&vs_currencies=usd`
        )
        .then((res) => {
          let price = res.data[`${token.toLowerCase()}`]["usd"];

          return price;
        })
        .catch((err) => {
          console.log(err);
        });

      let allowance;

      dispatch({
        type: "SET_POOL_ADDRESS",
        payload: asset,
      });
      currentToken = { ...assetObject[token] };
      if (address) {
        allowance = ethers.utils.formatUnits(
          await tokenContract.allowance(address, asset).catch((err) => {
            console.log(err);
          })
        );
      }

      // let tokenBalance = ethers.utils.formatUnits(
      //   await tokenContract.balanceOf(address).catch((err) => {
      //     console.log(err);
      //   })
      // );

      currentToken.value = parseFloat(normalizedWeight);
      currentToken.price = await tokenPrice.catch((err) => {
        console.log(err);
      });
      currentToken.allowance = allowance;
      // currentToken.user_balance = address !== "" ? tokenBalance : "0.0";
      tokensInPool[`${currentToken.symbol}`] = currentToken;
    });
    resultObject[`${poolName}`] = {
      address: asset,
      name: poolName,
      tokens: tokensInPool,
      swapFee: swapFee,
    };

    dispatch({
      type: "GET_ALL_POOLS",
      payload: resultObject,
    });
    dispatch({
      type: "SET_CURRENT_POOL",
      payload: resultObject["Array Collateral Pool"],
    });
  };

export const getTokenBalance =
  (pool, address, provider) => async (dispatch) => {
    let copy = { ...pool.tokens };
    let poolCopy = { ...pool };
    let tokenBalance;
    for (let vault in copy) {
      console.log();
      let token = copy[vault]["address"];
      let tokenContract = new ethers.Contract(token, ERC20_ABI, provider);
      tokenBalance = ethers.utils.formatUnits(
        await tokenContract.balanceOf(address).catch((err) => {
          console.log(err);
        })
      );

      copy[vault]["user_balance"] = tokenBalance;
    }

    poolCopy.tokens = copy;
    dispatch({
      type: "SET_CURRENT_POOL",
      payload: poolCopy,
    });
  };

export const setCurrentPool = (pool) => (dispatch) => {
  if (pool) {
    let arr = Object.values(pool["tokens"]);
    let result = arr.sort((a, b) => {
      return b.value - a.value;
    });

    dispatch({
      type: "SET_ASSET_ARRAY",
      payload: result,
    });
  }
};

export const mintArray = async (address, amount, token, provider) => {
  const arrayToken = new ethers.Contract(
    arrayContractAddress,
    ERC20_ABI,
    provider
  );

  let tempAmount = ethers.utils.parseUnits(amount);
  let formattedAmount = ethers.utils.formatUnits(tempAmount);

  const curve = new ethers.Contract(arrayCurve, Curve_ABI, provider);

  if (amount > "0.0") {
    const tokenInLp = await curve.isTokenInLP(token.address).catch((err) => {
      console.log(err);
    });
    console.log(tokenInLp);
    // console.log(curve);
    // const tokenInVirtualLp = await curve
    //   .isTokenInVirutalLP(token.address)
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // const allowance = await pool._token.allowance(address, pool.address);
    //   if (allowance.lt(formattedAmount))
    //     await pool._token.approve(pool.address, amount);
    //   await pool._token.mint(address, amount);
    // }
  } else {
    console.log("You can't mint nothin'");
  }
};

export const calculateArrayFromTokens = (token, amount, pool) => {
  if (amount > 0) {
    //amount will be formatted amount.
    pool.calculateArrayTokensGivenERC20Tokens(token, amount);
  }
};
