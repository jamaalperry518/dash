import { JsonRpcProvider } from "@ethersproject/providers";

const rpcProvider = new JsonRpcProvider(process.env.REACT_APP_RPC_URL);

export default rpcProvider;
