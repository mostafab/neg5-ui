import { connect } from "react-redux";

import TournamentCollaboratorsPanel from "@components/tournaments/tournamentView/collaborators/TournamentCollaboratorsPanel";

const mapStateToProps = ({ tournamentCollaboratorsReducer }) => ({
  collaborators: tournamentCollaboratorsReducer.collaborators,
});

export default connect(mapStateToProps, null)(TournamentCollaboratorsPanel);
