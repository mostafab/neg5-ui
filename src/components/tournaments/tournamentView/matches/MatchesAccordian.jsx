import React from "react";
import groupBy from "lodash/groupBy";
import orderBy from "lodash/orderBy";
import Accordian from "react-bootstrap/Accordion";

const MatchesAccordian = ({ matches, teams }) => {
  const matchesByRound = groupBy(matches, "round");
  const roundsInOrder = orderBy(
    Object.keys(matchesByRound),
    (r) => (r ? Number(r) : -1),
    ["desc"]
  );
  console.log(teams);
  return (
    <Accordian alwaysOpen>
      {roundsInOrder.map((round) => (
        <Accordian.Item eventKey={round} key={round}>
          <Accordian.Header>
            Round {round} ({matchesByRound[round].length})
          </Accordian.Header>
        </Accordian.Item>
      ))}
    </Accordian>
  );
};

export default MatchesAccordian;
