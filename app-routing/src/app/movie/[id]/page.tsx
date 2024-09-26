import S from "./page.module.css";
import movies from "@/dummy.json";

export default function Page() {
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
  } = movies[3];

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
