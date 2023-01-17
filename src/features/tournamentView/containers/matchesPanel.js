import { connect } from "react-redux";
import keyBy from "lodash/keyBy";
import orderBy from "lodash/orderBy";

import TournamentMatchesPanel from "@components/tournaments/tournamentView/TournamentMatchesPanel";
import { ScoresheetState } from "@libs/enums";
import { getMatchesToBePlayed } from "@libs/scoresheet";

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
  tournamentPhasesReducer,
  tournamentPermissionsReducer,
  loginReducer,
}) => ({
  matches: tournamentMatchesReducer.matches,
  draftScoresheets: orderBy(
    tournamentMatchesReducer.scoresheets.filter(
      (s) => s.status === ScoresheetState.Draft
    ),
    "lastUpdatedAt",
    "desc"
  ),
  schedules: tournamentMatchesReducer.schedules,
  scheduledMatches: getMatchesToBePlayed(
    tournamentMatchesReducer.matches,
    tournamentMatchesReducer.schedules,
    tournamentMatchesReducer.scoresheets
  ),
  teams: tournamentTeamsReducer.teams,
  rules: tournamentRulesReducer,
  playersById: getPlayersById(tournamentTeamsReducer.teams),
  phases: tournamentPhasesReducer.phases,
  pools: tournamentPhasesReducer.pools,
  currentUser: loginReducer.currentUser.data,
  permissions: {
    scheduleEditable: tournamentPermissionsReducer.data?.canEditSchedule,
    matchesEditable: tournamentPermissionsReducer.data?.canEditMatches,
  },
});

export default connect(mapStateToProps, null)(TournamentMatchesPanel);
