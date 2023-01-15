import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

import keyBy from "lodash/keyBy";
import orderBy from "lodash/orderBy";

const ScheduledMatches = ({ matches, teams, onSelect }) => {
  const teamsById = keyBy(teams, "id");

  const getMatchTitle = ({ team1Id, team2Id, round, room }) => {
    return (
      <div>
        Round {round}: {teamsById[team1Id]?.name} vs {teamsById[team2Id]?.name}
        {room && <div className="small text-dark mt-2">{room}</div>}
      </div>
    );
  };
  return (
    <ListGroup className="vh-100 overflow-scroll">
      {orderBy(matches, "round").map((m) => (
        <ListGroup.Item action key={m.id} onClick={() => onSelect(m)}>
          {getMatchTitle(m)}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ScheduledMatches;
