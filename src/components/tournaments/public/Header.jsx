import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import dayjs from "dayjs";

import config from "config";

import { TournamentIdContext } from "@components/tournaments/common/context";

const STATS_BASE_URL = config.statsBaseUrl;

const Header = ({ tournamentName, date, teams }) => {
  const tournamentId = useContext(TournamentIdContext);
  useEffect(() => {
    if (tournamentName) {
      document.title = `${tournamentName} Schedule | Neg 5`;
    }
  }, [tournamentName]);
  return (
    <>
      <h3>{tournamentName}</h3>
      {date && <h5>{dayjs(date).format("MMMM D, YYYY")}</h5>}
      <h5>{teams.length} Teams</h5>
      <h5>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${STATS_BASE_URL}/t/${tournamentId}`}
        >
          Stats
        </a>
      </h5>
    </>
  );
};

const mapStateToProps = ({
  tournamentInfoReducer,
  tournamentTeamsReducer,
}) => ({
  tournamentName: tournamentInfoReducer.name,
  date: tournamentInfoReducer.tournamentDate,
  teams: tournamentTeamsReducer.teams,
});

export default connect(mapStateToProps, null)(Header);
