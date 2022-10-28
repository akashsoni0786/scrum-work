import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  amount: 1,
};

export const storeSlice = createSlice({
  name: "storeslice",
  initialState,
  reducers: {
    login: (state, actions) => {
      // const temp = state.game.map((i) =>
      //   actions.payload.id === i.id ? { ...i, rotate: true } : i
      // );
      return {
        ...state,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { login } = storeSlice.actions;
export default storeSlice.reducer; // storeReducer  in Store.js