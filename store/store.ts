import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { PersistConfig, Storage } from "redux-persist";
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import { api } from "@/apis/api";
import authReducer from "@/features/authSlice";

const createNodeStorage = (): Storage => ({
  getItem: async (_key: string) => null,
  setItem: async (_key: string, item: string) => item,
  removeItem: async (_key: string) => undefined,
});

const storage: Storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNodeStorage();

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredActionPaths: [
          "meta.baseQueryMeta.request",
          "meta.baseQueryMeta.response",
        ],
      },
    }).concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;

export const persister = persistStore(store);
