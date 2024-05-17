import { configureStore } from "@reduxjs/toolkit";

import { serverApi } from "./services/serverApi";
import { userSliceReducer } from "./features/userSlice";
import { listenerMiddleware } from "./middleware/authMiddleware";

export const store = configureStore({
  reducer: {
    [serverApi.reducerPath]: serverApi.reducer,
    userSlice: userSliceReducer,
  },

  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(
      serverApi.middleware,
      listenerMiddleware.middleware
    ),
});

export type RootType = ReturnType<typeof store.getState>;
