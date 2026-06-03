import Link from "next/link";
import { Fragment } from "@/lib/mockData";
import { FragmentStatusChip } from "@/components/FragmentStatusChip";

export function FragmentTile({ fragment }: { fragment: Fragment }) {
  return (
    <Link className={`fragment-tile ${fragment.status}`} href={`/fragment/${fragment.id}`}>
      <div className="tile-top">
        <div>
          <div className="tile-index">F-{fragment.id}</div>
          <div className="tile-proof">{fragment.proofHash.slice(0, 10)}...{fragment.proofHash.slice(-6)}</div>
        </div>
        <FragmentStatusChip status={fragment.status} />
      </div>
      <div className="tile-core">
        <span className="tile-node" aria-hidden />
        <p className="tile-name">{fragment.name}</p>
      </div>
      <div className="tile-meta">
        <span className="record-label">{fragment.tier}</span>
        <span className="record-label">Slot {fragment.index}</span>
      </div>
    </Link>
  );
}
