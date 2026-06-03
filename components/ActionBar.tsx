import Link from "next/link";
import { Grid2X2, Images } from "lucide-react";

export function ActionBar() {
  return (
    <div className="action-bar">
      <div>
        <p className="eyebrow">Next Actions</p>
        <p className="record-value">One wallet, one collection record.</p>
      </div>
      <div className="button-row">
        <Link className="text-button" href="/fragments">
          <Grid2X2 size={16} aria-hidden />
          Open Fragments
        </Link>
        <Link className="text-button secondary" href="/gallery">
          <Images size={16} aria-hidden />
          View Gallery
        </Link>
      </div>
    </div>
  );
}
