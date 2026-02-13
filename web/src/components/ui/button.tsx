import { forwardRef } from "react";
import { cn } from "@/lib/cn";
import type { ButtonVariant, ButtonSize } from "@/types";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-purple-500 text-white hover:bg-purple-400 active:bg-purple-600 active:scale-[0.98] shadow-sm hover:shadow-glow",
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
