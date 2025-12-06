// state/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer,
  FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import moodReducer from "./moodSlice";
import favoritesReducer from "./favoritesSlice";

const rootReducer = combineReducers({
  mood: moodReducer,
  favorites: favoritesReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["mood", "favorites"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 👇 ignore redux-persist’s non-serializable actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
