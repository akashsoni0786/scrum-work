import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
};

export const storeSlice = createSlice({
  name: "storeslice",
  initialState,
  reducers: {
    login: (state, actions) => {
      return {
        ...state,
        username: actions.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { login } = storeSlice.actions;
export default storeSlice.reducer; // storeReducer  in Store.js
