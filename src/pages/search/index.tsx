import SearchableLayout from "@/components/searchable-layout";
import { ReactNode, useEffect, useState } from "react";
import MovieItem from "@/components/movie-item";
import S from "./search.module.css";
// import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchMovies from "@/lib/fetch-movies";
import type { MovieData } from "@/types";
import { useRouter } from "next/router";

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
    <div className={S.container}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
