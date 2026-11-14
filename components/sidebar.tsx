"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/theme-toggle";

const mainNav = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/inbox", label: "Inbox", count: 5 },
  { href: "/compose", label: "Compose" },
  { href: "/calendar", label: "Calendar" },
  { href: "/analytics", label: "Analytics" },
];

const manageNav = [
  { href: "/accounts", label: "Accounts" },
  { href: "/automations", label: "Automations" },
  { href: "/settings", label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const linkClass = (href: string) =>
    `flex items-center h-8 px-3 rounded-md text-sm transition-colors ${
      isActive(href)
        ? "bg-[#ededed] text-[#111827] font-medium"
        : "text-[#5f6672] hover:text-[#111827] hover:bg-[#f3f4f6]"
    }`;

  return (
    <aside className="w-[230px] shrink-0 border-r border-[#e5e7eb] bg-[#f9fafb] flex flex-col">
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#b8336a] text-xs font-semibold text-white">
            P
          </div>
          <span className="text-sm font-semibold tracking-tight text-[#111827]">Pulse</span>
        </div>
        <div className="mt-3 text-xs text-[#5f6672]">Acme Corp workspace</div>
      </div>

      <nav className="flex-1 px-3 space-y-6 overflow-y-auto">
        <div>
          <div className="px-3 mb-2 text-xs text-[#9ca3af]">Marketing</div>
          <div className="space-y-0.5">
            {mainNav.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                <span className="flex-1">{item.label}</span>
                {item.count ? (
                  <span className="text-xs tabular-nums text-[#5f6672]">{item.count}</span>
                ) : null}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="px-3 mb-2 text-xs text-[#9ca3af]">Manage</div>
          <div className="space-y-0.5">
            {manageNav.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass(item.href)}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className="px-4 py-4 border-t border-[#e5e7eb] flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f8dbe8] text-xs font-medium text-[#6b1d3e]">
            ZW
          </div>
          <div className="min-w-0">
            <div className="truncate text-xs font-medium text-[#111827]">Workspace</div>
            <div className="truncate text-[10px] text-[#5f6672]">Free plan</div>
          </div>
        </div>
        <ThemeToggle />
      </div>
    </aside>
  );
}
