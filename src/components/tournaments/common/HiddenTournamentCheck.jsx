import React from "react";
import { connect } from "react-redux";

const HiddenTournamentCheck = ({ hidden, children, fallback }) => {
  if (hidden) {
    return fallback;
  }
  return children;
};

const mapStateToProps = ({ tournamentInfoReducer }) => ({
  hidden: tournamentInfoReducer.hidden,
});

export default connect(mapStateToProps, null)(HiddenTournamentCheck);
