import { fetchBaseQuery, createApi, retry } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constans";
import { RootType } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api`,
  prepareHeaders: (headers, { getState }) => {
    // const token =
    //   (getState() as RootType).auth.token || localStorage.getItem("token");

    // console.log(token);

    // if (token) {
    //   headers.set("authorization", `Bearer ${token}`);
    // }

    const token = getState() as RootType;

    console.log(token);
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const serverApi = createApi({
  reducerPath: "serverApi",
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
