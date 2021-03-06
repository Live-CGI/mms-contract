/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  MessageProxy,
  MessageProxyInterface,
} from "../../../contracts/LiveCGIToken.sol/MessageProxy";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "targetChainHash",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "targetContract",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "postOutgoingMessage",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class MessageProxy__factory {
  static readonly abi = _abi;
  static createInterface(): MessageProxyInterface {
    return new utils.Interface(_abi) as MessageProxyInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): MessageProxy {
    return new Contract(address, _abi, signerOrProvider) as MessageProxy;
  }
}
