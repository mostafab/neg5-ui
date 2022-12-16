import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { attemptLogin, attemptRegister } from "api/login";
import { setLoginCookie } from "libs/cookies";

const initialState = {
  loggingIn: false,
  requestingAccount: false,
  loginError: null,
  registerError: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state, _action) => {
        state.loggingIn = true;
        state.loginError = null;
      })
      .addCase(loginAsync.rejected, (state, _action) => {
        state.loggingIn = false;
      })
      .addCase(loginAsync.fulfilled, (state, _action) => {
        state.loggingIn = false;
      })
      .addCase(registerAsync.pending, (state, _action) => {
        state.requestingAccount = true;
        state.registerError = null;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.requestingAccount = false;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.requestingAccount = false;
      });
  },
});

export const loginAsync = createAsyncThunk(
  "loginSlice/login",
  async ({ emailOrUsername, password, onLoginSuccess }) => {
    const token = await attemptLogin({
      username: emailOrUsername,
      password,
    });
    // Add a cookie so we can use it to authenticate future page visits
    setLoginCookie(token);
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  }
);

export const registerAsync = createAsyncThunk(
  "loginSlice/register",
  async ({ onRegisterSuccess, ...values }) => {
    const { token } = await attemptRegister(values);
    // Add a cookie so we can use it to authenticate future page visits
    setLoginCookie(token);
    if (onRegisterSuccess) {
      onRegisterSuccess();
    }
  }
);

export const selectRepoSearch = (state) => state.repoSearch;

export const loginReducer = loginSlice.reducer;
