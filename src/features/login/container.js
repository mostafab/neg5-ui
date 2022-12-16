import { connect } from "react-redux";

import LoginPage from "components/login/LoginPage";

const mapStateToProps = (state) => ({
  ...state.loginReducer,
});

export default connect(mapStateToProps, null)(LoginPage);
