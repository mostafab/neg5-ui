import { connect } from "react-redux";

import TournamentTeamsPanel from "@components/tournaments/tournamentView/TournamentTeamsPanel";

const mapStateToProps = ({ tournamentTeamsReducer }) => ({
  teams: tournamentTeamsReducer.teams,
});

export default connect(mapStateToProps, null)(TournamentTeamsPanel);
