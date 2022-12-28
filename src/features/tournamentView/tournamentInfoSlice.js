import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { loadTournamentMatchesAsync } from "@features/tournamentView/matchesSlice";
import { loadTournamentTeamsAsync } from "@features/tournamentView/teamsSlice";
import { loadCollaboratorsDataAsync } from "@features/tournamentView/tournamentCollaboratorsSlice";

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
    builder.addCase(loadTournamentDataAsync.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
    });
  },
});

export const loadTournamentDataAsync = createAsyncThunk(
  "tournamentInfoSlice/loadTournament",
  async (tournamentId, { dispatch }) => {
    const data = await loadInformation(tournamentId);
    dispatch(loadTournamentMatchesAsync(tournamentId));
    dispatch(loadTournamentTeamsAsync(tournamentId));
    dispatch(loadCollaboratorsDataAsync(tournamentId));
    return data;
  }
);

export const tournamentInfoReducer = tournamentInfoSlice.reducer;
