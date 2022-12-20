import { connect } from "react-redux";

import Navbar from "@components/common/layout/Navbar";

const mapStateToProps = (state) => ({
  currentUser: state.loginReducer.currentUser,
});

export default connect(mapStateToProps, null)(Navbar);
