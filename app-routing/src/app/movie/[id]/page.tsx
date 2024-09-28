import S from "./page.module.css";
import movies from "@/dummy.json";

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
