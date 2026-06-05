export const FRAGMENT_COLLECTION_VAULT_CONTRACT_ADDRESS: `0x${string}` =
  "0x7354006876d8bB1fd764Fe4B1A501F5DB39B7F3c";

export const fragmentCollectionVaultAbi = [
  {
    type: "function",
    name: "claimFragment",
    stateMutability: "nonpayable",
    inputs: [{ name: "fragmentId", type: "uint256" }],
    outputs: [{ name: "proofHash", type: "bytes32" }]
  },
  {
    type: "function",
    name: "MAX_FRAGMENT_ID",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "function",
    name: "totalClaims",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "function",
    name: "fragmentOwner",
    stateMutability: "view",
    inputs: [{ name: "", type: "uint256" }],
    outputs: [{ name: "", type: "address" }]
  },
  {
    type: "function",
    name: "walletClaimCount",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }]
  },
  {
    type: "event",
    name: "FragmentClaimed",
    inputs: [
      { name: "wallet", type: "address", indexed: true },
      { name: "fragmentId", type: "uint256", indexed: true },
      { name: "proofHash", type: "bytes32", indexed: false },
      { name: "ownedAt", type: "uint64", indexed: false }
    ],
    anonymous: false
  }
] as const;
