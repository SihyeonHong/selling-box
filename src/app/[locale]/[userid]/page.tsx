interface Props {
  params: {
    locale: string;
    userid: string;
  };
}

export default async function Page({ params }: Props) {
  // 지금은 아직 비동기 아닌데 Next.js가 비동기로 바꿀거라고 함
  const userid = await params.userid; // 서버 에러 무시 어차피 200

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <h1>Welcome to the User {userid} Page</h1>
      <p>
        모바일 먼저 개발하라니까 그럼 장터 소개 페이지를 어떻게 하지 갤러리 뷰를
        먼저 만들고 장터 소개랑 메뉴 위치를 고민할까
      </p>
    </div>
  );
}
