const IUnicrypt = [
  {
    "inputs": [
      {
        "internalType": "contract IUniFactory",
        "name": "_uniswapFactory",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "lpToken",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "user",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "lockDate",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "unlockDate",
        "type": "uint256"
      }
    ],
    "name": "onDeposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "lpToken",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "onWithdraw",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "gFees",
    "outputs": [
      { "internalType": "uint256", "name": "ethFee", "type": "uint256" },
      {
        "internalType": "contract IERCBurn",
        "name": "secondaryFeeToken",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "secondaryTokenFee",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "secondaryTokenDiscount",
        "type": "uint256"
      },
      { "internalType": "uint256", "name": "liquidityFee", "type": "uint256" },
      {
        "internalType": "uint256",
        "name": "referralPercent",
        "type": "uint256"
      },
      {
        "internalType": "contract IERCBurn",
        "name": "referralToken",
        "type": "address"
      },
      { "internalType": "uint256", "name": "referralHold", "type": "uint256" },
      {
        "internalType": "uint256",
        "name": "referralDiscount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_index", "type": "uint256" }
    ],
    "name": "getLockedTokenAtIndex",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getNumLockedTokens",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_lpToken", "type": "address" }
    ],
    "name": "getNumLocksForToken",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_user", "type": "address" },
      { "internalType": "address", "name": "_lpToken", "type": "address" },
      { "internalType": "uint256", "name": "_index", "type": "uint256" }
    ],
    "name": "getUserLockForTokenAtIndex",
    "outputs": [
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "uint256", "name": "", "type": "uint256" },
      { "internalType": "address", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_user", "type": "address" },
      { "internalType": "uint256", "name": "_index", "type": "uint256" }
    ],
    "name": "getUserLockedTokenAtIndex",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_user", "type": "address" }
    ],
    "name": "getUserNumLockedTokens",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_user", "type": "address" },
      { "internalType": "address", "name": "_lpToken", "type": "address" }
    ],
    "name": "getUserNumLocksForToken",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_user", "type": "address" }
    ],
    "name": "getUserWhitelistStatus",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_index", "type": "uint256" }
    ],
    "name": "getWhitelistedUserAtIndex",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getWhitelistedUsersLength",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_lpToken", "type": "address" },
      { "internalType": "uint256", "name": "_index", "type": "uint256" },
      { "internalType": "uint256", "name": "_lockID", "type": "uint256" },
      { "internalType": "uint256", "name": "_amount", "type": "uint256" }
    ],
    "name": "incrementLock",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_lpToken", "type": "address" },
      { "internalType": "uint256", "name": "_amount", "type": "uint256" },
      { "internalType": "uint256", "name": "_unlock_date", "type": "uint256" },
      {
        "internalType": "address payable",
        "name": "_referral",
        "type": "address"
      },
      { "internalType": "bool", "name": "_fee_in_eth", "type": "bool" },
      {
        "internalType": "address payable",
        "name": "_withdrawer",
        "type": "address"
      }
    ],
    "name": "lockLPToken",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_lpToken", "type": "address" },
      { "internalType": "uint256", "name": "_index", "type": "uint256" },
      { "internalType": "uint256", "name": "_lockID", "type": "uint256" },
      { "internalType": "uint256", "name": "_amount", "type": "uint256" }
    ],
    "name": "migrate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_lpToken", "type": "address" },
      { "internalType": "uint256", "name": "_index", "type": "uint256" },
      { "internalType": "uint256", "name": "_lockID", "type": "uint256" },
      { "internalType": "uint256", "name": "_unlock_date", "type": "uint256" }
    ],
    "name": "relock",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "_devaddr",
        "type": "address"
      }
    ],
    "name": "setDev",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_referralPercent",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_referralDiscount",
        "type": "uint256"
      },
      { "internalType": "uint256", "name": "_ethFee", "type": "uint256" },
      {
        "internalType": "uint256",
        "name": "_secondaryTokenFee",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_secondaryTokenDiscount",
        "type": "uint256"
      },
      { "internalType": "uint256", "name": "_liquidityFee", "type": "uint256" }
    ],
    "name": "setFees",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IMigrator",
        "name": "_migrator",
        "type": "address"
      }
    ],
    "name": "setMigrator",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERCBurn",
        "name": "_referralToken",
        "type": "address"
      },
      { "internalType": "uint256", "name": "_hold", "type": "uint256" }
    ],
    "name": "setReferralTokenAndHold",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_secondaryFeeToken",
        "type": "address"
      }
    ],
    "name": "setSecondaryFeeToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_lpToken", "type": "address" },
      { "internalType": "uint256", "name": "_index", "type": "uint256" },
      { "internalType": "uint256", "name": "_lockID", "type": "uint256" },
      { "internalType": "uint256", "name": "_amount", "type": "uint256" }
    ],
    "name": "splitLock",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "", "type": "address" },
      { "internalType": "uint256", "name": "", "type": "uint256" }
    ],
    "name": "tokenLocks",
    "outputs": [
      { "internalType": "uint256", "name": "lockDate", "type": "uint256" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" },
      { "internalType": "uint256", "name": "initialAmount", "type": "uint256" },
      { "internalType": "uint256", "name": "unlockDate", "type": "uint256" },
      { "internalType": "uint256", "name": "lockID", "type": "uint256" },
      { "internalType": "address", "name": "owner", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_lpToken", "type": "address" },
      { "internalType": "uint256", "name": "_index", "type": "uint256" },
      { "internalType": "uint256", "name": "_lockID", "type": "uint256" },
      {
        "internalType": "address payable",
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "transferLockOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "newOwner", "type": "address" }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "uniswapFactory",
    "outputs": [
      { "internalType": "contract IUniFactory", "name": "", "type": "address" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_user", "type": "address" },
      { "internalType": "bool", "name": "_add", "type": "bool" }
    ],
    "name": "whitelistFeeAccount",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "_lpToken", "type": "address" },
      { "internalType": "uint256", "name": "_index", "type": "uint256" },
      { "internalType": "uint256", "name": "_lockID", "type": "uint256" },
      { "internalType": "uint256", "name": "_amount", "type": "uint256" }
    ],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export default IUnicrypt;