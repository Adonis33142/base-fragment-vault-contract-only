import Link from "next/link";
import { Fragment } from "@/lib/mockData";

export function FragmentRail({ fragments }: { fragments: Fragment[] }) {
  return (
    <aside className="fragment-rail">
      <p className="eyebrow">Slot Rail</p>
      <h2 className="panel-title">Index</h2>
      <div className="rail-list">
        {fragments.slice(0, 7).map((fragment) => (
          <Link className="rail-item" href={`/fragment/${fragment.id}`} key={fragment.id}>
            <span className="rail-code">F-{fragment.id}</span>
            <span>
              <span className="rail-name">{fragment.name}</span>
              <span className="rail-status">{fragment.status}</span>
            </span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
