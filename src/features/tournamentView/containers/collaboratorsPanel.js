import { connect } from "react-redux";

import TournamentCollaboratorsPanel from "@components/tournaments/tournamentView/collaborators/TournamentCollaboratorsPanel";

const mapStateToProps = ({ tournamentCollaboratorsReducer, loginReducer }) => ({
  collaborators: tournamentCollaboratorsReducer.collaborators,
  currentUserId: loginReducer.currentUser.data?.username,
});

export default connect(mapStateToProps, null)(TournamentCollaboratorsPanel);
