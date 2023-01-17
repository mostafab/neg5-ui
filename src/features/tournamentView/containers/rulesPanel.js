import { connect } from "react-redux";

import TournamentRulesPanel from "@components/tournaments/tournamentView/TournamentRulesPanel";

const mapStateToProps = ({
  tournamentRulesReducer,
  tournamentMatchesReducer,
}) => ({
  rules: tournamentRulesReducer,
  editable:
    tournamentMatchesReducer.matches.length === 0 &&
    tournamentMatchesReducer.scoresheets.length === 0,
});

export default connect(mapStateToProps, null)(TournamentRulesPanel);
