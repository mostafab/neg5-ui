import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getUserTournaments } from "api/tournaments";

const initialState = {
  collaboratingTournaments: [],
  ownTournaments: [],
  loadingData: true,
  showForm: false,
};

const myTournamentsSlice = createSlice({
  name: "myTournaments",
  initialState,
  reducers: {
    clickAddTournament: (state) => {
      state.showForm = true;
    },
    closeAddTournament: (state) => {
      state.showForm = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTournamentsAsync.pending, (state, _action) => {
        state.loadingData = true;
      })
      .addCase(loadTournamentsAsync.fulfilled, (state, action) => {
        const { collaboratingTournaments, userOwnedTournaments } =
          action.payload;
        state.loadingData = false;
        state.collaboratingTournaments = collaboratingTournaments;
        state.ownTournaments = userOwnedTournaments;
      });
  },
});

export const loadTournamentsAsync = createAsyncThunk(
  "myTournamentsSlice/loadTournaments",
  async () => {
    return await getUserTournaments();
  }
);

export const { clickAddTournament, closeAddTournament } =
  myTournamentsSlice.actions;

export const myTournamentsReducer = myTournamentsSlice.reducer;
