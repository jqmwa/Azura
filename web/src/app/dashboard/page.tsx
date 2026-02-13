"use client";

import { Header } from "@/components/dashboard/header";
import { PortfolioCard } from "@/components/dashboard/portfolio-card";
import { TransactionFeed } from "@/components/dashboard/transaction-feed";
import { AutomationStatusCard } from "@/components/dashboard/workflow-status";
import { AssetTable } from "@/components/dashboard/asset-table";

export default function DashboardPage() {
  return (
    <>
      <Header title="Overview" />
      <div className="p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <PortfolioCard />
          <AutomationStatusCard />
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <TransactionFeed />
          <AssetTable />
        </div>
      </div>
    </>
  );
}
