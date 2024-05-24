import { FC, MouseEvent, useState } from "react";

import { useCreateCommentMutation } from "../../store/services/commentsApi";
import { useLazyGetAllPostsQuery } from "../../store/services/postsApi";

import "./CreateComment.scss";

import { IoPencilOutline } from "react-icons/io5";

export interface ICreateComment {
  postId: string;
}

const CreateComment: FC<ICreateComment> = ({ postId }) => {
  const [createComment] = useCreateCommentMutation();
  const [triggerAllPosts] = useLazyGetAllPostsQuery();

  const [content, setContent] = useState<string>("");

  const sendCommentHandler = async (
    event: MouseEvent<HTMLDivElement>
  ): Promise<void> => {
    try {
      // event.

      await createComment({ content, postId });

      //   await triggerAllPosts();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="create-comment">
      <form className="form">
        <textarea
          className="comment-field"
          placeholder="Напишите свой комментарий..."
          value={content}
          onChange={(event) => setContent(event.target.value)}
        ></textarea>

        <div className="send-comment" onClick={sendCommentHandler}>
          <p>Ответить</p>
          <IoPencilOutline />
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
