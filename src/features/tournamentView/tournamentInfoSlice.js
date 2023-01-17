import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  loadTournamentMatchesAsync,
  loadScoresheetsAsync,
  loadSchedulesAsync,
} from "@features/tournamentView/matchesSlice";
import { loadTournamentTeamsAsync } from "@features/tournamentView/teamsSlice";
import { loadCollaboratorsDataAsync } from "@features/tournamentView/tournamentCollaboratorsSlice";

import { loadInformation } from "@api/tournaments";

const initialState = {
  name: null,
  tournamentDate: null,
  location: null,
  questionSet: null,
  comments: null,
  hidden: null,
  state: null,
};

const tournamentInfoSlice = createSlice({
  name: "tournamentInfo",
  initialState,
  reducers: {
    informationUpdated(state, action) {
      Object.keys(initialState).forEach((key) => {
        state[key] =
          action.payload[key] === undefined ? null : action.payload[key];
      });
    },
  },
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
    dispatch(loadScoresheetsAsync(tournamentId));
    dispatch(loadSchedulesAsync(tournamentId));
    dispatch(loadTournamentTeamsAsync(tournamentId));
    dispatch(loadCollaboratorsDataAsync(tournamentId));
    return data;
  }
);

export const tournamentInfoReducer = tournamentInfoSlice.reducer;

export const { informationUpdated } = tournamentInfoSlice.actions;
