import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { loadMatches } from "@api/tournaments";
import { loadTournamentScoresheet } from "@api/scoresheet";

const initialState = {
  matches: [],
  scoresheets: [],
};

const tournamentMatchesSlice = createSlice({
  name: "tournamentMatches",
  initialState,
  reducers: {
    matchCreatedOrUpdated: (state, action) => {
      const { oldId, match } = action.payload;
      // Replace old match
      if (oldId) {
        const matchIndex = state.matches.findIndex((t) => t.id === oldId);
        state.matches[matchIndex] = match;
      } else {
        state.matches.push(match);
      }
    },
    matchDeleted(state, action) {
      const matchId = action.payload.matchId;
      state.matches = state.matches.filter((m) => m.id !== matchId);
    },
    scoresheetCreatedOrUpdated(state, action) {
      const scoresheetId = action.payload.id;
      const index = state.scoresheets.findIndex((s) => s.id === scoresheetId);
      if (index === -1) {
        state.scoresheets.push(action.payload);
      } else {
        state.scoresheets[index] = action.payload;
      }
    },
    scoresheetDeleted(state, action) {
      state.scoresheets = state.scoresheets.filter(
        (s) => s.id !== action.payload.id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTournamentMatchesAsync.fulfilled, (state, action) => {
        state.matches = action.payload;
      })
      .addCase(loadScoresheetsAsync.fulfilled, (state, action) => {
        state.scoresheets = action.payload;
      });
  },
});

export const loadTournamentMatchesAsync = createAsyncThunk(
  "tournamentMatchesSlice/loadMatches",
  async (tournamentId) => {
    return await loadMatches(tournamentId);
  }
);

export const loadScoresheetsAsync = createAsyncThunk(
  "tournamentMatchesSlice/loadScoresheets",
  async (tournamentId) => {
    return await loadTournamentScoresheet(tournamentId);
  }
);

export const tournamentMatchesReducer = tournamentMatchesSlice.reducer;

export const {
  matchCreatedOrUpdated,
  matchDeleted,
  scoresheetCreatedOrUpdated,
  scoresheetDeleted,
} = tournamentMatchesSlice.actions;
