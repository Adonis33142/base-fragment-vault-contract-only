"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Grid2X2, Images, LayoutGrid, Layers3, UserRound } from "lucide-react";

const tabs = [
  { href: "/", label: "Vault", icon: Layers3 },
  { href: "/fragments", label: "Fragments", icon: Grid2X2 },
  { href: "/my", label: "My Collection", icon: UserRound },
  { href: "/gallery", label: "Gallery", icon: Images }
];

export function TopTabs() {
  const pathname = usePathname();

  return (
    <nav className="top-tabs" aria-label="Primary navigation">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);

        return (
          <Link key={tab.href} href={tab.href} className={isActive ? "active" : undefined}>
            <Icon size={16} aria-hidden />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
