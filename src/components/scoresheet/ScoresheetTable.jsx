import React from "react";
import Table from "react-bootstrap/Table";
import sum from "lodash/sum";

import { Info } from "@components/common/alerts";
import Card from "@components/common/cards";

const ScoresheetTable = ({ cycles, currentCycle, teams, rules }) => {
  const [firstTeam, secondTeam] = teams;

  const getPlayerDisplay = (player) => player.name.substring(0, 2);

  const getPlayerAnswerValueInCycle = (cycle, playerId) => {
    const answer = cycle.answers.find((a) => a.playerId === playerId);
    return answer?.value || null;
  };

  const getTeamBonusesInCycle = (cycle, teamId) => {
    return sum(
      cycle.bonuses
        .filter((b) => b.answeringTeamId === teamId)
        .map((b) => b.value)
    );
  };

  const getTeamScoreUpToCycle = (cycle, team) => {
    const playerIds = new Set(team.players.map((p) => p.id));
    const includedCycles = cycles.filter((c) => c.number <= cycle.number);
    if (cycle === currentCycle) {
      includedCycles.push(currentCycle);
    }
    const tossupSums = sum(
      includedCycles
        .flatMap((c) => c.answers)
        .filter((a) => playerIds.has(a.playerId))
        .map((a) => a.value)
    );

    const bonusSums = sum(
      includedCycles
        .flatMap((c) => c.bonuses)
        .filter((b) => b.answeringTeamId === team.id)
        .map((b) => b.value)
    );
    return tossupSums + bonusSums;
  };

  const renderScoresheetCycleRow = (cycle) => (
    <tr
      className={cycle === currentCycle ? "table-active" : ""}
      key={cycle.number}
    >
      {firstTeam.players.map((player) => (
        <td key={player.id}>{getPlayerAnswerValueInCycle(cycle, player.id)}</td>
      ))}
      <td>{getTeamBonusesInCycle(cycle, firstTeam.id)}</td>
      <td>{getTeamScoreUpToCycle(cycle, firstTeam)}</td>
      <td>{cycle.number}</td>
      <td>{getTeamScoreUpToCycle(cycle, secondTeam)}</td>
      <td>{getTeamBonusesInCycle(cycle, secondTeam.id)}</td>
      {secondTeam.players.map((player) => (
        <td key={player.id}>{getPlayerAnswerValueInCycle(cycle, player.id)}</td>
      ))}
    </tr>
  );
  return (
    <Card>
      {currentCycle.number > 1 && (
        <Info>
          {" "}
          You can change a previous tossup/bonus cycle by clicking into a table
          cell.
        </Info>
      )}
      <Table
        bordered
        responsive
        size="sm"
        style={{ textAlign: "center" }}
        className="m-0"
      >
        <thead>
          <tr>
            <th colSpan={firstTeam.players.length}>{firstTeam.name}</th>
            <th colSpan={5} />
            <th colSpan={secondTeam.players.length}>{secondTeam.name}</th>
          </tr>
        </thead>
        <thead>
          <tr>
            {firstTeam.players.map((player) => (
              <th key={player.id}>{getPlayerDisplay(player)}</th>
            ))}
            <th>Bonus</th>
            <th>Total</th>
            <th>TU</th>
            <th>Total</th>
            <th>Bonus</th>
            {secondTeam.players.map((player) => (
              <th key={player.id}>{getPlayerDisplay(player)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cycles.map((cycle) => renderScoresheetCycleRow(cycle))}
          {renderScoresheetCycleRow(currentCycle)}
        </tbody>
      </Table>
    </Card>
  );
};

export default ScoresheetTable;
