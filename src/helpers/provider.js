import { JsonRpcProvider } from "@ethersproject/providers";

const provider = new JsonRpcProvider(process.env.REACT_APP_RPC_URL);

export default provider;
