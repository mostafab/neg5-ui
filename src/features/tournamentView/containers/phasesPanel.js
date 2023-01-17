import { connect } from "react-redux";

import { groupTeamsWithoutAssignedPool, groupTeamsByPools } from "@libs/teams";

import PhasesPanel from "@components/tournaments/tournamentView/TournamentPhasesPanel";

const mapStateToProps = ({
  tournamentPhasesReducer,
  tournamentTeamsReducer,
  tournamentPermissionsReducer,
}) => ({
  phases: tournamentPhasesReducer.phases,
  pools: tournamentPhasesReducer.pools,
  poolTeams: groupTeamsByPools(tournamentTeamsReducer.teams),
  teamsNotAssignedPools: groupTeamsWithoutAssignedPool(
    tournamentTeamsReducer.teams,
    tournamentPhasesReducer.phases
  ),
  editable: tournamentPermissionsReducer.data?.canEditPools,
});

export default connect(mapStateToProps, null)(PhasesPanel);
