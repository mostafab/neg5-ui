import { connect } from "react-redux";

import TournamentMatchesPanel from "@components/tournaments/tournamentView/TournamentMatchesPanel";

const mapStateToProps = ({
  tournamentMatchesReducer,
  tournamentTeamsReducer,
}) => ({
  matches: tournamentMatchesReducer.matches,
  teams: tournamentTeamsReducer.teams,
});

export default connect(mapStateToProps, null)(TournamentMatchesPanel);
