import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import MovieItem from "@/components/movie-item";
import S from "./search.module.css";
// import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchMovies from "@/lib/fetch-movies";
import type { MovieData } from "@/types";
import { useRouter } from "next/router";
import Head from "next/head";

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const q = context.query.q;

//   const movies = await fetchMovies(q as string);

//   return {
//     props: {
//       movies,
//     },
//   };
// };

export default function Page() {
  //기본적으로 SSG
  const router = useRouter();
  const q = router.query.q;
  const [movies, setMovies] = useState<MovieData[]>([]);

  const getMovies = async () => {
    const newMovies = await fetchMovies(q as string);
    setMovies(newMovies);
  };

  useEffect(() => {
    getMovies();
  }, [q]);

  return (
    <>
      <Head>
        <title>한입 씨네마 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입 씨네마 - 검색결과" />
        <meta
          property="og:description"
          content="한입 씨네마에 등록된 영화를 만나보세요"
        />
      </Head>
      <div className={S.container}>
        {movies.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
