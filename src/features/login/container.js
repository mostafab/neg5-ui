import { connect } from "react-redux";

import { loginConfig } from "@libs/google";

import LoginPage from "@components/login/LoginPage";

const mapStateToProps = (state) => ({
  ...state.loginReducer,
  googleClientId: loginConfig.clientId,
});

export default connect(mapStateToProps, null)(LoginPage);
