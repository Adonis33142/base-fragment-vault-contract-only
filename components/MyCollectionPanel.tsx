import { BadgeCheck, LockKeyhole, ShieldCheck, Waypoints } from "lucide-react";
import { Fragment } from "@/lib/mockData";
import { getCollectionSummary } from "@/lib/fragmentLogic";
import { ActionBar } from "@/components/ActionBar";
import { CollectionProgress } from "@/components/CollectionProgress";
import { FragmentTile } from "@/components/FragmentTile";

export function MyCollectionPanel({
  fragments,
  address
}: {
  fragments: Fragment[];
  address?: string;
}) {
  const summary = getCollectionSummary(fragments);
  const owned = fragments.filter((fragment) => fragment.status === "owned");
  const missing = fragments.filter((fragment) => fragment.status !== "owned");

  return (
    <div className="ownership-map">
      <section className="panel ownership-hero">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Personal Collection Map</p>
            <h2 className="panel-title">Wallet Ownership Record</h2>
            <p className="panel-copy">
              {summary.hasCollectionRecord
                ? "A collection record is active for this wallet."
                : "Connect a wallet and claim a fragment to start a record."}
            </p>
          </div>
          <div className="hero-seal" aria-hidden>
            <ShieldCheck size={24} />
          </div>
        </div>
        <div className="metric-grid">
          <div className="metric">
            <p className="metric-label">Record</p>
            <p className="metric-value">{summary.hasCollectionRecord ? "Live" : "Open"}</p>
            <p className="metric-note">One wallet scope</p>
          </div>
          <div className="metric">
            <p className="metric-label">Owned</p>
            <p className="metric-value">{summary.ownedCount}</p>
            <p className="metric-note">Vault slots</p>
          </div>
          <div className="metric">
            <p className="metric-label">Missing</p>
            <p className="metric-value">{summary.missingCount}</p>
            <p className="metric-note">Unclaimed cells</p>
          </div>
          <div className="metric">
            <p className="metric-label">Complete</p>
            <p className="metric-value">{summary.completionRate}%</p>
            <p className="metric-note">Collection rate</p>
          </div>
        </div>
        <div className="record-strip">
          <div className="record-row">
            <p className="record-label">Connected Wallet</p>
            <p className="record-value">{address ?? "No wallet connected"}</p>
          </div>
          <div className="record-row">
            <p className="record-label">Public Summary</p>
            <p className="record-value">
              {summary.ownedCount} of {summary.totalCount} fragments owned with proof records reserved.
            </p>
          </div>
        </div>
      </section>

      <CollectionProgress fragments={fragments} />

      <section className="proof-lane panel">
        <div>
          <p className="eyebrow">Proof Lane</p>
          <h3 className="lane-title">
            <Waypoints size={16} aria-hidden />
            Ownership Path
          </h3>
        </div>
        <div className="proof-steps" aria-label="Ownership path">
          <span className="proof-step active">Wallet</span>
          <span className="proof-step active">Record</span>
          <span className="proof-step active">Owned Slots</span>
          <span className="proof-step">Missing Slots</span>
          <span className="proof-step">Public Proof</span>
        </div>
      </section>

      <section className="panel">
        <div className="lane-head">
          <h3 className="lane-title">
            <BadgeCheck size={16} aria-hidden />
            Owned Fragments
          </h3>
          <span className="record-label">{owned.length} slots</span>
        </div>
        <div className="lane-grid">
          {owned.map((fragment) => (
            <FragmentTile key={fragment.id} fragment={fragment} />
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="lane-head">
          <h3 className="lane-title">
            <LockKeyhole size={16} aria-hidden />
            Missing Fragments
          </h3>
          <span className="record-label">{missing.length} slots</span>
        </div>
        <div className="lane-grid">
          {missing.map((fragment) => (
            <FragmentTile key={fragment.id} fragment={fragment} />
          ))}
        </div>
      </section>

      <ActionBar />
    </div>
  );
}
