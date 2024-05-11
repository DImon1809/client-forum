import { serverApi } from "./serverApi";

import { ILike } from "../types";

export const likesApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    likePost: builder.mutation<ILike, { postId: string }>({
      query: (body) => ({
        url: "/likes",
        method: "POST",
        body,
      }),
    }),

    unLikePost: builder.mutation<void, string>({
      query: (postId) => ({
        url: `/likes/${postId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useLikePostMutation, useUnLikePostMutation } = likesApi;

export const {
  endpoints: { likePost, unLikePost },
} = likesApi;
