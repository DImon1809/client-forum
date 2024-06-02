import { serverApi } from "./serverApi";

export const followApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    followUser: builder.mutation<void, { followingId: string }>({
      query: (body) => ({
        url: "/follow",
        method: "POST",
        body,
      }),
    }),

    unFollowUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/follow/${userId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useFollowUserMutation, useUnFollowUserMutation } = followApi;

export const {
  endpoints: { followUser, unFollowUser },
} = followApi;
