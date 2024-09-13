import type { MovieData } from "@/types";
import Link from "next/link";
import S from "./movie-item.module.css";

export default function MovieItem({
  id,
  title,
  subTitle,
  description,
  releaseDate,
  company,
  genres,
  runtime,
  posterImgUrl,
}: MovieData) {
  return (
    <Link className={S.container} href={`/movie/${id}`}>
      <img src={posterImgUrl} />
    </Link>
  );
}
