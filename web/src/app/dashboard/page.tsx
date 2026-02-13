"use client";

import { Header } from "@/components/dashboard/header";
import { AutomationStatusCard } from "@/components/dashboard/workflow-status";
import { AzuraAICard } from "@/components/dashboard/azura-ai-card";
import { PortfolioCard } from "@/components/dashboard/portfolio-card";
import { TransactionFeed } from "@/components/dashboard/transaction-feed";

export default function DashboardPage() {
  return (
    <>
      <Header title="Home" />
      <div className="p-6 flex flex-col gap-6">
        {/* Row 1: User-facing actions */}
        <div className="grid gap-6 lg:grid-cols-2">
          <AutomationStatusCard />
          <AzuraAICard />
        </div>

        {/* Row 2: Portfolio (tabbed TVL + Assets) */}
        <PortfolioCard />

        {/* Row 3: Full-width transaction sheet */}
        <TransactionFeed />
      </div>
    </>
  );
}
