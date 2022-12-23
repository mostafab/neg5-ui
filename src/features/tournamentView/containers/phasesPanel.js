import { connect } from "react-redux";
import mapValues from "lodash/mapValues";
import orderBy from "lodash/orderBy";

import PhasesPanel from "@components/tournaments/tournamentView/TournamentPhasesPanel";

const groupTeamsByPools = (teams) => {
  const poolTeams = {};
  teams.forEach((team) => {
    const assignedPools = team.divisions || [];
    assignedPools.forEach((pool) => {
      if (!poolTeams[pool.id]) {
        poolTeams[pool.id] = [];
      }
      poolTeams[pool.id].push(team);
    });
  });
  return mapValues(poolTeams, (val) => orderBy(val, "name"));
};

const groupTeamsWithoutAssignedPool = (teams, phases) => {
  const unassignedTeams = {};
  phases.forEach((p) => {
    unassignedTeams[p.id] = [];
    teams.forEach((team) => {
      const teamIsAssignedPoolInPhase = (team.divisions || []).some(
        (pool) => pool.phaseId === p.id
      );
      if (!teamIsAssignedPoolInPhase) {
        unassignedTeams[p.id].push(team);
      }
    });
  });
  return unassignedTeams;
};

const mapStateToProps = ({
  tournamentPhasesReducer,
  tournamentTeamsReducer,
}) => ({
  phases: tournamentPhasesReducer.phases,
  pools: tournamentPhasesReducer.pools,
  poolTeams: groupTeamsByPools(tournamentTeamsReducer.teams),
  teamsNotAssignedPools: groupTeamsWithoutAssignedPool(
    tournamentTeamsReducer.teams,
    tournamentPhasesReducer.phases
  ),
});

export default connect(mapStateToProps, null)(PhasesPanel);
