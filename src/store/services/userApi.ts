import { serverApi } from "./serverApi";

import { IUser } from "../types";

export const userApi = serverApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<string, { email: string; password: string }>({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),

    register: builder.mutation<
      { email: string; password: string; name: string },
      { email: string; password: string; name: string }
    >({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),

    current: builder.query<IUser, void>({
      query: () => ({
        url: "/current",
        method: "GET",
      }),
    }),

    getUserByID: builder.query<IUser, string>({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),

    updateUser: builder.mutation<IUser, { userData: FormData; id: string }>({
      query: ({ userData, id }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: userData,
      }),
    }),
  }),
});

export const {
  useCurrentQuery,
  useLazyCurrentQuery,
  useLoginMutation,
  useGetUserByIDQuery,
  useLazyGetUserByIDQuery,
  useUpdateUserMutation,
  useRegisterMutation,
} = userApi;

export const {
  endpoints: { login, register, current, getUserByID, updateUser },
} = userApi;
