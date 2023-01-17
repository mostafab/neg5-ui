import { connect } from "react-redux";

import TournamentCollaboratorsPanel from "@components/tournaments/tournamentView/collaborators/TournamentCollaboratorsPanel";

const mapStateToProps = ({
  tournamentCollaboratorsReducer,
  loginReducer,
  tournamentInfoReducer,
  tournamentPermissionsReducer,
}) => ({
  collaborators: tournamentCollaboratorsReducer.collaborators,
  currentUserId: loginReducer.currentUser.data?.username,
  directorId: tournamentInfoReducer.directorId,
  editable: tournamentPermissionsReducer.data?.canEditCollaborators,
});

export default connect(mapStateToProps, null)(TournamentCollaboratorsPanel);
