import { notFound } from "next/navigation";
import S from "./page.module.css";
import type { MovieData } from "@/types";

export const dynamicParams = false;

export async function generateStaticParams() {
  const response = await fetch(`http://localhost:12345/movie`);
  if (!response.ok) throw new Error("Fetch failed: ~/movie");

  const movies: MovieData[] = await response.json();
  return movies.map((movie) => ({ id: movie.id.toString() }));
}

export default async function Page({
  params,
}: {
  params: { id: string | string[] };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${params.id}`,
    {
      next: { tags: [`${params.id}`] }, //on-demand형식으로 되게끔 특정 영화 id를 tags 값으로 설정
    }
  );

  if (!response.ok) {
    if (response.status === 404) notFound();
    return <div>오류가 발생했습니다...</div>;
  }

  const movie = await response.json();

  const {
    id,
    title,
    subTitle,
    company,
    runtime,
    description,
    posterImgUrl,
    releaseDate,
    genres,
  } = movie;

  return (
    <div className={S.container}>
      <div
        className={S.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} />
      </div>
      <div className={S.info_container}>
        <div>
          <h2>{title}</h2>
          <div>
            {releaseDate} / {genres.join(", ")} / {runtime}분
          </div>
          <div>{company}</div>
        </div>
        <div>
          <div className={S.subTitle}>{subTitle}</div>
          <div className={S.description}>{description}</div>
        </div>
      </div>
    </div>
  );
}
