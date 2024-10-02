import MovieItemSkeleton from "./movie-item-skeleton";

export default function MovieListSkeleton({ cnt }: { cnt: number }) {
  return new Array(cnt)
    .fill(0)
    .map((_, i) => <MovieItemSkeleton key={`movie-item-${i}`} />);
}
