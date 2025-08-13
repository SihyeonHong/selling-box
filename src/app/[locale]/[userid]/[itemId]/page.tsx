import LoadingPage from "@/components/common/loading/loading-page";

interface Props {
  params: Promise<{
    locale: string;
    userId: string;
    itemId: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { userId, itemId } = await params;

  if (!userId || typeof userId !== "string" || userId.trim() === "") {
    return <LoadingPage />;
  }

  if (!itemId || typeof itemId !== "string" || itemId.trim() === "") {
    return <LoadingPage />;
  }

  return (
    <div>
      <h1>아이템 상세페이지</h1>
      <p>User ID: {userId}</p>
      <p>Item ID: {itemId}</p>
    </div>
  );
}
