"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: "▦" },
  { href: "/accounts", label: "Accounts", icon: "◎" },
  { href: "/calendar", label: "Calendar", icon: " " },
  { href: "/compose", label: "Compose", icon: "✎" },
  { href: "/inbox", label: "Inbox", icon: "✉" },
  { href: "/analytics", label: "Analytics", icon: "▲" },
  { href: "/automations", label: "Automations", icon: "⚡" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="flex h-screen w-60 flex-col border-r border-neutral-200 bg-white">
      <div className="flex items-center gap-2 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-900 text-sm font-semibold text-white">
          P
        </div>
        <span className="text-sm font-semibold tracking-tight">Pulse</span>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {nav.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition ${
                active
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              <span className="w-4 text-center">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-neutral-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-700">
            ZW
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">Workspace</div>
            <div className="truncate text-xs text-neutral-500">Free plan</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
