import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import orderBy from "lodash/orderBy";
import dayjs from "dayjs";

import { Expand } from "@components/common/icon";

const MatchesList = ({ matches, teamsById }) => (
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
        <ListGroup.Item key={match.id}>
          <div>
            {matchTeamsDisplayString}
            <span className="float-end">
              <Expand onClick={() => console.log(match)} />
            </span>
          </div>
          {match.addedAt && (
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
