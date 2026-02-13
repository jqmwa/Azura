"use client";

import { Header } from "@/components/dashboard/header";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

export default function ContractsPage() {
  return (
    <>
      <Header title="Contracts" />
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 py-32">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-800">
          <Icon name="file-code" size={28} className="text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-50">Smart Contracts</h2>
        <p className="max-w-sm text-center text-sm text-gray-400">
          Deploy and manage your treasury contracts. View ABI details,
          verification status, and on-chain state.
        </p>
        <div className="mt-2 flex items-center gap-2 rounded-sm border border-gray-700 bg-gray-900 px-4 py-2 font-mono text-sm text-gray-400">
          <span className="text-purple-400">$</span>
          <span>npx azura contracts deploy</span>
        </div>
        <Button className="mt-4">Deploy Contract</Button>
      </div>
    </>
  );
}
