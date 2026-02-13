"use client";

import { SidebarContext, useSidebarState } from "@/hooks/use-sidebar";
import { Sidebar } from "@/components/dashboard/sidebar";
import { cn } from "@/lib/cn";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarState = useSidebarState();

  return (
    <SidebarContext.Provider value={sidebarState}>
      <div className="min-h-screen">
        <Sidebar />
        <main
          className={cn(
            "min-h-screen transition-all duration-250",
            sidebarState.collapsed ? "lg:ml-16" : "lg:ml-[260px]"
          )}
        >
          {children}
        </main>
      </div>
    </SidebarContext.Provider>
  );
}
