import { serverApi } from "./serverApi";
import { IComment } from "../types";

export const commentsApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation<IComment, Partial<IComment>>({
      query: (newComment) => ({
        url: "/comments",
        method: "POST",
        body: newComment,
      }),
    }),

    deleteComment: builder.mutation<void, string>({
      query: (commentId) => ({
        url: `/comments/${commentId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateCommentMutation, useDeleteCommentMutation } =
  commentsApi;

export const {
  endpoints: { createComment, deleteComment },
} = commentsApi;
