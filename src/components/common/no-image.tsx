import { Image } from "lucide-react";

import { cn } from "@/utils/class-name";

interface NoImageProps {
  size?: "sm" | "md" | "lg" | "full" | "custom";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  className?: string;
  iconClassName?: string;
  ariaLabel?: string;
}

export default function NoImage({
  size = "full",
  rounded = "full",
  className,
  iconClassName,
  ariaLabel = "default profile image",
}: NoImageProps) {
  const containerSize = size === "custom" ? "" : containerSizeClasses[size];

  return (
    <div
      className={cn(
        "bg-muted flex aspect-square items-center justify-center",
        containerSize,
        roundedClasses[rounded],
        className,
      )}
    >
      <Image
        className={cn("text-muted-foreground h-1/2 w-1/2", iconClassName)}
        aria-label={ariaLabel}
      />
    </div>
  );
}

const containerSizeClasses = {
  sm: "h-12 w-12",
  md: "h-20 w-20",
  lg: "h-28 w-28",
  full: "h-full w-full max-w-full",
  custom: "",
};

const roundedClasses = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};
