import { SELECT_VAULT } from "../types/vaultTypes";
export const selectVault = (vault) => (dispatch) => {
  dispatch({
    type: SELECT_VAULT,
    payload: vault,
  });
};
