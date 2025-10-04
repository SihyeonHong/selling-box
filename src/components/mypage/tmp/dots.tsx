// 부모에 relative 필요

import { cn } from "@/utils/class-name";

// 원래 bg-red-500 hover:bg-red-600 이었는데 bg-destructive하면 hover는 뭘로 하지
// destructive가 500보다 600에 가까워서 일단 hover에 넣음

interface DotProps {
  position: string;
  className?: string;
}

export default function Dot({ position, className }: DotProps) {
  return (
    <div
      className={cn(
        "hover:bg-destructive cursor-grab rounded-full border-2 border-white bg-red-500 shadow-md",
        position,
        className,
      )}
    />
  );
}
