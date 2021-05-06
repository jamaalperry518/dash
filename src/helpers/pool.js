import { merge } from "lodash";
import { multicall, subgraphRequest } from "./utils";
import {getAddres, isAddress, formatUnits} from ethers;
import provider from './provider';
import abi from '../data/ABI'
import queries from './queries.json';
import { getAddress } from "@ethersproject/address";

export default class Pool {
    address;
    checksum;
    ready = false;
    config
    metadata;

    constructor(address) {
        this.address = address.toLowerCase(),
        this.checksum = isAddress(address) ? getAddress(address) :  "";
        this.config = {};
    }
}
