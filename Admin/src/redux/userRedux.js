import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    allUsers: []
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.allUsers =[];
    },
    registerStart: (state) => {
      state.isFetching = true
    },
    registerSuccess: (state,action) => {
        state.isFetching = false
        state.error = false
        state.allUsers.push(action.payload)
    },
    registerFailure: (state) => {
        state.isFetching = false
        state.error = true
    },   
      //GET ALL
      getAllUsersStart: (state) => {
        state.isFetching = true;
        state.error = false;
      },
      getAllUsersSuccess: (state, action) => {
        state.isFetching = false;
        state.allUsers = action.payload;
      },
      getAllUsersFailure: (state) => {
        state.isFetching = false;
        state.error = true;
      },  
      
  },
});

export const { loginStart, loginSuccess, loginFailure,logout,getAllUsersStart,getAllUsersSuccess,getAllUsersFailure,registerStart,registerSuccess,registerFailure } = userSlice.actions;
export default userSlice.reducer;