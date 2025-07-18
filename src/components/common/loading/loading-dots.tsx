export default function LoadingDots() {
  return (
    <div className="flex items-center justify-center gap-1">
      <div className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]"></div>
      <div className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]"></div>
      <div className="bg-primary h-2 w-2 animate-bounce rounded-full"></div>
    </div>
  );
}
