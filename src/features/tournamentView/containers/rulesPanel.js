import { connect } from "react-redux";

import TournamentRulesPanel from "@components/tournaments/tournamentView/TournamentRulesPanel";

const mapStateToProps = ({ tournamentRulesReducer }) => ({
  rules: tournamentRulesReducer,
});

export default connect(mapStateToProps, null)(TournamentRulesPanel);
