"use client";

import { useMemo, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { base } from "wagmi/chains";
import {
  FRAGMENT_COLLECTION_VAULT_CONTRACT_ADDRESS,
  fragmentCollectionVaultAbi
} from "@/lib/contracts";
import { fragments as initialFragments } from "@/lib/mockData";
import {
  getAvailableFragments,
  getCollectionSummary,
  getFeaturedFragment,
  getMissingFragments,
  getOwnedFragments
} from "@/lib/fragmentLogic";
import { BUILDER_CODE_SUFFIX } from "@/lib/wagmi";
import { trackTransaction } from "@/utils/track";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const hasConfiguredContract = FRAGMENT_COLLECTION_VAULT_CONTRACT_ADDRESS !== ZERO_ADDRESS;

export function useFragmentCollectionVault() {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const [fragments, setFragments] = useState(initialFragments);
  const [claimingId, setClaimingId] = useState<string | null>(null);
  const [lastClaimHash, setLastClaimHash] = useState<string | null>(null);
  const [claimError, setClaimError] = useState<string | null>(null);

  const summary = useMemo(() => getCollectionSummary(fragments), [fragments]);
  const ownedFragments = useMemo(() => getOwnedFragments(fragments), [fragments]);
  const missingFragments = useMemo(() => getMissingFragments(fragments), [fragments]);
  const availableFragments = useMemo(() => getAvailableFragments(fragments), [fragments]);
  const featuredFragment = useMemo(() => getFeaturedFragment(fragments), [fragments]);

  async function claimFragment(fragmentId: string) {
    const fragment = fragments.find((item) => item.id === fragmentId);

    if (!fragment || fragment.status === "locked" || fragment.status === "owned") {
      return;
    }

    setClaimingId(fragmentId);
    setClaimError(null);

    try {
      const txHash = hasConfiguredContract
        ? await writeContractAsync({
            address: FRAGMENT_COLLECTION_VAULT_CONTRACT_ADDRESS,
            abi: fragmentCollectionVaultAbi,
            functionName: "claimFragment",
            args: [BigInt(Number(fragmentId))],
            chainId: base.id,
            dataSuffix: BUILDER_CODE_SUFFIX
          })
        : `0xpreview${fragmentId}${Date.now().toString(16)}`;

      setFragments((current) =>
        current.map((item) =>
          item.id === fragmentId
            ? {
                ...item,
                status: "owned",
                ownedAt: new Date().toISOString()
              }
            : item
        )
      );
      setLastClaimHash(txHash);

      await trackTransaction(
        "app-fragment-collection",
        "base-split-vault-fragment-collection",
        address,
        txHash
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : "Claim failed. Please try another wallet.";
      setClaimError(message);
    } finally {
      setClaimingId(null);
    }
  }

  return {
    address,
    isConnected,
    fragments,
    summary,
    ownedFragments,
    missingFragments,
    availableFragments,
    featuredFragment,
    claimingId,
    lastClaimHash,
    claimError,
    hasConfiguredContract,
    claimFragment
  };
}
