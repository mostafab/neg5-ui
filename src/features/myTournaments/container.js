import { connect } from "react-redux";

import MyTournaments from "components/tournaments/MyTournaments";

const mapStateToProps = (state) => ({ ...state.myTournamentsReducer });

export default connect(mapStateToProps, null)(MyTournaments);
