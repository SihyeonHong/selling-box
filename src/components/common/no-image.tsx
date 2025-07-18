import { cn } from "@/utils/class-name";
import { Image } from "lucide-react";

interface NoImageProps {
  size?: "sm" | "md" | "lg" | "xl" | "custom";
  rounded?: "none" | "sm" | "md" | "lg" | "full";
  className?: string;
  iconClassName?: string;
  ariaLabel?: string;
}

export default function NoImage({
  size = "md",
  rounded = "full",
  className,
  iconClassName,
  ariaLabel = "default profile image",
}: NoImageProps) {
  const containerSize = size === "custom" ? "" : containerSizeClasses[size];
  const iconSize = size === "custom" ? "" : iconSizeClasses[size];

  return (
    <div
      className={cn(
        "bg-muted flex items-center justify-center",
        containerSize,
        roundedClasses[rounded],
        className,
      )}
    >
      <Image
        className={cn("text-muted-foreground", iconSize, iconClassName)}
        aria-label={ariaLabel}
      />
    </div>
  );
}

const containerSizeClasses = {
  sm: "h-12 w-12",
  md: "h-20 w-20",
  lg: "h-28 w-28",
  xl: "h-36 w-36",
  custom: "",
};

const iconSizeClasses = {
  sm: "h-6 w-6",
  md: "h-10 w-10",
  lg: "h-14 w-14",
  xl: "h-20 w-20",
  custom: "",
};

const roundedClasses = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};
