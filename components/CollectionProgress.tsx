import { getCollectionSummary } from "@/lib/fragmentLogic";
import { Fragment } from "@/lib/mockData";

export function CollectionProgress({ fragments }: { fragments: Fragment[] }) {
  const summary = getCollectionSummary(fragments);

  return (
    <section className="progress-panel" aria-label="Collection progress">
      <div className="progress-head">
        <div>
          <p className="eyebrow">Collection Progress</p>
          <h2 className="panel-title">Ownership Signal</h2>
        </div>
        <div className="progress-value">{summary.completionRate}%</div>
      </div>
      <div className="progress-track" aria-label={`${summary.completionRate}% complete`}>
        <div className="progress-fill" style={{ width: `${summary.completionRate}%` }} />
      </div>
      <p className="panel-copy">
        {summary.ownedCount} owned slots, {summary.missingCount} missing slots.
      </p>
    </section>
  );
}
