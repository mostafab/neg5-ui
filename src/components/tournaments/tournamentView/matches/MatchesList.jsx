import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import orderBy from "lodash/orderBy";
import dayjs from "dayjs";

const MatchesList = ({
  matches,
  teamsById,
  onSelectMatch,
  selectedMatchId = null,
  subtitled = true,
}) => (
  <ListGroup variant="flush">
    {orderBy(matches, "addedAt", "desc").map((match) => {
      const matchTeamsDisplayString = orderBy(match.teams, "teamId")
        .map((t) => {
          const teamName = teamsById[t.teamId]?.name;
          const score = t.score;
          return `${teamName} (${score})`;
        })
        .join(" vs ");
      return (
        <ListGroup.Item
          key={match.id}
          active={selectedMatchId === match.id}
          action
          onClick={() => onSelectMatch(match)}
        >
          <div>{matchTeamsDisplayString}</div>
          {subtitled && match.addedAt && (
            <span className="small text-dark">
              Added {dayjs(match.addedAt).format("MMM DD h:mm A")}
            </span>
          )}
        </ListGroup.Item>
      );
    })}
  </ListGroup>
);

export default MatchesList;
