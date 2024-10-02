import MovieItem from "@/components/movie-item";
import S from "./page.module.css";
import { MovieData } from "@/types";
import delay from "@/util/delay";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${searchParams.q}`,
    {
      next: { tags: [`${searchParams.q}`] }, //on-demand 형식으로 되게끔 쿼리 스트링을 tags로 구현
    }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }
  const movies: MovieData[] = await response.json();

  return (
    <div className={S.container}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
