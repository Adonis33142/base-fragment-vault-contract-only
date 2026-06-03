"use client";

import { Gem } from "lucide-react";
import { Fragment } from "@/lib/mockData";

export function ClaimFragmentButton({
  fragment,
  isConnected,
  isClaiming,
  onClaim
}: {
  fragment: Fragment;
  isConnected: boolean;
  isClaiming: boolean;
  onClaim: () => void;
}) {
  const canClaim = isConnected && (fragment.status === "available" || fragment.status === "featured");

  return (
    <button className="claim-button" type="button" disabled={!canClaim || isClaiming} onClick={onClaim}>
      <Gem size={16} aria-hidden />
      {isClaiming ? "Claiming" : canClaim ? "Claim Fragment" : isConnected ? "Claim Locked" : "Wallet Required"}
    </button>
  );
}
