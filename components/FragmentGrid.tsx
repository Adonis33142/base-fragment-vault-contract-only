import { Fragment } from "@/lib/mockData";
import { FragmentTile } from "@/components/FragmentTile";

export function FragmentGrid({ fragments }: { fragments: Fragment[] }) {
  return (
    <div className="fragment-grid">
      {fragments.map((fragment) => (
        <FragmentTile key={fragment.id} fragment={fragment} />
      ))}
    </div>
  );
}
