import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getUserTournaments, createTournament } from "@api/tournaments";

const initialState = {
  collaboratingTournaments: [],
  ownTournaments: [],
  loadingData: true,
  submittingTournament: false,
  submittingTournamentError: null,
};

const myTournamentsSlice = createSlice({
  name: "myTournaments",
  initialState,
  reducers: {},
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
      })
      .addCase(createTournamentAsync.pending, (state) => {
        state.submittingTournament = true;
        state.submittingTournamentError = null;
      })
      .addCase(createTournamentAsync.fulfilled, (state) => {
        state.submittingTournament = false;
      })
      .addCase(createTournamentAsync.rejected, (state, action) => {
        state.submittingTournament = false;
        state.submittingTournamentError =
          action.payload?.errors ||
          "There was an issue submitting your request.";
      });
  },
});

export const loadTournamentsAsync = createAsyncThunk(
  "myTournamentsSlice/loadTournaments",
  async () => {
    return await getUserTournaments();
  }
);

export const createTournamentAsync = createAsyncThunk(
  "myTournamentsSlice/createTournament",
  async ({ values, onSuccess }, thunkApi) => {
    let result;
    try {
      result = await createTournament(values);
    } catch (e) {
      if (e.response?.status === 400) {
        return thunkApi.rejectWithValue(e.response.data);
      }
      throw e;
    }
    if (onSuccess) {
      onSuccess();
    }
    return result;
  }
);

export const myTournamentsReducer = myTournamentsSlice.reducer;
