export type TransactionStatus = "confirmed" | "pending" | "failed";

export type WorkflowStatus = "active" | "paused" | "error";

export type ChainId =
  | "ethereum"
  | "polygon"
  | "arbitrum"
  | "optimism"
  | "avalanche"
  | "base";

export type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonSize = "sm" | "md" | "lg";

export type IconName =
  | "workflow"
  | "crosschain"
  | "code"
  | "shield"
  | "monitor"
  | "globe"
  | "home"
  | "settings"
  | "chevron-left"
  | "chevron-right"
  | "wallet"
  | "menu"
  | "x"
  | "check"
  | "minus"
  | "external-link";
