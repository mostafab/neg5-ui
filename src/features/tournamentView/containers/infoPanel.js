import { connect } from "react-redux";

import TournamentInfoPanel from "@components/tournaments/tournamentView/TournamentInfoPanel";

const mapStateToProps = ({
  tournamentInfoReducer,
  tournamentPermissionsReducer,
}) => ({
  tournamentInfo: {
    ...tournamentInfoReducer,
  },
  editable: tournamentPermissionsReducer.data?.canEditInfo,
});

export default connect(mapStateToProps, null)(TournamentInfoPanel);
