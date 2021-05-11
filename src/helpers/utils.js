import { ethers } from "ethers";

// import {jsonToGrapQLQuery} from 'json-to-graphql-query';
// import {abi as multicallAbi} from '../data/ABI/multiCall.json';

// const MULTICALL = config.addresses.multicall;
export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
};
// export async function multicall(provider, abi, calls, options) {
//   const multi = new Contract(MULTICALL, multicallAbi, provider);
//   const itf = new Interface(abi);
//   try {
//     const [, response] = await multi.aggregate(
//       calls.map(call => [
//         call[0].toLowerCase(),
//         itf.encodeFunctionData(call[1], call[2])
//       ]),
//       options || {}
//     );
//     return response.map((call, i) =>
//       itf.decodeFunctionResult(calls[i][1], call)
//     );
//   } catch (e) {
//     return Promise.reject();
//   }
// }

// export async function subgraphRequest(url, query) {
//   const res = await fetch(url, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ query: jsonToGraphQLQuery({ query }) })
//   });
//   const { data } = await res.json();
//   return data || {};
// }

// export function getTokenLogoUrl(address) {
//   if (address === 'ether') {
//     address = config.addresses.weth;
//   }
//   address = getAddress(address);
//   const metadata = config.tokens[address];
//   if (!metadata) {
//     return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`;
//   }
//   return metadata.logoUrl;
// }

export const formatInput = (amount) => {
  return ethers.utils.parseUnits(amount.toString(), 18);
};

export const calculateAPY = (supplyRate) => {
  //supplyRate = (totalSupply - totalsupply last block) * blocksPerDay
  let APY = Math.floor((1 + supplyRate / 4) ** 4 - 1);
  let reinvested = APY * 0.7;
  let minted = APY * 0.3;

  let result = {
    APY: APY.toFixed(1),
    reinvested: reinvested.toFixed(1),
    minted: minted.toFixed(1),
  };

  return result;
};
