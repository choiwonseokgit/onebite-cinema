import MovieItem from "@/components/movie-item";
import S from "./page.module.css";
import movies from "@/dummy.json";

export default function Home() {
  return (
    <div className={S.conatiner}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={S.reco_conatiner}>
          {movies.slice(0, 3).map((movie) => (
            <MovieItem key={`reco-${movie.id}`} {...movie} />
          ))}
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={S.all_container}>
          {movies.map((movie) => (
            <MovieItem key={`all-${movie.id}`} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}
