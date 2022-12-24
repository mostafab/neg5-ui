import { connect } from "react-redux";

import TournamentMatchesPanel from "@components/tournaments/tournamentView/TournamentMatchesPanel";

const mapStateToProps = ({
  tournamentMatchesReducer,
  tournamentTeamsReducer,
  tournamentRulesReducer,
}) => ({
  matches: tournamentMatchesReducer.matches,
  teams: tournamentTeamsReducer.teams,
  rules: tournamentRulesReducer,
});

export default connect(mapStateToProps, null)(TournamentMatchesPanel);
