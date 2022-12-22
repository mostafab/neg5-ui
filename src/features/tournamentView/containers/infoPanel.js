import { connect } from "react-redux";
import dayjs from "dayjs";

import TournamentInfoPanel from "@components/tournaments/tournamentView/TournamentInfoPanel";

const mapStateToProps = ({ tournamentInfoReducer }) => ({
  tournamentInfo: {
    ...tournamentInfoReducer,
    tournamentDate: tournamentInfoReducer.tournamentDate
      ? dayjs(tournamentInfoReducer.tournamentDate).format("MMMM D, YYYY")
      : null,
  },
});

export default connect(mapStateToProps, null)(TournamentInfoPanel);
