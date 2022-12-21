import { connect } from "react-redux";

import WithTournamentAccess from "@components/common/layout/WithTournamentAccess";

const mapStateToProps = ({ tournamentPermissionsReducer }) => ({
  permissions: tournamentPermissionsReducer,
});

export default connect(mapStateToProps, null)(WithTournamentAccess);
