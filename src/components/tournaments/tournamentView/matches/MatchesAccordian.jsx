import React from "react";
import groupBy from "lodash/groupBy";
import orderBy from "lodash/orderBy";
import keyBy from "lodash/keyBy";
import Accordian from "react-bootstrap/Accordion";

import MatchesList from "@components/tournaments/tournamentView/matches/MatchesList";

const MatchesAccordian = ({ matches, teams }) => {
  const matchesByRound = groupBy(matches, "round");
  const roundsInOrder = orderBy(
    Object.keys(matchesByRound),
    (r) => (r ? Number(r) : -1),
    ["desc"]
  );
  const teamsById = keyBy(teams, "id");
  return (
    <Accordian alwaysOpen className="MatchesAcoordian">
      {roundsInOrder.map((round) => (
        <Accordian.Item eventKey={round} key={round}>
          <Accordian.Header>
            <strong>
              Round {round} ({matchesByRound[round].length})
            </strong>
          </Accordian.Header>
          <Accordian.Body className="p-0">
            <MatchesList
              matches={matchesByRound[round]}
              teamsById={teamsById}
            />
          </Accordian.Body>
        </Accordian.Item>
      ))}
    </Accordian>
  );
};

export default MatchesAccordian;
