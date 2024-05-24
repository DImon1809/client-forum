import React, { FC, useState, MouseEvent } from "react";

import {
  useCreatePostMutation,
  useLazyGetAllPostsQuery,
} from "../../store/services/postsApi";

import { IoPencilOutline } from "react-icons/io5";

import "./CreatePost.scss";

const CreatePost: FC = () => {
  const [createPost] = useCreatePostMutation();
  const [triggerAllPosts] = useLazyGetAllPostsQuery();

  const [content, setContent] = useState<string>("");

  const handlerCreatePost = async (
    event: MouseEvent<HTMLDivElement>
  ): Promise<void> => {
    try {
      event.preventDefault();

      await createPost({ content }).unwrap();

      await triggerAllPosts().unwrap();

      setContent("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="post-form">
      <div className="wrapper-field">
        <textarea
          className="post-field"
          placeholder="О чем вы думаете?"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        ></textarea>
      </div>
      <div className="wrapper-button">
        <div className="send-button" onClick={handlerCreatePost}>
          <p>Добавить пост</p>
          <IoPencilOutline />
        </div>
      </div>
    </form>
  );
};

export default CreatePost;
