import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();
import { calcNextBlockBaseFee } from "./utils.js";
import IUniswapV2Pair from "./ABIs/IUniswapV2Pair.js";
import IERC20 from "./ABIs/IERC20.js";
import Web3 from "web3";
// Const addresses on ethereum
export const WETH = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const WETHUSDTV2Pair = "0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852";
export const Univ2Router = "0x7a250d5630b4cf539739df2c5dacb4c659f2488d";
export const DEAD1 = "0x0000000000000000000000000000000000000000"
export const DEAD2 = "0x000000000000000000000000000000000000dead"
export const TeamFinance = "0xe2fe530c047f2d85298b07d9333c05737f1435fb";
export const Unicrypt = "0x663A5C229c09b049E36dCc11a9B0d4a8Eb9db214";
export const Pinklock = "0x71B5759d73262FBb223956913ecF4ecC51057641";

// Providers from local node
export const provider = new ethers.providers.JsonRpcProvider(
  process.env.RPC_URL
);

export const wssProvider = new ethers.providers.WebSocketProvider(
  process.env.RPC_URL_WSS
);

export const ERC20Contract = new ethers.Contract(ethers.constants.AddressZero, IERC20, wssProvider);

export const UniswapV2PairContract = new ethers.Contract(
  ethers.constants.AddressZero,
  IUniswapV2Pair,
  wssProvider
);

export let maxBlockNumber = (await wssProvider.getBlock("latest")).number;
export const setMaxBlockNumber = (latestBlockNumber) =>{
  maxBlockNumber = latestBlockNumber;
}

export let nextBlockBaseFee = calcNextBlockBaseFee(await wssProvider.getBlock("latest"));
export const setNextBlockBaseFee = (latestBlock) => {
  nextBlockBaseFee = calcNextBlockBaseFee(latestBlock);
}

export const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));

export let ETHPrice = 0;
export const SetETHPrice = (_ETHPrice) => {
  ETHPrice = _ETHPrice;
}

export let checkedPairs = [];