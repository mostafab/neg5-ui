import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getUserTournaments, createTournament } from "@api/tournaments";
import { splitByPastOrUpcoming } from "@libs/tournaments";
import { sanitizeFormValues } from "@libs/forms";

const initialState = {
  past: [],
  upcoming: [],
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
        const { past, upcoming } = action.payload;
        state.past = past;
        state.upcoming = upcoming;
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
    const { collaboratingTournaments, userOwnedTournaments } =
      await getUserTournaments();
    return splitByPastOrUpcoming(
      collaboratingTournaments.concat(userOwnedTournaments)
    );
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
      onSuccess();
    }
    return result;
  }
);

export const myTournamentsReducer = myTournamentsSlice.reducer;
