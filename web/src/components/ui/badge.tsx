import { cn } from "@/lib/cn";
import type { BadgeVariant, ChainId } from "@/types";

interface BadgeProps {
  variant?: BadgeVariant;
  chain?: ChainId;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-gray-800 text-gray-200",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  error: "bg-error/15 text-error",
  info: "bg-info/15 text-info",
};

const chainStyles: Record<ChainId, string> = {
  ethereum: "bg-chain-ethereum/15 text-chain-ethereum",
  polygon: "bg-chain-polygon/15 text-chain-polygon",
  arbitrum: "bg-chain-arbitrum/15 text-gray-200",
  optimism: "bg-chain-optimism/15 text-chain-optimism",
  avalanche: "bg-chain-avalanche/15 text-chain-avalanche",
  base: "bg-chain-base/15 text-chain-base",
};

export function Badge({
  variant = "default",
  chain,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        chain ? chainStyles[chain] : variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
