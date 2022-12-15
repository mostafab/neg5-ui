import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggingIn: false,
  registering: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
});

export const selectRepoSearch = (state) => state.repoSearch;

export const loginReducer = loginSlice.reducer;
