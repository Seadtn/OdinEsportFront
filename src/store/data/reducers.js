import { createSlice } from "@reduxjs/toolkit";
import { initialData } from "./initialData";



const data = createSlice({
  name: "data",
  initialState: initialData,
  reducers: {
    setData: (state, action) => {
      state = action.payload;
    },
    setLoggedIn: (state) => {
      state.user.isLoggedIn = true;
    },
    setLoggedOut: (state) => {
      state.user.isLoggedIn = false;
    },
    setUserHasLoggedIn: (state, action) => {
      state.user.data = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.user.isLoggedIn = true;
    },
    setUserHasLoggedOut: (state) => {
      state.user.data = undefined;
      localStorage.removeItem('user');
      state.user.isLoggedIn = false;
    },
    setAgentList: (state, action) => {
      state.agents = action.payload;
      localStorage.setItem('agents', JSON.stringify(action.payload));
    },
    setFootballersList: (state, action) => {
      state.footballers = action.payload;
      localStorage.setItem('footballers', JSON.stringify(action.payload));
    },
  },
});

export default data.reducer;
export const { setData , setLoggedInStatus , setLoggedIn , setLoggedOut , setUserHasLoggedIn , setUserHasLoggedOut ,setAgentList,setFootballersList} = data.actions;
