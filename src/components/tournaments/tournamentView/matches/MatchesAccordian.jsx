import React, { useState, useEffect } from "react";
import groupBy from "lodash/groupBy";
import orderBy from "lodash/orderBy";
import keyBy from "lodash/keyBy";
import Accordian from "react-bootstrap/Accordion";

import MatchesList from "@components/tournaments/tournamentView/matches/MatchesList";

const MatchesAccordian = ({
  matches,
  teams,
  onSelectMatch,
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
  const [expandedRows, setExpandedRows] = useState(
    selectedMatch?.round ? [`${selectedMatch.round}`] : []
  );
  useEffect(() => {
    const roundKey = selectedMatch?.round ? `${selectedMatch.round}` : null;
    if (roundKey && expandedRows.indexOf(roundKey) === -1) {
      onHeaderClick(roundKey);
    }
  }, [selectedMatch]);
  const teamsById = keyBy(teams, "id");

  const onHeaderClick = (rowKey) => {
    let newRows = [...expandedRows];
    if (newRows.indexOf(rowKey) == -1) {
      newRows.push(rowKey);
    } else {
      newRows = newRows.filter((r) => r !== rowKey);
    }
    setExpandedRows(newRows);
  };
  return (
    <Accordian
      activeKey={expandedRows}
      alwaysOpen={true}
      className={`MatchesAcoordian ${shadow ? "shadow-sm" : ""}`}
    >
      {roundsInOrder.map((round) => (
        <Accordian.Item eventKey={round} key={round}>
          <Accordian.Header onClick={() => onHeaderClick(round)}>
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
