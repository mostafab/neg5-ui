import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { attemptLogin, attemptRegister } from "@api/login";
import { getUser } from "@api/user";
import { setLoginCookie } from "@libs/cookies";

const initialState = {
  loggingIn: false,
  requestingAccount: false,
  loginError: null,
  registerError: null,
  currentUser: {
    data: null,
    loaded: false,
  },
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
      .addCase(loginAsync.rejected, (state, action) => {
        state.loggingIn = false;
        state.loginError =
          action.payload?.errorMessage ||
          "There was an issue logging into your account.";
      })
      .addCase(loginAsync.fulfilled, (state, _action) => {
        state.loggingIn = false;
        state.loginError = null;
      })
      .addCase(registerAsync.pending, (state, _action) => {
        state.requestingAccount = true;
        state.registerError = null;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.requestingAccount = false;
        state.registerError =
          action.payload?.errorMessage ||
          "There was an issue creating your account.";
      })
      .addCase(registerAsync.fulfilled, (state, _action) => {
        state.requestingAccount = false;
        state.registerError = null;
      })
      .addCase(getCurrentUserAsync.fulfilled, (state, action) => {
        state.currentUser.data = action.payload;
        state.currentUser.loaded = true;
      });
  },
});

export const getCurrentUserAsync = createAsyncThunk(
  "loginSlice/currentUser",
  async () => {
    return await getUser();
  }
);

export const loginAsync = createAsyncThunk(
  "loginSlice/login",
  async ({ usernameOrEmail, password, onLoginSuccess }, thunkApi) => {
    try {
      const token = await attemptLogin({
        usernameOrEmail: usernameOrEmail,
        password,
      });
      // Add a cookie so we can use it to authenticate future page visits
      setLoginCookie(token);
    } catch (e) {
      if (e.response?.status === 403) {
        return thunkApi.rejectWithValue({
          errorMessage: "Invalid credentials provided.",
        });
      }
      console.error(e);
      throw e;
    }
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  }
);

export const registerAsync = createAsyncThunk(
  "loginSlice/register",
  async ({ onRegisterSuccess, ...values }, thunkApi) => {
    try {
      const { token } = await attemptRegister(values);
      // Add a cookie so we can use it to authenticate future page visits
      setLoginCookie(token);
    } catch (e) {
      if (e.response?.status === 403) {
        return thunkApi.rejectWithValue({ errorMessage: e.response?.data });
      }
      console.error(e);
      throw e;
    }
    if (onRegisterSuccess) {
      onRegisterSuccess();
    }
  }
);

export const loginReducer = loginSlice.reducer;
