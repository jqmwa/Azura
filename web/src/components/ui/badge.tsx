import { cn } from "@/lib/cn";
import type { BadgeVariant, ChainId } from "@/types";

interface BadgeProps {
  variant?: BadgeVariant;
  chain?: ChainId;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-white/[0.06] text-gray-300 border border-white/[0.06]",
  success: "bg-success/10 text-success border border-success/20",
  warning: "bg-warning/10 text-warning border border-warning/20",
  error: "bg-error/10 text-error border border-error/20",
  info: "bg-info/10 text-info border border-info/20",
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
