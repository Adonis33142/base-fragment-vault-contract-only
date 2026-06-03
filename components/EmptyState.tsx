import { Inbox } from "lucide-react";

export function EmptyState({
  title,
  copy
}: {
  title: string;
  copy: string;
}) {
  return (
    <div className="empty-state">
      <div>
        <Inbox size={28} aria-hidden />
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
    </div>
  );
}
