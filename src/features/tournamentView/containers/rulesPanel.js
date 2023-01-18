import { connect } from "react-redux";

import TournamentRulesPanel from "@components/tournaments/tournamentView/TournamentRulesPanel";
import { ScoresheetState } from "@libs/enums";

const mapStateToProps = ({
  tournamentRulesReducer,
  tournamentMatchesReducer,
  tournamentPermissionsReducer,
}) => ({
  rules: tournamentRulesReducer,
  editable:
    tournamentMatchesReducer.matches.length === 0 &&
    tournamentMatchesReducer.scoresheets.filter(
      (s) => s.status === ScoresheetState.Draft
    ).length === 0 &&
    tournamentPermissionsReducer.data?.canEditRules,
});

export default connect(mapStateToProps, null)(TournamentRulesPanel);
