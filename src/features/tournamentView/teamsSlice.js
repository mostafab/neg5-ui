import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { loadTeams } from "@api/tournaments";

const initialState = {
  teams: [],
};

const tournamentTeamsSlice = createSlice({
  name: "tournamentTeams",
  initialState,
  reducers: {
    teamCreatedOrUpdated: (state, action) => {
      const team = action.payload;
      const matchIndex = state.teams.findIndex((t) => t.id === team.id);
      if (matchIndex === -1) {
        state.teams.push(team);
      } else {
        state.teams[matchIndex] = team;
      }
    },
  },
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

export const { teamCreatedOrUpdated } = tournamentTeamsSlice.actions;
