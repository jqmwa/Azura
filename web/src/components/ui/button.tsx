import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import type { ButtonVariant, ButtonSize } from "@/types";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "btn-cta bg-purple-500/80 backdrop-blur-sm text-white border border-purple-300/25 ring-1 ring-inset ring-white/[0.08] shadow-[0_0_20px_rgba(99,102,241,0.25),0_4px_12px_rgba(0,0,0,0.4)] hover:bg-purple-400/80 hover:border-purple-200/35 hover:ring-white/[0.12] hover:shadow-[0_0_32px_rgba(99,102,241,0.4),0_4px_16px_rgba(0,0,0,0.3),0_0_0_1px_rgba(34,211,238,0.15)] active:bg-purple-600/80 active:scale-[0.98]",
  secondary:
    "bg-gray-800 text-gray-50 border border-gray-700 hover:bg-gray-700 active:bg-gray-800 active:scale-[0.98]",
  ghost:
    "text-gray-400 hover:text-gray-50 hover:bg-gray-800 active:bg-gray-700",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm rounded-sm",
  md: "h-10 px-4 text-sm rounded-sm",
  lg: "h-12 px-6 text-base rounded-md",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", size = "md", className, disabled, children, ...props },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-150",
          variantStyles[variant],
          sizeStyles[size],
          disabled && "pointer-events-none opacity-40",
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
