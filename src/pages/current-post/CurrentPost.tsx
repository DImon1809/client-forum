import { FC } from "react";

import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../../store/services/postsApi";

import { CardPost } from "../../components/card-post/CardPost";
import GoBack from "../../components/go-back/GoBack";
import CreateComment from "../../components/create-comment/CreateComment";

import "./CurrentPost.scss";

const CurrentPost: FC = () => {
  const params = useParams<{ id: string }>();
  const { data } = useGetPostByIdQuery(params.id ?? "");

  if (!data) return <h2>Поста не существует</h2>;

  const { content, id, authorId, comments, likes, author, createdAt } = data;

  return (
    <div className="current-post">
      <GoBack />
      <CardPost
        cardFor="current-post"
        avatarUrl={author.avatarUrl ?? ""}
        content={content}
        name={author.name ?? ""}
        likesCount={likes.length}
        likes={likes}
        commentsCount={comments.length}
        authorId={authorId}
        id={id}
        createAt={createdAt}
        likedByUser={likes.find((_l) => _l.userId === authorId) ? true : false}
      />

      <CreateComment postId={id} />

      <div className="comments">
        {data.comments
          ? data.comments.map((comment) => (
              <CardPost
                cardFor="comment"
                key={comment.id}
                avatarUrl={comment.user.avatarUrl ?? ""}
                content={comment.content}
                name={comment.user.name ?? ""}
                authorId={comment.userId}
                commentId={comment.id}
                id={id}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default CurrentPost;
