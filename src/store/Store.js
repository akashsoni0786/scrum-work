import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import storeReducer from "./slices/Slice";
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
})

export const store = configureStore({
  reducer: {storeWork: storeReducer},
  middleware:customizedMiddleware
});