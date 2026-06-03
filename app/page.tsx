import Link from "next/link";
import { ActionBar } from "@/components/ActionBar";
import { CollectionProgress } from "@/components/CollectionProgress";
import { FeaturedFragmentPanel } from "@/components/FeaturedFragmentPanel";
import { FragmentGrid } from "@/components/FragmentGrid";
import { FragmentRail } from "@/components/FragmentRail";
import { fragments } from "@/lib/mockData";
import { getFeaturedFragment } from "@/lib/fragmentLogic";

export default function HomePage() {
  const featured = getFeaturedFragment(fragments);

  return (
    <main className="page-shell">
      <div className="vault-grid">
        <FragmentRail fragments={fragments} />
        <section className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Collection Vault</p>
              <h2 className="panel-title">Fragment Signal Board</h2>
              <p className="panel-copy">Claim slots, inspect proof records, and track Base ownership progress.</p>
            </div>
          </div>
          <CollectionProgress fragments={fragments} />
          <FragmentGrid fragments={fragments.slice(0, 8)} />
          <div style={{ padding: 14 }}>
            <div className="button-row">
              <Link className="text-button" href="/fragments">
                Open Fragments
              </Link>
              <Link className="text-button secondary" href="/gallery">
                View Gallery
              </Link>
            </div>
          </div>
        </section>
        <FeaturedFragmentPanel fragment={featured} />
      </div>
      <div style={{ marginTop: 14 }}>
        <ActionBar />
      </div>
    </main>
  );
}
