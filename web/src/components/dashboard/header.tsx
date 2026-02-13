"use client";

import { Icon } from "@/components/ui/icon";
import { useSidebar } from "@/hooks/use-sidebar";
import { NetworkSelector } from "./network-selector";
import { WalletConnectButton } from "./wallet-connect-button";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { setMobileOpen } = useSidebar();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/[0.06] bg-gray-950/80 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-sm p-1.5 text-gray-400 hover:bg-gray-800 hover:text-gray-50 lg:hidden"
          aria-label="Open sidebar"
        >
          <Icon name="menu" size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-50">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <NetworkSelector />
        <WalletConnectButton />
      </div>
    </header>
  );
}
