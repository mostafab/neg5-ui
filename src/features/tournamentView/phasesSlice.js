import { createSlice } from "@reduxjs/toolkit";
import orderBy from "lodash/orderBy";

import { loadTournamentDataAsync } from "@features/tournamentView/tournamentInfoSlice";

const initialState = {
  phases: [],
  pools: [],
};

const tournamentPhasesSlice = createSlice({
  name: "tournamentPhases",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadTournamentDataAsync.fulfilled, (state, action) => {
      state.phases = orderBy(
        action.payload.phases,
        ["addedAt", "name"],
        ["asc"]
      );
      state.pools = orderBy(action.payload.divisions, "name");
    });
  },
});

export const tournamentPhasesReducer = tournamentPhasesSlice.reducer;
