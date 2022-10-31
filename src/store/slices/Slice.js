import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  gridData :[],
  showHeader:true,
  filteredChoice:[]
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
    alldata: (state, actions) => {
      return {
        ...state,
        gridData: actions.payload,
      };
    },
    choices: (state, actions) => {
      // console.log(state.filteredChoice)
      return {
        ...state,
        filteredChoice: [...actions.payload],
      };
    },
    removeChoices: (state, actions) => {
      return {
        ...state,
        filteredChoice: [...actions.payload,state.filteredChoice],
      };
    },
    hideHeaders:(state, actions) => {
      return {
        ...state,
        showHeader:actions.payload,
      };
    }
  },
});

// Action creators are generated for each case reducer function
export const { login, alldata, choices, removeChoices, hideHeaders } = storeSlice.actions;
export default storeSlice.reducer; // storeReducer  in Store.js
