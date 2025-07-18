import LoadingDots from "./loading-dots";
import LoadingSpin from "./loading-spin";

export default function LoadingPage() {
  return (
    <div className="flex h-full min-h-[200px] w-full flex-col items-center justify-center gap-4 p-8">
      <LoadingSpin />

      <div className="space-y-2 text-center">
        <p className="text-muted-foreground text-sm">잠시만 기다려 주세요</p>
        <LoadingDots />
      </div>
    </div>
  );
}
