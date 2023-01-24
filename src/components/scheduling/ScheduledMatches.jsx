import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";

import keyBy from "lodash/keyBy";
import orderBy from "lodash/orderBy";

import ScheduleFilters from "./ScheduleFilters";

const ScheduledMatches = ({ matches, teams, onSelect, filterable }) => {
  const teamsById = keyBy(teams, "id");
  const [filters, setFilters] = useState(null);

  const getMatchTitle = ({ team1Id, team2Id, round, room }) => {
    return (
      <div>
        Round {round}: {teamsById[team1Id]?.name} vs {teamsById[team2Id]?.name}
        {room && <div className="small text-dark mt-2">{room}</div>}
      </div>
    );
  };
  const filteredMatches =
    filters === null
      ? matches
      : matches.filter((m) => {
          if (
            filters.rooms.length > 0 &&
            filters.rooms.indexOf(m.room) === -1
          ) {
            return false;
          }
          if (
            filters.rounds.length > 0 &&
            filters.rounds.indexOf(m.round) === -1
          ) {
            return false;
          }
          const teamMatches =
            filters.teams.indexOf(m.team1Id) >= 0 ||
            filters.teams.indexOf(m.team2Id) >= 0;
          if (filters.teams.length > 0 && !teamMatches) {
            return false;
          }
          return true;
        });
  return (
    <>
      {filterable && (
        <ScheduleFilters
          teams={teams}
          matches={matches}
          onChange={(values) => setFilters(values)}
        />
      )}
      <ListGroup className="overflow-scroll" style={{ maxHeight: "75vh" }}>
        {orderBy(filteredMatches, "round").map((m) => (
          <ListGroup.Item action key={m.id} onClick={() => onSelect(m)}>
            {getMatchTitle(m)}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default ScheduledMatches;
