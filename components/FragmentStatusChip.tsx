import { CheckCircle2, Lock, Radio, Sparkles } from "lucide-react";
import { FragmentStatus } from "@/lib/mockData";

const statusLabels: Record<FragmentStatus | "ready" | "copied", string> = {
  locked: "Locked",
  available: "Available",
  owned: "Owned",
  featured: "Featured",
  ready: "Ready",
  copied: "Copied"
};

export function FragmentStatusChip({ status }: { status: FragmentStatus | "ready" | "copied" }) {
  const Icon =
    status === "locked"
      ? Lock
      : status === "owned" || status === "copied"
        ? CheckCircle2
        : status === "featured"
          ? Sparkles
          : Radio;

  return (
    <span className={`status-chip status-${status}`}>
      <Icon size={13} aria-hidden />
      {statusLabels[status]}
    </span>
  );
}
