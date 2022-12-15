import { connect } from "react-redux";

import LoginPage from "components/login/LoginPage";

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps, null)(LoginPage);
