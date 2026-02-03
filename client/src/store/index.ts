import { combineReducers, configureStore } from "@reduxjs/toolkit"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import sessionStorage from "redux-persist/lib/storage/session" // 👈 use session storage

import { env } from "@/configs/env.config"
import { coreBaseApi } from "@/features/api/core.base.api"
import authReducer from "@/features/auth/auth.slice"

const rootReducer = combineReducers({
  auth: authReducer,
  [coreBaseApi.reducerPath]: coreBaseApi.reducer,
})

const persistConfig = {
  key: "root",
  storage: sessionStorage, // 👈 store auth in session storage
  whitelist: ["auth"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(coreBaseApi.middleware),
  devTools: env.IS_DEVELOPMENT_MODE,
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
