import { connect } from "react-redux";

import { splitByPastOrUpcoming } from "@libs/tournaments";
import MyTournaments from "@components/tournaments/MyTournaments";

const addCollaboratorAttribute = (tournaments, currentUser) =>
  tournaments.map((t) => ({
    ...t,
    isCollaborator: t.directorId !== currentUser?.username,
  }));

const mapStateToProps = (state) => {
  const enriched = addCollaboratorAttribute(
    state.myTournamentsReducer.tournaments,
    state.loginReducer.currentUser.data
  );
  return {
    ...state.myTournamentsReducer,
    ...splitByPastOrUpcoming(enriched),
  };
};

export default connect(mapStateToProps, null)(MyTournaments);
