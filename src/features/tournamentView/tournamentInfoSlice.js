import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { loadInformation } from "@api/tournaments";

const initialState = {
  name: null,
  tournamentDate: null,
  location: null,
  questionSet: null,
  comments: null,
};

const tournamentInfoSlice = createSlice({
  name: "tournamentInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      loadTournamentDataAsync.fulfilled,
      (state, action) => {
        Object.assign(state, action.payload);
      }
    );
  },
});

export const loadTournamentDataAsync = createAsyncThunk(
  "tournamentInfoSlice/loadTournament",
  async (tournamentId) => {
    return await loadInformation(tournamentId);
  }
);

export const tournamentInfoReducer = tournamentInfoSlice.reducer;
