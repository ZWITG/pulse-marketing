"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/theme-toggle";
import { inboxItems } from "@/lib/mock-data";

const unread = inboxItems.filter((i) => !i.replied).length;

const icons: Record<string, string> = {
  "/dashboard": "M2.5 8.5 8 3l5.5 5.5V13a.5.5 0 0 1-.5.5H9.5V10h-3v3.5H3a.5.5 0 0 1-.5-.5V8.5Z",
  "/inbox": "M2.5 9.5 4 3.5h8l1.5 6M2.5 9.5v3a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-3M2.5 9.5h3.2a2.3 2.3 0 0 0 4.6 0h3.2",
  "/compose": "M3 13h2.2l7-7a1.5 1.5 0 0 0-2.2-2.2l-7 7V13Z",
  "/calendar": "M3 4.5h10v8.5H3zM3 7h10M5.5 3v2.5M10.5 3v2.5",
  "/analytics": "M3 13V8.5M7 13V4M11 13V6.5M14 13H2",
  "/accounts": "M8 8a2.7 2.7 0 1 0 0-5.4A2.7 2.7 0 0 0 8 8ZM3 13.5c.4-2.4 2.5-3.8 5-3.8s4.6 1.4 5 3.8",
  "/automations": "M8.8 2 4 8.6h3.4L7.2 14 12 7.4H8.6L8.8 2Z",
  "/settings": "M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM8 2v1.5M8 12.5V14M2 8h1.5M12.5 8H14M3.8 3.8l1 1M11.2 11.2l1 1M12.2 3.8l-1 1M4.8 11.2l-1 1",
};

const groups = [
  {
    label: "Marketing",
    items: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/inbox", label: "Inbox", count: unread },
      { href: "/compose", label: "Compose" },
      { href: "/calendar", label: "Calendar" },
      { href: "/analytics", label: "Analytics" },
    ],
  },
  {
    label: "Manage",
    items: [
      { href: "/accounts", label: "Accounts" },
      { href: "/automations", label: "Automations" },
      { href: "/settings", label: "Settings" },
    ],
  },
];

function Icon({ d }: { d: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function Workspace() {
  return (
    <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left hover:bg-[var(--active)]" aria-label="Switch workspace">
      <span className="flex h-7 w-7 items-center justify-center rounded-md text-[13px] font-semibold text-white" style={{ background: "var(--accent)" }}>F</span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold">Fieldnote Studio</span>
        <span className="block truncate text-[13px] text-[var(--muted)]">Pulse · 5 channels</span>
      </span>
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="var(--muted)" strokeWidth="1.4" aria-hidden="true"><path d="m4.5 6.5 3.5 3.5 3.5-3.5" /></svg>
    </button>
  );
}

function Nav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  return (
    <nav className="flex-1 overflow-y-auto px-2 pt-2" aria-label="Main">
      {groups.map((g) => (
        <div key={g.label} className="mb-5">
          <div className="px-3 pb-1.5 text-[13px] text-[var(--muted)]">{g.label}</div>
          <div className="space-y-0.5">
            {g.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`flex h-8 items-center gap-2.5 rounded-md px-3 text-sm max-md:h-11 ${isActive(item.href) ? "bg-[var(--active)] font-medium text-[var(--text)]" : "text-[var(--muted)] hover:bg-[var(--active)] hover:text-[var(--text)]"}`}
              >
                <Icon d={icons[item.href]} />
                <span className="flex-1">{item.label}</span>
                {item.count ? <span className="text-[13px] tabular-nums text-[var(--accent)]">{item.count}</span> : null}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </nav>
  );
}

function UserRow() {
  return (
    <div className="flex items-center gap-2 border-t border-[var(--border)] px-3 py-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-semibold" style={{ background: "var(--accent-track)", color: "var(--accent-ink)" }}>ZW</span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">Zwi</span>
        <span className="block truncate text-[13px] text-[var(--muted)]">Owner</span>
      </span>
      <ThemeToggle />
    </div>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-[240px] shrink-0 flex-col md:flex" style={{ background: "var(--ground)", borderRight: "1px solid var(--border)" }}>
        <div className="p-2 pt-3"><Workspace /></div>
        <Nav />
        <UserRow />
      </aside>

      <header className="fixed inset-x-0 top-0 z-30 flex h-12 items-center justify-between px-4 md:hidden" style={{ background: "var(--ground)", borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-md text-xs font-semibold text-white" style={{ background: "var(--accent)" }}>F</span>
          <span className="text-sm font-semibold">Fieldnote Studio</span>
        </div>
        <button className="btn btn-quiet" style={{ minHeight: 44, minWidth: 44 }} onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label="Menu">
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{open ? <path d="m3.5 3.5 9 9m0-9-9 9" /> : <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />}</svg>
        </button>
      </header>

      {open && (
        <div className="fixed inset-x-0 bottom-0 top-12 z-20 flex flex-col md:hidden" style={{ background: "var(--ground)" }}>
          <Nav onNavigate={() => setOpen(false)} />
          <UserRow />
        </div>
      )}
    </>
  );
}
