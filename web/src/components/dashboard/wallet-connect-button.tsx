"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export function WalletConnectButton() {
  return (
    <Button variant="secondary" size="sm" className="gap-2">
      <Icon name="wallet" size={16} />
      <span className="hidden sm:inline">Connect Wallet</span>
    </Button>
  );
}
