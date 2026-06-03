import { notFound } from "next/navigation";
import { FragmentDetailBoard } from "@/components/FragmentDetailBoard";
import { getFragmentById } from "@/lib/fragmentLogic";
import { fragments } from "@/lib/mockData";

export function generateStaticParams() {
  return fragments.map((fragment) => ({ id: fragment.id }));
}

export default async function FragmentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const fragment = getFragmentById(id);

  if (!fragment) {
    notFound();
  }

  return (
    <main className="page-shell">
      <FragmentDetailBoard fragment={fragment} />
    </main>
  );
}
