"use client";

import { Gem } from "lucide-react";
import { useFragmentCollectionVault } from "@/hooks/useFragmentCollectionVault";

function formatValue(value: bigint | undefined) {
  return value === undefined ? "Loading" : value.toString();
}

export default function HomePage() {
  const {
    address,
    canClaim,
    claimError,
    claimFragment,
    contractAddress,
    fragmentId,
    hasSelectedOwner,
    hasWalletClaim,
    isClaiming,
    lastClaimHash,
    maxFragmentId,
    readError,
    selectedOwner,
    setFragmentId,
    totalClaims,
    walletClaimCount
  } = useFragmentCollectionVault();

  const maxId = Number(maxFragmentId ?? BigInt(12));

  return (
    <main className="page-shell">
      <section className="panel contract-panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Base Contract</p>
            <h2 className="panel-title">Fragment Claim</h2>
            <p className="panel-copy">Connected wallets can call the deployed vault contract directly on Base.</p>
          </div>
        </div>

        <div className="metric-grid">
          <div className="metric">
            <p className="metric-label">Contract</p>
            <p className="record-value">{contractAddress}</p>
          </div>
          <div className="metric">
            <p className="metric-label">Wallet</p>
            <p className="record-value">{address ?? "Not connected"}</p>
          </div>
          <div className="metric">
            <p className="metric-label">Total Claims</p>
            <p className="metric-value">{formatValue(totalClaims)}</p>
          </div>
          <div className="metric">
            <p className="metric-label">Wallet Claims</p>
            <p className="metric-value">{formatValue(walletClaimCount)}</p>
          </div>
        </div>

        <div className="claim-panel">
          <label className="field-label" htmlFor="fragment-id">
            Fragment ID
          </label>
          <input
            id="fragment-id"
            className="number-input"
            type="number"
            min={1}
            max={maxId}
            value={fragmentId}
            onChange={(event) => setFragmentId(Number(event.target.value))}
          />
          <p className="panel-copy">Valid range: 1 to {maxId}</p>

          <div className="record-strip">
            <div className="record-row">
              <p className="record-label">Selected Owner</p>
              <p className="record-value">{hasSelectedOwner ? selectedOwner : "Unclaimed"}</p>
            </div>
            <div className="record-row">
              <p className="record-label">Claim State</p>
              <p className="record-value">
                {hasWalletClaim
                  ? "This wallet already claimed."
                  : hasSelectedOwner
                    ? "This fragment is already owned."
                    : "Ready when wallet is connected."}
              </p>
            </div>
          </div>

          <button className="claim-button" type="button" disabled={!canClaim} onClick={claimFragment}>
            <Gem size={16} aria-hidden />
            {isClaiming ? "Claiming" : "Claim Fragment"}
          </button>

          {lastClaimHash ? <div className="proof-box">Transaction hash: {lastClaimHash}</div> : null}
          {claimError ? <div className="proof-box error-box">{claimError}</div> : null}
          {readError ? <div className="proof-box error-box">{readError.message}</div> : null}
        </div>
      </section>
    </main>
  );
}
