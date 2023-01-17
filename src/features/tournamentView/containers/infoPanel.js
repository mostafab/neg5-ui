import { connect } from "react-redux";

import TournamentInfoPanel from "@components/tournaments/tournamentView/TournamentInfoPanel";

const mapStateToProps = ({ tournamentInfoReducer }) => ({
  tournamentInfo: {
    ...tournamentInfoReducer,
  },
});

export default connect(mapStateToProps, null)(TournamentInfoPanel);
