import Link from "next/link";
import { Fragment } from "@/lib/mockData";
import { FragmentStatusChip } from "@/components/FragmentStatusChip";

export function FeaturedFragmentPanel({ fragment }: { fragment: Fragment }) {
  return (
    <aside className="featured-panel">
      <p className="eyebrow">Featured Fragment</p>
      <h2 className="panel-title">{fragment.name}</h2>
      <div className="featured-slab">
        <div>
          <div className="featured-index">F-{fragment.id}</div>
          <FragmentStatusChip status={fragment.status} />
        </div>
        <p className="featured-name">{fragment.tier} Tier</p>
      </div>
      <p className="panel-copy">Proof hash and ownership state are ready for inspection.</p>
      <div className="button-row" style={{ marginTop: 12 }}>
        <Link className="text-button" href={`/fragment/${fragment.id}`}>
          Inspect Fragment
        </Link>
      </div>
    </aside>
  );
}
