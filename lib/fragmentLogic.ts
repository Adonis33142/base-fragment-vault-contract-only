import { Fragment, fragments } from "@/lib/mockData";

export function getOwnedFragments(items: Fragment[] = fragments) {
  return items.filter((fragment) => fragment.status === "owned");
}

export function getMissingFragments(items: Fragment[] = fragments) {
  return items.filter((fragment) => fragment.status !== "owned");
}

export function getAvailableFragments(items: Fragment[] = fragments) {
  return items.filter((fragment) => fragment.status === "available" || fragment.status === "featured");
}

export function getFeaturedFragment(items: Fragment[] = fragments) {
  return items.find((fragment) => fragment.status === "featured") ?? items[0];
}

export function getCollectionSummary(items: Fragment[] = fragments) {
  const ownedCount = getOwnedFragments(items).length;
  const totalCount = items.length;
  const missingCount = totalCount - ownedCount;
  const completionRate = Math.round((ownedCount / totalCount) * 100);

  return {
    ownedCount,
    missingCount,
    totalCount,
    completionRate,
    hasCollectionRecord: ownedCount > 0
  };
}

export function getFragmentById(id: string) {
  return fragments.find((fragment) => fragment.id === id);
}
