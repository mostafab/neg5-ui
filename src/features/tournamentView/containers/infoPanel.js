import { connect } from "react-redux";
import dayjs from "dayjs";

import TournamentInfoPanel from "@components/tournaments/tournamentView/TournamentInfoPanel";

const mapStateToProps = ({ tournamentInfoReducer }) => ({
  tournamentInfo: {
    ...tournamentInfoReducer,
  },
});

export default connect(mapStateToProps, null)(TournamentInfoPanel);
