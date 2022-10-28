import { configureStore } from '@reduxjs/toolkit'
import storeReducer from "./slices/Slice"
export const store = configureStore({
  reducer: {storeWork: storeReducer},
})