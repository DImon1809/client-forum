import { FC, useEffect, useState } from "react";

import { useGetAllPostsQuery } from "../../store/services/postsApi";

import CreatePost from "../../components/create-post/CreatePost";
import { CardPost } from "../../components/card-post/CardPost";

import "./Posts.scss";

const Posts: FC = () => {
  const { data, isLoading } = useGetAllPostsQuery();

  const [manyPosts, setManyPosts] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading && data && data?.length > 2) return setManyPosts(true);

    return setManyPosts(false);
  }, [isLoading, data]);

  return (
    <section className="section-posts">
      <CreatePost />
      <div className={manyPosts ? "posts-wrapper many" : "posts-wrapper"}>
        {data && data.length
          ? data.map(
              ({
                content,
                author,
                id,
                authorId,
                comments,
                likes,
                likedByUser,
                createdAt,
              }) => (
                <CardPost
                  key={id}
                  avatarUrl={author.avatarUrl ?? ""}
                  content={content}
                  name={author.name ?? ""}
                  likesCount={likes.length}
                  likes={likes}
                  commentsCount={comments.length}
                  authorId={authorId}
                  id={id}
                  likedByUser={likedByUser}
                  createAt={createdAt}
                  cardFor="post"
                />
              )
            )
          : ""}
      </div>
    </section>
  );
};

export default Posts;
