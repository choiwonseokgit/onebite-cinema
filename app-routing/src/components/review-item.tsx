import type { ReviewData } from "@/types";
import style from "./review-item.module.css";
import ReviewItemDeleteBtn from "./review-item-delete-btn";

export default function ReviewItem({
  id,
  content,
  author,
  createdAt,
  movieId,
}: ReviewData) {
  return (
    <div className={style.container}>
      <div className={style.top_container}>
        <div className={style.author}>{author}</div>
        <div className={style.date}>{new Date(createdAt).toLocaleString()}</div>
      </div>
      <div className={style.content}>{content}</div>
      <div className={style.bottom_container}>
        <ReviewItemDeleteBtn reviewId={id} movieId={movieId} />
      </div>
    </div>
  );
}
