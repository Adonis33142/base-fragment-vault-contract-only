import Link from "next/link";
import { Fragment } from "@/lib/mockData";
import { CopyFragmentProofButton } from "@/components/CopyFragmentProofButton";
import { FragmentStatusChip } from "@/components/FragmentStatusChip";

export function FragmentDetailBoard({ fragment }: { fragment: Fragment }) {
  return (
    <section className="detail-board">
      <div>
        <p className="eyebrow">Fragment Proof Board</p>
        <h2 className="panel-title">{fragment.name}</h2>
        <p className="panel-copy">Slot F-{fragment.id} carries a public proof record and ownership state.</p>
      </div>
      <FragmentStatusChip status={fragment.status} />
      <div className="metric-grid">
        <div className="metric">
          <p className="metric-label">Index</p>
          <p className="metric-value">{fragment.index}</p>
        </div>
        <div className="metric">
          <p className="metric-label">Tier</p>
          <p className="metric-value">{fragment.tier}</p>
        </div>
        <div className="metric">
          <p className="metric-label">State</p>
          <p className="metric-value">{fragment.status}</p>
        </div>
        <div className="metric">
          <p className="metric-label">Owned Time</p>
          <p className="record-value">{fragment.ownedAt ?? "Not owned"}</p>
        </div>
      </div>
      <div>
        <p className="record-label">Proof Hash</p>
        <div className="proof-box">{fragment.proofHash}</div>
      </div>
      <div className="button-row">
        <CopyFragmentProofButton proofHash={fragment.proofHash} />
        <Link className="text-button secondary" href="/fragments">
          Back to Fragments
        </Link>
      </div>
    </section>
  );
}
