import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import MovieItem from "@/components/movie-item";

import S from "./search.module.css";
import movies from "@/mock/movies.json";

export default function Page() {
  return (
    <div className={S.container}>
      <MovieItem key={movies[0].id} {...movies[0]} />
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
