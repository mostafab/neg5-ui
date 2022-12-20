import { connect } from "react-redux";

import AuthenticatedLayout from "@components/common/layout/AuthenticatedLayout";

const mapStateToProps = ({ loginReducer }) => ({
  currentUser: loginReducer.currentUser,
  loadingCurrentUser: loginReducer.loadingCurrentUser,
});

export default connect(mapStateToProps, null)(AuthenticatedLayout);
