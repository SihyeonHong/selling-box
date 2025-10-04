import ImageContainer from "@/components/mypage/image-container";
import ProductRegistration from "@/components/mypage/product-registration";

interface Props {
  params: Promise<{
    locale: string;
    userId: string;
  }>;
}

export default async function MyPage({ params }: Props) {
  const { userId } = await params;

  return (
    <div className="space-y-8">
      <div>
        <h1>My Page</h1>
        <p>User ID: {userId}</p>
      </div>

      <ProductRegistration />

      <ImageContainer />
    </div>
  );
}
