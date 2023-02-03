import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";

import keyBy from "lodash/keyBy";
import orderBy from "lodash/orderBy";
import groupBy from "lodash/groupBy";

import Pill from "@components/common/pill";

import ScheduleFilters from "./ScheduleFilters";

const ScheduledMatches = ({
  matches,
  teams,
  onSelect,
  filterable,
  splitByRound = false,
}) => {
  const teamsById = keyBy(teams, "id");
  const [filters, setFilters] = useState(null);

  const getMatchTitle = ({ team1Id, team2Id, round, room }) => {
    const prefix = splitByRound ? "" : `Round ${round}:`;
    if (!team1Id || !team2Id) {
      return (
        <>
          {prefix} {teamsById[team1Id || team2Id]?.name}
          <Pill type="info" className="ms-2">
            BYE
          </Pill>
        </>
      );
    }
    return (
      <>
        {prefix} {teamsById[team1Id]?.name} vs {teamsById[team2Id]?.name}
        {room && <div className="small text-dark mt-2">Room: {room}</div>}
      </>
    );
  };
  const filtersToUse = filters;
  const filteredMatches =
    filtersToUse === null
      ? matches
      : matches.filter((m) => {
          if (
            filtersToUse.rooms.length > 0 &&
            filtersToUse.rooms.indexOf(m.room) === -1
          ) {
            return false;
          }
          if (
            filtersToUse.rounds.length > 0 &&
            filtersToUse.rounds.indexOf(m.round) === -1
          ) {
            return false;
          }
          const teamMatches =
            filtersToUse.teams.indexOf(m.team1Id) >= 0 ||
            filtersToUse.teams.indexOf(m.team2Id) >= 0;
          if (filtersToUse.teams.length > 0 && !teamMatches) {
            return false;
          }
          return true;
        });

  const renderInnerCount = () => {
    if (splitByRound) {
      const matchesByRound = groupBy(filteredMatches, "round");
      return (
        <div className="overflow-scroll" style={{ maxHeight: "75vh" }}>
          {orderBy(Object.keys(matchesByRound), (r) => Number(r)).map(
            (round) => {
              const matches = matchesByRound[round];
              return (
                <div key={round} className="mb-3">
                  <h5 className="fw-bold">Round {round}</h5>
                  <ListGroup>
                    {matches.map((m) => (
                      <ListGroup.Item
                        action={onSelect ? true : false}
                        key={m.id}
                        onClick={onSelect ? () => onSelect(m) : null}
                      >
                        {getMatchTitle(m)}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              );
            }
          )}
        </div>
      );
    } else {
      return (
        <ListGroup className="overflow-scroll" style={{ maxHeight: "75vh" }}>
          {orderBy(filteredMatches, "round").map((m) => (
            <ListGroup.Item
              action={onSelect ? true : false}
              key={m.id}
              onClick={onSelect ? () => onSelect(m) : null}
            >
              {getMatchTitle(m)}
            </ListGroup.Item>
          ))}
        </ListGroup>
      );
    }
  };
  return (
    <>
      {filterable && (
        <ScheduleFilters
          teams={teams}
          matches={matches}
          onChange={(values) => setFilters(values)}
        />
      )}
      {renderInnerCount()}
    </>
  );
};

export default ScheduledMatches;
