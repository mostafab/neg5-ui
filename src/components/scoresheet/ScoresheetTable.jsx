import React from "react";
import Table from "react-bootstrap/Table";
import sum from "lodash/sum";
import keyBy from "lodash/keyBy";
import mapValues from "lodash/mapValues";

import { answerTypeToPillType } from "@libs/tournamentForms";
import { Info } from "@components/common/alerts";
import Card from "@components/common/cards";

const ScoresheetTable = ({ cycles, currentCycle, teams, rules }) => {
  const [firstTeam, secondTeam] = teams;

  const getPlayerDisplay = (player) => player.name.substring(0, 2);

  const valueToTypeMap = mapValues(
    keyBy(rules.tossupValues, "value"),
    (v) => v.answerType
  );

  const getPlayerAnswerValueInCycle = (cycle, playerId) => {
    const answer = cycle.answers.find((a) => a.playerId === playerId);
    if (!answer) {
      return null;
    }
    const answerType = valueToTypeMap[answer.value];
    return {
      value: answer.value,
      className: `text-bg-${answerTypeToPillType[answerType]}`,
    };
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

  const renderPlayerAnswerCell = (player, cycle, role) => {
    const answer = getPlayerAnswerValueInCycle(cycle, player.id);
    return (
      <td role={role} key={player.id} className={answer?.className || ""}>
        {answer?.value || null}
      </td>
    );
  };

  const renderScoresheetCycleRow = (cycle) => {
    const role = currentCycle === cycle ? null : "button";
    return (
      <tr
        className={cycle === currentCycle ? "table-active" : ""}
        key={cycle.number}
      >
        {firstTeam.players.map((player) =>
          renderPlayerAnswerCell(player, cycle, role)
        )}
        <td role={role}>{getTeamBonusesInCycle(cycle, firstTeam.id)}</td>
        <td>{getTeamScoreUpToCycle(cycle, firstTeam)}</td>
        <td>{cycle.number}</td>
        <td>{getTeamScoreUpToCycle(cycle, secondTeam)}</td>
        <td role={role}>{getTeamBonusesInCycle(cycle, secondTeam.id)}</td>
        {secondTeam.players.map((player) =>
          renderPlayerAnswerCell(player, cycle, role)
        )}
      </tr>
    );
  };
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
