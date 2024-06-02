import { FC, useState, MouseEvent } from "react";

import { useNavigate, Link } from "react-router-dom";

import { BASE_URL } from "../../constans";

import {
  useLikePostMutation,
  useUnLikePostMutation,
} from "../../store/services/likesApi";

import {
  useLazyGetAllPostsQuery,
  useLazyGetPostByIdQuery,
  useDeletePostMutation,
} from "../../store/services/postsApi";

import { useDeleteCommentMutation } from "../../store/services/commentsApi";

import { useSelector } from "react-redux";
import { RootType } from "../../store/store";

import { MdOutlineDeleteForever } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";

import { ILike } from "../../store/types";

import "./CardPost.scss";

export interface ICardPost {
  avatarUrl: string;
  name: string;
  authorId: string;
  content: string;
  commentId?: string;
  likesCount?: number;
  likes?: ILike[];
  commentsCount?: number;
  createAt?: Date;
  id?: string;
  cardFor: "comment" | "post" | "current-post";
  likedByUser?: boolean;
}

const CardPost: FC<ICardPost> = ({
  avatarUrl = "",
  name = "",
  authorId = "",
  content = "",
  commentId = "",
  likesCount = 0,
  likes = [],
  commentsCount = 0,
  createAt = "",
  id = "",
  cardFor = "post",
  likedByUser = false,
}) => {
  const [likePost] = useLikePostMutation();
  const [unlickPost] = useUnLikePostMutation();
  const [triggerGetAllPosts, { isLoading, data }] = useLazyGetAllPostsQuery();
  const [triggerGetPostById] = useLazyGetPostByIdQuery();
  const [deletePost, deletePostStatus] = useDeletePostMutation();
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation();

  const [active, setActive] = useState<boolean>(false);

  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const current = useSelector((state: RootType) => state.userSlice.current);

  const deletePostHandler = async (
    event: MouseEvent<HTMLDivElement>,
    id: string
  ): Promise<void> => {
    event.preventDefault();

    // console.log(cardFor);

    if (cardFor === "post" || cardFor === "current-post") await deletePost(id);

    if (cardFor === "comment") {
      console.log("Working...");
      await deleteComment(commentId);
    }

    await triggerGetAllPosts();
  };

  const likePostHandler = async (
    event: MouseEvent<SVGAElement>
  ): Promise<void> => {
    try {
      event.preventDefault();

      // console.log(likes.find((_l) => _l.userId === current?.id));

      if (!likedByUser) await likePost({ postId: id });

      if (likedByUser)
        await unlickPost(
          likes.find((_l) => _l.userId === current?.id)?.id || ""
        );

      await triggerGetAllPosts();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className={active ? "card-post active" : "card-post"}>
      <div className="post-header">
        <div className="user-wrapper">
          <div className="avatar-post">
            <img src={`${BASE_URL}${avatarUrl}`} alt="#" />
          </div>
          <div className="user-info">
            <Link className="user-name" to={`/users/${authorId}`}>
              <h4>{`${name}`}</h4>
            </Link>
            <p>{`${
              createAt ? new Date(createAt!).toLocaleDateString() : ""
            }`}</p>
          </div>
        </div>

        {authorId === current?.id && (
          <div
            className="delete-post"
            onClick={(event) => deletePostHandler(event, id)}
          >
            {deletePostStatus.status === "pending" ? (
              <h4>Loading</h4>
            ) : (
              <MdOutlineDeleteForever size="21px" />
            )}
          </div>
        )}
      </div>

      <div className="post-body">
        <p>{content}</p>
      </div>

      {cardFor === "post" ? (
        <div className="post-footer">
          <div className="heart-comment-wrapper">
            <div className="heart-wrapper">
              {likesCount > 0 && likesCount}
              <FaRegHeart
                className={likedByUser ? "heart like" : "heart"}
                // onMouseEnter={() => setActive(true)}
                // onMouseLeave={() => setActive(false)}
                onClick={likePostHandler}
              />
            </div>

            <div className="comment-wrapper">
              {commentsCount > 0 && commentsCount}
              <Link
                to={`/posts/${id}`}
                className={
                  localStorage.getItem("theme") === "black"
                    ? "comment-link light"
                    : "comment-link"
                }
              >
                <FaRegComment
                  className="comment"
                  // onMouseEnter={() => setActive(true)}
                  // onMouseLeave={() => setActive(false)}
                />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CardPost;
