import { connect } from "react-redux";

import TournamentCollaboratorsPanel from "@components/tournaments/tournamentView/collaborators/TournamentCollaboratorsPanel";

const mapStateToProps = ({
  tournamentCollaboratorsReducer,
  loginReducer,
  tournamentInfoReducer,
}) => ({
  collaborators: tournamentCollaboratorsReducer.collaborators,
  currentUserId: loginReducer.currentUser.data?.username,
  directorId: tournamentInfoReducer.directorId,
});

export default connect(mapStateToProps, null)(TournamentCollaboratorsPanel);
