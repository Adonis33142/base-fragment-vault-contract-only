import { publicGalleryRecords } from "@/lib/mockData";
import { CopyFragmentProofButton } from "@/components/CopyFragmentProofButton";
import { FragmentStatusChip } from "@/components/FragmentStatusChip";

export function GalleryWall() {
  return (
    <section className="gallery-wall">
      <p className="eyebrow">Public Fragment Wall</p>
      <h2 className="panel-title">Gallery Records</h2>
      <div className="gallery-grid">
        {publicGalleryRecords.map((record) => (
          <div key={record.recordId} className={`fragment-tile ${record.status}`}>
            <div>
              <div className="tile-index">F-{record.id}</div>
              <FragmentStatusChip status={record.status} />
            </div>
            <p className="tile-name">{record.name}</p>
            <div className="record-row">
              <p className="record-label">{record.recordId}</p>
              <p className="record-value">{record.wallet}</p>
              <CopyFragmentProofButton proofHash={record.proofHash} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
