import { createSlice } from "@reduxjs/toolkit";
import orderBy from "lodash/orderBy";

import { loadTournamentDataAsync } from "@features/tournamentView/tournamentInfoSlice";
import { copyKeys } from "@libs/util";

const initialState = {
  allowTies: null,
  bonusPointValue: null,
  maxActivePlayersPerTeam: null,
  partsPerBonus: null,
  tossupValues: [],
  usesBouncebacks: null,
};

const keys = Object.keys(initialState);

const tournamentRulesSlice = createSlice({
  name: "tournamentInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadTournamentDataAsync.fulfilled, (state, action) => {
      copyKeys(keys, state, action.payload);
      state.tossupValues = orderBy(
        action.payload.tossupValues,
        ["value"],
        ["desc"]
      );
    });
  },
});

export const tournamentRulesReducer = tournamentRulesSlice.reducer;
