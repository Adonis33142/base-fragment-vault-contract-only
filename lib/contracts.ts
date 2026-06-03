export const FRAGMENT_COLLECTION_VAULT_CONTRACT_ADDRESS: `0x${string}` =
  "0x43D389722DD6fa7e871477ee327F3Cc6dB406913";

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
