import { connect } from "react-redux";
import keyBy from "lodash/keyBy";

import TournamentMatchesPanel from "@components/tournaments/tournamentView/TournamentMatchesPanel";

const getPlayersById = (teams) => {
  return keyBy(
    teams.flatMap((team) => team.players || []),
    "id"
  );
};

const mapStateToProps = ({
  tournamentMatchesReducer,
  tournamentTeamsReducer,
  tournamentRulesReducer,
}) => ({
  matches: tournamentMatchesReducer.matches,
  teams: tournamentTeamsReducer.teams,
  rules: tournamentRulesReducer,
  playersById: getPlayersById(tournamentTeamsReducer.teams),
});

export default connect(mapStateToProps, null)(TournamentMatchesPanel);
