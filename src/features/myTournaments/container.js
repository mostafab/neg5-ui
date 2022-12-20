import { connect } from "react-redux";

import { splitByPastOrUpcoming } from "@libs/tournaments";
import MyTournaments from "@components/tournaments/MyTournaments";

const mapStateToProps = (state) => {
  return {
    ...state.myTournamentsReducer,
    ...splitByPastOrUpcoming(state.myTournamentsReducer.tournaments),
  };
};

export default connect(mapStateToProps, null)(MyTournaments);
