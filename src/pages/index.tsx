import { ReactNode } from "react";
import SearchableLayout from "@/components/searchable-layout";
import MovieItem from "@/components/movie-item";
import S from "./index.module.css";
import fetchRandomMovies from "@/lib/fetch-random-movies";
import fetchMovies from "@/lib/fetch-movies";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";

export const getStaticProps = async () => {
  const [movies, recomMovies] = await Promise.all([
    fetchMovies(),
    fetchRandomMovies(),
  ]);

  return {
    props: {
      movies,
      recomMovies,
    },
    revalidate: 5,
  };
};

export default function Home({
  movies,
  recomMovies,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>한입 씨네마</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 씨네마" />
        <meta
          property="og:description"
          content="한입 씨네마에 등록된 영화를 만나보세요"
        />
      </Head>
      <div className={S.container}>
        <div>
          <h3>지금 가장 추천하는 영화</h3>
          <div className={S.recommend_movies_container}>
            {recomMovies.map((movie) => (
              <MovieItem key={`recommend-movie-${movie.id}`} {...movie} />
            ))}
          </div>
        </div>
        <div>
          <h3>등록된 모든 영화</h3>
          <div className={S.all_movies_container}>
            {movies.map((movie) => (
              <MovieItem key={`all-movie-${movie.id}`} {...movie} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
