import { configureStore } from "@reduxjs/toolkit";

import { serverApi } from "./services/serverApi";

export const store = configureStore({
  reducer: {
    [serverApi.reducerPath]: serverApi.reducer,
  },

  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(serverApi.middleware),
});

export type RootType = ReturnType<typeof store.getState>;
