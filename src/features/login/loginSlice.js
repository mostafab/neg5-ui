import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { attemptLogin } from 'api/login';

const initialState = {
  loggingIn: false,
  requestingAccount: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state, action) => {
        state.loggingIn = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loggingIn = false;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loggingIn = false;
      })
  },
});

export const loginAsync = createAsyncThunk(
  "loginSlice/login",
  async ({ emailOrUsername, password }) => {
    const token = await attemptLogin({
      username: emailOrUsername,
      password,
    });
    // Add a cookie so we can use it to authenticate future page visits
    document.cookie = `NEG_5_TOKEN=${token};Secure`;
  }
);

export const selectRepoSearch = (state) => state.repoSearch;

export const loginReducer = loginSlice.reducer;
