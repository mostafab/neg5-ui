import { connect } from "react-redux";

import TournamentTeamsPanel from "@components/tournaments/tournamentView/TournamentTeamsPanel";

const mapStateToProps = ({
  tournamentTeamsReducer,
  tournamentMatchesReducer,
  tournamentPermissionsReducer,
}) => ({
  teams: tournamentTeamsReducer.teams,
  teamGroups: tournamentTeamsReducer.groups,
  matches: tournamentMatchesReducer.matches,
  editable: tournamentPermissionsReducer.data?.canEditTeams,
});

export default connect(mapStateToProps, null)(TournamentTeamsPanel);
