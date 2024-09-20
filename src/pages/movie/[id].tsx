import {
  // GetServerSidePropsContext,
  // InferGetServerSidePropsType,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import S from "./[id].module.css";
import fetchUniqueMovie from "@/lib/fetch-unique-movie";
import { useRouter } from "next/router";

export const getStaticPaths = () => {
  return {
    paths: [{ params: { id: "838209" } }, { params: { id: "1022789" } }],
    fallback: true,
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;

  const uniqueMovie = await fetchUniqueMovie(Number(id));

  if (!uniqueMovie) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      uniqueMovie,
    },
  };
};

export default function Page({
  uniqueMovie,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();

  if (router.isFallback) return "로딩중입니다...";
  if (!uniqueMovie) return "...다시 시도해주세요";

  const {
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
