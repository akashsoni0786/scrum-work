import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: sessionStorage.getItem("username"),
  gridData: [],
  showHeader: true,
  filteredChoice: [],
  currentTab: sessionStorage.getItem("currentTab"),
  searchMode: sessionStorage.getItem("searchMode"),
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
      sessionStorage.setItem("gridData", JSON.stringify(actions.payload));
      return {
        ...state,
        gridData: actions.payload,
      };
    },
    choices: (state, actions) => {
      
      return {
        ...state,
        filteredChoice: [...actions.payload],
      };
    },

    removeChoices: (state,actions) => {
      return {
        ...state,
        filteredChoice :  state.filteredChoice.filter((previousTag) => previousTag !== actions.payload),
      };
    },
    hideHeaders: (state, actions) => {
      return {
        ...state,
        showHeader: actions.payload,
      };
    },
    changeTab: (state, actions) => {
      sessionStorage.setItem("currentTab",actions.payload);
      return {
        ...state,
        currentTab: actions.payload,
      };
    },
    setSearchMode:(state, actions) => {
      sessionStorage.setItem("searchMode",actions.payload);
      state.searchMode = actions.payload
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
      console.log(actions.payload)
      console.log(Object.keys(actions.payload))
      // let data = actions.payload.value
      state.moreFilter = {...state.moreFilter,...actions.payload}
      // state.filteredChoice = [...state.filteredChoice]
      
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
  storedFilter,
  setSearchMode
} = storeSlice.actions;
export default storeSlice.reducer; // storeReducer  in Store.js
