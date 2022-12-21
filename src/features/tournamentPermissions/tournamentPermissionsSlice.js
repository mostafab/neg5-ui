import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getPermissions } from "@api/tournaments";

const initialState = {
  loaded: false,
  data: null,
};

const tournamentPermissionsSlice = createSlice({
  name: "tournamentPermissions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      loadTournamentPermissionsAsync.fulfilled,
      (state, action) => {
        state.loaded = true;
        state.data = action.payload;
      }
    );
  },
});

export const loadTournamentPermissionsAsync = createAsyncThunk(
  "tournamentPermissionsSlice/loadPermissions",
  async (tournamentId) => {
    return await getPermissions(tournamentId);
  }
);

export const tournamentPermissionsReducer = tournamentPermissionsSlice.reducer;
