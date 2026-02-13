import { cn } from "@/lib/cn";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
};

export function Logo({ size = "md", className }: LogoProps) {
  return (
    <span
      className={cn(
        "font-bold tracking-tight text-purple-500",
        sizeStyles[size],
        className
      )}
    >
      Azura
    </span>
  );
}
