import ImageEditorContainer from "@/components/mypage/image-editor";

interface Props {
  params: Promise<{
    locale: string;
    userId: string;
  }>;
}

export default async function MyPage({ params }: Props) {
  const { userId } = await params;

  return (
    <div>
      <h1>My Page</h1>
      <p>User ID: {userId}</p>
      <ImageEditorContainer />
    </div>
  );
}
