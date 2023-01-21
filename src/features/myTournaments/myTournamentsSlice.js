import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getUserTournaments, createTournament } from "@api/tournaments";
import { sanitizeFormValues } from "@libs/forms";

const initialState = {
  tournaments: [],
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
        state.loadingData = false;
        const { collaboratingTournaments, userOwnedTournaments } =
          action.payload;
        state.tournaments =
          collaboratingTournaments.concat(userOwnedTournaments);
      })
      .addCase(createTournamentAsync.pending, (state) => {
        state.submittingTournament = true;
        state.submittingTournamentError = null;
      })
      .addCase(createTournamentAsync.fulfilled, (state, action) => {
        state.submittingTournament = false;
        state.tournaments.push(action.payload);
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
      result = await createTournament(sanitizeFormValues(values));
    } catch (e) {
      if (e.response?.status === 400) {
        return thunkApi.rejectWithValue(e.response.data);
      }
      throw e;
    }
    if (onSuccess) {
      onSuccess(result);
    }
    return result;
  }
);

export const myTournamentsReducer = myTournamentsSlice.reducer;
