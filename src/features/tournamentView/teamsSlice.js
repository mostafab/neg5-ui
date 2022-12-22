import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { loadTeams } from "@api/tournaments";

const initialState = {
  teams: [],
};

const tournamentTeamsSlice = createSlice({
  name: "tournamentTeams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadTournamentTeamsAsync.fulfilled, (state, action) => {
      state.teams = action.payload;
    });
  },
});

export const loadTournamentTeamsAsync = createAsyncThunk(
  "tournamentTeamsSlice/loadTeams",
  async (tournamentId) => {
    return await loadTeams(tournamentId);
  }
);

export const tournamentTeamsReducer = tournamentTeamsSlice.reducer;
