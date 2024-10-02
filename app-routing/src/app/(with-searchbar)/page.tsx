import MovieItem from "@/components/movie-item";
import S from "./page.module.css";
import movies from "@/dummy.json";
import type { MovieData } from "@/types";
import { Suspense } from "react";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import delay from "@/util/delay";

export const dynamic = "force-dynamic";

async function RecoMovies() {
  await delay(1000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    {
      next: {
        revalidate: 3,
      },
    }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const recoMovies: MovieData[] = await response.json();

  return recoMovies.map((movie) => (
    <MovieItem key={`reco-${movie.id}`} {...movie} />
  ));
}

async function AllMovies() {
  await delay(2000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    {
      cache: "force-cache", //모든 영화 데이터는 동일하기 때문에 한번만 요청하기 위해 force-cache를 적용했습니다.
    }
  );

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allMovies: MovieData[] = await response.json();

  return allMovies.map((movie) => (
    <MovieItem key={`all-${movie.id}`} {...movie} />
  ));
}

export default function Home() {
  return (
    <div className={S.conatiner}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={S.reco_conatiner}>
          <Suspense fallback={<MovieListSkeleton cnt={3} />}>
            <RecoMovies />
          </Suspense>
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={S.all_container}>
          <Suspense fallback={<MovieListSkeleton cnt={18} />}>
            <AllMovies />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
