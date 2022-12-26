import { connect } from "react-redux";

import TournamentTeamsPanel from "@components/tournaments/tournamentView/TournamentTeamsPanel";

const mapStateToProps = ({
  tournamentTeamsReducer,
  tournamentMatchesReducer,
}) => ({
  teams: tournamentTeamsReducer.teams,
  matches: tournamentMatchesReducer.matches,
});

export default connect(mapStateToProps, null)(TournamentTeamsPanel);
