import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { loadMatches } from "@api/tournaments";

const initialState = {
  matches: [],
};

const tournamentMatchesSlice = createSlice({
  name: "tournamentMatches",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadTournamentMatchesAsync.fulfilled, (state, action) => {
      state.matches = action.payload;
    });
  },
});

export const loadTournamentMatchesAsync = createAsyncThunk(
  "tournamentMatchesSlice/loadMatches",
  async (tournamentId) => {
    return await loadMatches(tournamentId);
  }
);

export const tournamentMatchesReducer = tournamentMatchesSlice.reducer;
