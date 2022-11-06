import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  gridData: [],
  showHeader: true,
  filteredChoice: [],
  currentTab: "All",
  searchContent: "",
  searchContainerId: "",
  bannerProductCount: 0,
  inventoryFilter : {
    value : '',
    option: ''
  },
  moreFilter:{}

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
    removeChoices: (state,actions) => {
      return {
        ...state,
        filteredChoice :  state.filteredChoice.filter((previousTag) => previousTag !== actions.payload)
      };
    },
    hideHeaders: (state, actions) => {
      return {
        ...state,
        showHeader: actions.payload,
      };
    },
    changeTab: (state, actions) => {
      return {
        ...state,
        currentTab: actions.payload,
      };
    },
    searchedList: (state, actions) => {
      state.searchContent= actions.payload.query;
      state.searchContainerId= actions.payload.containerId;
    },
    bannerCount: (state, actions) => {
      return {
        ...state,
        bannerProductCount: actions.payload,
      };
    },
    storedFilter: (state,actions) =>{
      state.moreFilter = {...state.moreFilter,...actions.payload}
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  login,
  alldata,
  choices,
  removeChoices,
  hideHeaders,
  changeTab,
  searchedList,
  bannerCount,
  storedFilter
} = storeSlice.actions;
export default storeSlice.reducer; // storeReducer  in Store.js
