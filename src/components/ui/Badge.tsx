interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "highlight";
  className?: string;
}

export default function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variants = {
    default:
      "bg-teal-primary/10 text-teal-primary border border-teal-primary/20",
    success:
      "bg-success/10 text-success border border-success/20",
    highlight:
      "bg-teal-light/15 text-teal-light border border-teal-light/25",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
