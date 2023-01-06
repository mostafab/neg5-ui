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
  reducers: {
    poolCreated: (state, action) => {
      state.pools.push(action.payload);
    },
    phaseCreated: (state, action) => {
      state.phases.push(action.payload);
    },
    poolsDeleted: (state, action) => {
      const poolIds = action.payload.poolIds;
      state.pools = state.pools.filter((p) => poolIds.indexOf(p.id) === -1);
    },
  },
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

export const { poolCreated, phaseCreated, poolsDeleted } =
  tournamentPhasesSlice.actions;
