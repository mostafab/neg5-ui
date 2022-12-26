import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import orderBy from "lodash/orderBy";
import dayjs from "dayjs";

import { getMatchTeamsDisplayString } from "@libs/matches";

const MatchesList = ({
  matches,
  teamsById,
  onSelectMatch = null,
  selectedMatchId = null,
  subtitled = true,
  flush = true,
  displayRound = false,
  rowTeamsOrderParams = null,
  rowSideRender = null,
}) => (
  <ListGroup variant={flush ? "flush" : undefined}>
    {orderBy(matches, ["round", "addedAt"], ["desc", "desc"]).map((match) => {
      const matchTeamsDisplayString = getMatchTeamsDisplayString(
        match,
        teamsById,
        {
          includeRound: displayRound,
          teamSortParams: rowTeamsOrderParams,
        }
      );
      return (
        <ListGroup.Item
          key={match.id}
          active={selectedMatchId === match.id}
          action={onSelectMatch !== null}
          onClick={onSelectMatch ? () => onSelectMatch(match) : null}
        >
          <div>
            {matchTeamsDisplayString}
            {rowSideRender && rowSideRender(match)}
          </div>
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
