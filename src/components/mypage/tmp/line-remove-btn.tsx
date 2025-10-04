interface LineRemoveButtonProps {
  lineId: string;
  onRemove: (lineId: string) => void;
}

export default function LineRemoveButton({
  lineId,
  onRemove,
}: LineRemoveButtonProps) {
  return (
    <button
      onClick={() => onRemove(lineId)}
      className="absolute top-1/2 left-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-red-500 text-sm text-white hover:bg-red-600"
    >
      ×
    </button>
  );
}
