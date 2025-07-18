import { Loader2 } from "lucide-react";

export default function LoadingSpin() {
  return (
    <div className="relative">
      <Loader2 className="text-primary h-8 w-8 animate-spin" />
      <div className="absolute inset-0 h-8 w-8 animate-pulse rounded-full"></div>
    </div>
  );
}
