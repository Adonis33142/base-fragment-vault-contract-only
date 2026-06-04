"use client";

import { useEffect, useState } from "react";
import { zeroAddress } from "viem";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { base } from "wagmi/chains";
import {
  FRAGMENT_COLLECTION_VAULT_CONTRACT_ADDRESS,
  fragmentCollectionVaultAbi
} from "@/lib/contracts";

const DEFAULT_FRAGMENT_ID = 1;

export function useFragmentCollectionVault() {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [fragmentId, setFragmentId] = useState(DEFAULT_FRAGMENT_ID);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();
  const [lastClaimHash, setLastClaimHash] = useState<string | null>(null);
  const [claimError, setClaimError] = useState<string | null>(null);

  const maxFragmentId = useReadContract({
    address: FRAGMENT_COLLECTION_VAULT_CONTRACT_ADDRESS,
    abi: fragmentCollectionVaultAbi,
    functionName: "MAX_FRAGMENT_ID",
    chainId: base.id
  });

  const totalClaims = useReadContract({
    address: FRAGMENT_COLLECTION_VAULT_CONTRACT_ADDRESS,
    abi: fragmentCollectionVaultAbi,
    functionName: "totalClaims",
    chainId: base.id
  });

  const fragmentOwner = useReadContract({
    address: FRAGMENT_COLLECTION_VAULT_CONTRACT_ADDRESS,
    abi: fragmentCollectionVaultAbi,
    functionName: "fragmentOwner",
    args: [BigInt(fragmentId)],
    chainId: base.id
  });

  const walletClaimCount = useReadContract({
    address: FRAGMENT_COLLECTION_VAULT_CONTRACT_ADDRESS,
    abi: fragmentCollectionVaultAbi,
    functionName: "walletClaimCount",
    args: [address ?? zeroAddress],
    chainId: base.id
  });

  const receipt = useWaitForTransactionReceipt({
    hash: txHash,
    chainId: base.id
  });

  const isClaiming = receipt.isLoading;
  const selectedOwner = fragmentOwner.data ?? zeroAddress;
  const hasSelectedOwner = selectedOwner !== zeroAddress;
  const hasWalletClaim = Boolean(walletClaimCount.data && walletClaimCount.data > BigInt(0));
  const canClaim = isConnected && !hasSelectedOwner && !hasWalletClaim && !isClaiming;

  useEffect(() => {
    if (!receipt.isSuccess) {
      return;
    }

    void totalClaims.refetch();
    void fragmentOwner.refetch();
    void walletClaimCount.refetch();
  }, [receipt.isSuccess, totalClaims, fragmentOwner, walletClaimCount]);

  async function claimFragment() {
    if (!canClaim) {
      return;
    }

    setClaimError(null);

    try {
      const nextHash = await writeContractAsync({
        address: FRAGMENT_COLLECTION_VAULT_CONTRACT_ADDRESS,
        abi: fragmentCollectionVaultAbi,
        functionName: "claimFragment",
        args: [BigInt(fragmentId)],
        chainId: base.id
      });

      setTxHash(nextHash);
      setLastClaimHash(nextHash);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Claim failed. Please try another wallet.";
      setClaimError(message);
    }
  }

  return {
    address,
    isConnected,
    canClaim,
    claimError,
    claimFragment,
    contractAddress: FRAGMENT_COLLECTION_VAULT_CONTRACT_ADDRESS,
    fragmentId,
    hasSelectedOwner,
    hasWalletClaim,
    isClaiming,
    lastClaimHash,
    maxFragmentId: maxFragmentId.data,
    readError:
      maxFragmentId.error ?? totalClaims.error ?? fragmentOwner.error ?? walletClaimCount.error ?? receipt.error,
    selectedOwner,
    setFragmentId,
    totalClaims: totalClaims.data,
    walletClaimCount: walletClaimCount.data
  };
}
