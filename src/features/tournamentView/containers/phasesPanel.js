import { connect } from "react-redux";

import PhasesPanel from "@components/tournaments/tournamentView/TournamentPhasesPanel";

const mapStateToProps = ({ tournamentPhasesReducer }) => ({
  phases: tournamentPhasesReducer.phases,
  pools: tournamentPhasesReducer.pools,
});

export default connect(mapStateToProps, null)(PhasesPanel);
