"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/shared/logo";
import { Icon } from "@/components/ui/icon";
import { useSidebar } from "@/hooks/use-sidebar";
import { DASHBOARD_NAV } from "@/lib/constants";
import { cn } from "@/lib/cn";
import type { IconName } from "@/types";

export function Sidebar() {
  const { collapsed, mobileOpen, toggle, setMobileOpen } = useSidebar();
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 z-50 flex h-screen flex-col border-r border-white/[0.06] bg-gray-950 transition-all duration-250",
          collapsed ? "w-16" : "w-[260px]",
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-white/[0.06] px-4">
          {!collapsed && <Logo size="md" />}
          <button
            onClick={toggle}
            className="hidden rounded-sm p-1.5 text-gray-400 hover:bg-gray-800 hover:text-gray-50 lg:inline-flex"
            aria-label="Toggle sidebar"
          >
            <Icon
              name={collapsed ? "chevron-right" : "chevron-left"}
              size={16}
            />
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-sm p-1.5 text-gray-400 hover:bg-gray-800 hover:text-gray-50 lg:hidden"
            aria-label="Close sidebar"
          >
            <Icon name="x" size={16} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto p-3">
          <ul className="flex flex-col gap-1">
            {DASHBOARD_NAV.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-purple-500/10 text-purple-400 border border-purple-500/10"
                        : "text-gray-400 hover:bg-white/[0.04] hover:text-gray-50"
                    )}
                  >
                    <Icon name={item.icon as IconName} size={18} />
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/[0.06] p-3">
          <div
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2",
              collapsed && "justify-center"
            )}
          >
            <div className="h-8 w-8 rounded-full bg-purple-500/20 flex items-center justify-center text-xs font-bold text-purple-400">
              A
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-50">
                  Treasury
                </span>
                <span className="text-xs text-gray-400">0x1a2b…3c4d</span>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
