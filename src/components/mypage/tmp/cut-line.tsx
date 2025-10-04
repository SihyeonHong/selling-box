import Dot from "@/components/mypage/ui/dots";
import LineRemoveButton from "@/components/mypage/ui/line-remove-btn";
import { CutLineType } from "@/types/market";
import { cn } from "@/utils/class-name"; 

interface CutLineProps {
  line: CutLineType;
  onMouseDown: (e: React.MouseEvent, lineId: string) => void;
  onRemove: (lineId: string) => void;
}

export default function CutLine({ line, onMouseDown, onRemove }: CutLineProps) {
  const positionStyle = {
    vertical: { left: `${line.position}%` },
    horizontal: { top: `${line.position}%` },
  };

  return (
    <div
      className={cn(
        "hover:bg-destructive absolute bg-red-500",
        containerClassName[line.type],
      )}
      style={positionStyle[line.type]}
      onMouseDown={(e) => onMouseDown(e, line.id)}
    >
      <Dot position={dotPosition[line.type].first} />
      <Dot position={dotPosition[line.type].second} />
      <LineRemoveButton lineId={line.id} onRemove={onRemove} />
    </div>
  );
}

const containerClassName = {
  vertical: "top-0 bottom-0 z-10 w-0.5 cursor-ew-resize",
  horizontal: "left-0 right-0 z-10 h-0.5 cursor-ns-resize",
};

const dotPosition = {
  vertical: {
    first: "absolute top-2 left-1/2 h-4 w-4 -translate-x-1/2 transform",
    second: "absolute bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 transform",
  },
  horizontal: {
    first: "absolute top-1/2 left-2 h-4 w-4 -translate-y-1/2 transform",
    second: "absolute top-1/2 right-2 h-4 w-4 -translate-y-1/2 transform",
  },
};
