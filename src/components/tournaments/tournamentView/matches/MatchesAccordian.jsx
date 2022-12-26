import React from "react";
import groupBy from "lodash/groupBy";
import orderBy from "lodash/orderBy";
import keyBy from "lodash/keyBy";
import Accordian from "react-bootstrap/Accordion";

import MatchesList from "@components/tournaments/tournamentView/matches/MatchesList";

const MatchesAccordian = ({
  matches,
  teams,
  onSelectMatch,
  openMultiple = true,
  selectedMatch = null,
  subtitleItems = true,
  shadow = false,
}) => {
  const matchesByRound = groupBy(matches, "round");
  const roundsInOrder = orderBy(
    Object.keys(matchesByRound),
    (r) => (r ? Number(r) : -1),
    ["desc"]
  );
  const teamsById = keyBy(teams, "id");
  return (
    <Accordian
      defaultActiveKey={
        selectedMatch?.round ? `${selectedMatch.round}` : undefined
      }
      alwaysOpen={openMultiple}
      className={`MatchesAcoordian ${shadow ? "shadow-sm" : ""}`}
    >
      {roundsInOrder.map((round) => (
        <Accordian.Item eventKey={round} key={round}>
          <Accordian.Header>
            <b>
              Round {round} ({matchesByRound[round].length})
            </b>
          </Accordian.Header>
          <Accordian.Body className="p-0">
            <MatchesList
              matches={matchesByRound[round]}
              selectedMatchId={selectedMatch?.id}
              teamsById={teamsById}
              onSelectMatch={onSelectMatch}
              subtitled={subtitleItems}
            />
          </Accordian.Body>
        </Accordian.Item>
      ))}
    </Accordian>
  );
};

export default MatchesAccordian;
