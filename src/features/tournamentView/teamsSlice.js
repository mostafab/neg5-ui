import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { loadTeams, loadTeamGroups } from "@api/tournaments";

const initialState = {
  teams: [],
  groups: [],
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
    teamDeleted(state, action) {
      const teamId = action.payload.teamId;
      state.teams = state.teams.filter((t) => t.id !== teamId);
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
      state.teams = action.payload.teams;
      state.groups = action.payload.groups;
    });
  },
});

export const loadTournamentTeamsAsync = createAsyncThunk(
  "tournamentTeamsSlice/loadTeams",
  async (tournamentId) => {
    const result = await Promise.all([
      loadTeams(tournamentId),
      loadTeamGroups(tournamentId),
    ]);
    return {
      teams: result[0],
      groups: result[1],
    };
  }
);

export const tournamentTeamsReducer = tournamentTeamsSlice.reducer;

export const { teamCreatedOrUpdated, teamsPoolsUpdated, teamDeleted } =
  tournamentTeamsSlice.actions;
