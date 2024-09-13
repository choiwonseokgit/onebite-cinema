import { ReactNode } from "react";
import SearchableLayout from "./components/searchable-layout";
import movies from "@/mock/movies.json";
import MovieItem from "./components/movie-item";
import S from "./index.module.css";

const recommendMovies = movies.slice(0, 3);
const allRegisterdMovies = movies.slice(0, 5);

export default function Home() {
  return (
    <div className={S.container}>
      <div>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={S.recommend_movies_container}>
          {recommendMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </div>
      <div>
        <h3>등록된 모든 영화</h3>
        <div className={S.all_movies_container}>
          {allRegisterdMovies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
