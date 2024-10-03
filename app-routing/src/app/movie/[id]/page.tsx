import { notFound } from "next/navigation";
import S from "./page.module.css";
import type { MovieData, ReviewData } from "@/types";
import ReviewEditor from "@/components/review-editor";
import ReviewItem from "@/components/review-item";

export const dynamicParams = false;

export async function generateStaticParams() {
  const response = await fetch(`http://localhost:12345/movie`);
  if (!response.ok) throw new Error("Fetch failed: ~/movie");

  const movies: MovieData[] = await response.json();
  return movies.map((movie) => ({ id: movie.id.toString() }));
}

async function MovieDetail({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${movieId}`,
    {
      next: { tags: [`${movieId}`] }, //on-demand형식으로 되게끔 특정 영화 id를 tags 값으로 설정
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
    <section>
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
    </section>
  );
}

async function ReviewList({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/movie/${movieId}`
  );

  if (!response.ok) {
    throw new Error(`Review fetch failed: ${response.status}`);
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className={S.container}>
      <MovieDetail movieId={params.id} />
      <ReviewEditor movieId={params.id} />
      <ReviewList movieId={params.id} />
    </div>
  );
}
