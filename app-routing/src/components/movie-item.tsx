import { MovieData } from "@/types";
import Link from "next/link";
import S from "./movie-item.module.css";

export default function MovieItem(props: MovieData) {
  return (
    <Link className={S.container} href={`/movie/${props.id}`}>
      <img src={props.posterImgUrl} />
    </Link>
  );
}
