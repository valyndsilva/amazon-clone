import { combineReducers, configureStore } from "@reduxjs/toolkit";
import basketReducer from "./slices/basketSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

// export const store = configureStore({
//   reducer: {
//     basket: basketReducer,
//   },
// });

const reducers = combineReducers({
  basket: basketReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
