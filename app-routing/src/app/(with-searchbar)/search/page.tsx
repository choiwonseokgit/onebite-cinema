export default function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  return <div>검색 페이지 : {searchParams.q}</div>;
}
