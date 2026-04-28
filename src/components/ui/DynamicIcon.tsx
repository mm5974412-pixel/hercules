"use client";

import * as icons from "lucide-react";
import type { LucideProps } from "lucide-react";

interface DynamicIconProps extends LucideProps {
  name: string;
}

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (icons as any)[name] as React.ComponentType<LucideProps> | undefined;
  if (!IconComponent) return null;
  return <IconComponent {...props} />;
}
