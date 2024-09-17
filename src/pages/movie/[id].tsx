import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import S from "./[id].module.css";
import fetchUniqueMovie from "@/lib/fetch-unique-movie";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params!.id;

  const uniqueMovie = await fetchUniqueMovie(Number(id));

  return {
    props: {
      uniqueMovie,
    },
  };
};

export default function Page({
  uniqueMovie,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!uniqueMovie) return "...다시 시도해주세요";

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
  } = uniqueMovie;

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
