import { CONNECT_WALLET, ESTABLISH_CONNECTION } from "../types/walletTypes";
import ethers from "ethers";

export const connectUserWallet = (address) => (dispatch) => {
  dispatch({
    type: CONNECT_WALLET,
    payload: address[0],
  });
};

const setConnection = (provider, signer, manager) => (dispatch) => {
  dispatch({
    type: ESTABLISH_CONNECTION,
    payload: provider,
    signer: signer,
  });
};
