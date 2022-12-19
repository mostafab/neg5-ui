import { connect } from "react-redux";

import Navbar from "@components/common/layout/Navbar";

const mapStateToProps = (state) => ({ ...state });

export default connect(mapStateToProps, null)(Navbar);
