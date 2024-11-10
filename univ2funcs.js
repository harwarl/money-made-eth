import { ethers } from "ethers";

/*
  Sorts tokens
*/
export const sortTokens = (tokenA, tokenB) => {
  if (ethers.BigNumber.from(tokenA).lt(ethers.BigNumber.from(tokenB))) {
    return [tokenA, tokenB];
  }
  return [tokenB, tokenA];
};

/*
  Computes pair addresses off-chain
*/
export const getUniv2PairAddress = (parameters) => {
  const {tokenA, tokenB} = parameters
  const [token0, token1] = sortTokens(tokenA, tokenB);

  const salt = ethers.utils.keccak256(token0 + token1.replace("0x", ""));
  const address = ethers.utils.getCreate2Address(
    "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f", // Factory address (contract creator)
    salt,
    "0x96e8ac4277198ff8b6f785478aa9a39f403cb768dd02cbee326c3e7da348845f" // init code hash
  );
  
  return address;
};

export const getUniv2DataGivenIn = (aIn, reserveA, reserveB) => {
  const aInWithFee = aIn.mul(997);
  const numerator = aInWithFee.mul(reserveB);
  const denominator = aInWithFee.add(reserveA.mul(1000));
  const bOut = numerator.div(denominator);

  // Underflow
  let newReserveB = reserveB.sub(bOut);
  if (newReserveB.lt(0) || newReserveB.gt(reserveB)) {
    newReserveB = ethers.BigNumber.from(1);
  }

  // Overflow
  let newReserveA = reserveA.add(aIn);
  if (newReserveA.lt(reserveA)) {
    newReserveA = ethers.constants.MaxInt256;
  }

  return {
    amountOut: bOut,
    newReserveA,
    newReserveB,
  };
};