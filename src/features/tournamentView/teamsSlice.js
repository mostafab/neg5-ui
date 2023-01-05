import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { loadTeams } from "@api/tournaments";

const initialState = {
  teams: [],
};

const tournamentTeamsSlice = createSlice({
  name: "tournamentTeams",
  initialState,
  reducers: {
    teamCreatedOrUpdated(state, action) {
      const team = action.payload;
      const matchIndex = state.teams.findIndex((t) => t.id === team.id);
      if (matchIndex === -1) {
        state.teams.push(team);
      } else {
        state.teams[matchIndex] = team;
      }
    },
    teamsPoolsUpdated(state, action) {
      const { phaseId, assignments } = action.payload;
      assignments.forEach(({ teamId, pools }) => {
        const matchingTeam = state.teams.find((t) => t.id === teamId);
        if (pools.length === 0) {
          // If pools is empty, the team was unassigned their pool
          matchingTeam.divisions = matchingTeam.divisions.filter(
            (d) => d.phaseId !== phaseId
          );
        } else {
          const existingPoolInPhase = matchingTeam.divisions.find(
            (d) => d.phaseId === phaseId
          );
          if (existingPoolInPhase) {
            existingPoolInPhase.id = pools[0].poolId;
          } else {
            matchingTeam.divisions.push({
              id: pools[0].poolId,
              phaseId,
            });
          }
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadTournamentTeamsAsync.fulfilled, (state, action) => {
      state.teams = action.payload;
    });
  },
});

export const loadTournamentTeamsAsync = createAsyncThunk(
  "tournamentTeamsSlice/loadTeams",
  async (tournamentId) => {
    return await loadTeams(tournamentId);
  }
);

export const tournamentTeamsReducer = tournamentTeamsSlice.reducer;

export const { teamCreatedOrUpdated, teamsPoolsUpdated } =
  tournamentTeamsSlice.actions;
