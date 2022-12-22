import { connect } from "react-redux";

import AuthenticatedLayout from "@components/common/layout/AuthenticatedLayout";

const mapStateToProps = ({ loginReducer }) => ({
  currentUser: loginReducer.currentUser,
});

export default connect(mapStateToProps, null)(AuthenticatedLayout);
