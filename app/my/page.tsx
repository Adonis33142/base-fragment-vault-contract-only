"use client";

import { MyCollectionPanel } from "@/components/MyCollectionPanel";
import { useFragmentCollectionVault } from "@/hooks/useFragmentCollectionVault";

export default function MyCollectionPage() {
  const { fragments, address } = useFragmentCollectionVault();

  return (
    <main className="page-shell">
      <div className="vault-grid my-layout">
        <MyCollectionPanel fragments={fragments} address={address} />
        <aside className="featured-panel rule-panel">
          <p className="eyebrow">Wallet Rule</p>
          <h2 className="panel-title">One Record</h2>
          <div className="featured-slab">
            <div className="featured-index">1:1</div>
            <p className="featured-name">One wallet, one collection record.</p>
          </div>
          <div className="rule-meter" aria-label="Wallet record signal">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="record-strip">
            <div className="record-row">
              <p className="record-label">Record State</p>
              <p className="record-value">Ready for Base claim attribution.</p>
            </div>
            <div className="record-row">
              <p className="record-label">Proof Scope</p>
              <p className="record-value">Owned slots and missing slots remain visible.</p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
