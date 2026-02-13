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
      <div className="relative min-h-screen bg-gray-950">
        {/* Subtle ambient glow */}
        <div className="pointer-events-none fixed top-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-500/[0.03] blur-[150px]" />
        <div className="pointer-events-none fixed bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-blue-500/[0.02] blur-[120px]" />

        <Sidebar />
        <main
          className={cn(
            "relative min-h-screen transition-all duration-250",
            sidebarState.collapsed ? "lg:ml-16" : "lg:ml-[260px]"
          )}
        >
          {children}
        </main>
      </div>
    </SidebarContext.Provider>
  );
}
