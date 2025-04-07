import { configureStore } from "@reduxjs/toolkit";
import mainReducer from "./reducers/mainSlice";
import nodesReducer from "./reducers/nodesSlice";

export const store = configureStore({
  reducer: {
    main: mainReducer,
    nodes: nodesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
