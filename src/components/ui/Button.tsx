"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", children, ...props }, ref) => {
    const base =
      "relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-primary/50 focus:ring-offset-2 focus:ring-offset-bg-primary";

    const variants = {
      primary:
        "bg-teal-primary text-bg-primary hover:bg-teal-light hover:shadow-[0_0_30px_rgba(20,184,166,0.3)] active:bg-teal-dark",
      secondary:
        "border border-teal-primary text-teal-primary hover:bg-teal-primary/10 hover:shadow-[0_0_20px_rgba(20,184,166,0.15)] active:bg-teal-primary/20",
      ghost:
        "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm gap-1.5",
      md: "px-6 py-3 text-base gap-2",
      lg: "px-8 py-4 text-lg gap-2.5",
    };

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
