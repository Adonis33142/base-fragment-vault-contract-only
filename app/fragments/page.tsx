"use client";

import { ClaimFragmentButton } from "@/components/ClaimFragmentButton";
import { CollectionProgress } from "@/components/CollectionProgress";
import { FragmentGrid } from "@/components/FragmentGrid";
import { FragmentStatusChip } from "@/components/FragmentStatusChip";
import { useFragmentCollectionVault } from "@/hooks/useFragmentCollectionVault";

export default function FragmentsPage() {
  const {
    fragments,
    availableFragments,
    isConnected,
    claimingId,
    lastClaimHash,
    claimError,
    hasConfiguredContract,
    claimFragment
  } = useFragmentCollectionVault();
  const primaryClaim = availableFragments[0];

  return (
    <main className="page-shell">
      <div className="vault-grid my-layout">
        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Fragment Grid Vault</p>
              <h2 className="panel-title">Slot Claim Board</h2>
              <p className="panel-copy">Available, owned, featured, and locked slots stay visible in one grid.</p>
            </div>
            <FragmentStatusChip status={lastClaimHash ? "ready" : "available"} />
          </div>
          <FragmentGrid fragments={fragments} />
        </section>
        <aside className="featured-panel">
          <p className="eyebrow">Claim Action</p>
          <h2 className="panel-title">{primaryClaim?.name ?? "No Open Slot"}</h2>
          <p className="panel-copy">
            {hasConfiguredContract
              ? "Claim writes to Base with builder attribution attached to calldata."
              : "Preview mode is active until the production contract address is added."}
          </p>
          {primaryClaim ? (
            <>
              <div className="featured-slab">
                <div className="featured-index">F-{primaryClaim.id}</div>
                <p className="featured-name">{primaryClaim.tier} Tier</p>
              </div>
              <div className="button-row" style={{ marginTop: 12 }}>
                <ClaimFragmentButton
                  fragment={primaryClaim}
                  isConnected={isConnected}
                  isClaiming={claimingId === primaryClaim.id}
                  onClaim={() => claimFragment(primaryClaim.id)}
                />
              </div>
            </>
          ) : null}
          <p className="panel-copy">One wallet, one collection record.</p>
          {lastClaimHash ? (
            <div className="proof-box">Last claim hash: {lastClaimHash}</div>
          ) : null}
          {claimError ? <div className="proof-box error-box">{claimError}</div> : null}
          <div style={{ marginTop: 14 }}>
            <CollectionProgress fragments={fragments} />
          </div>
        </aside>
      </div>
    </main>
  );
}
