import { connect } from "react-redux";

import { groupTeamsWithoutAssignedPool, groupTeamsByPools } from "@libs/teams";

import PhasesPanel from "@components/tournaments/tournamentView/TournamentPhasesPanel";

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
