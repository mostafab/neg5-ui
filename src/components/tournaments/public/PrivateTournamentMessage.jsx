import React from "react";
import { connect } from "react-redux";

import { Warning } from "@components/common/alerts";

const PrivateTournamentMessage = ({ tournamentName }) => {
  return (
    <Warning>
      {tournamentName} is a private tournament. Please contact the tournament
      director if you think this is a mistake.
    </Warning>
  );
};

const mapStateToProps = ({ tournamentInfoReducer }) => ({
  tournamentName: tournamentInfoReducer.name,
});

export default connect(mapStateToProps, null)(PrivateTournamentMessage);
