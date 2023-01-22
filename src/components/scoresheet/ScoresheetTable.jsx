import React from "react";
import Table from "react-bootstrap/Table";
import sum from "lodash/sum";
import keyBy from "lodash/keyBy";
import mapValues from "lodash/mapValues";

import { answerTypeToPillType } from "@libs/tournamentForms";
import { orderPlayers } from "@libs/scoresheet";

import { Info } from "@components/common/alerts";
import Card from "@components/common/cards";
import { Edit } from "@components/common/icon";

const ScoresheetTable = ({
  cycles,
  currentCycle = null,
  teams,
  rules,
  playerOrderings = {},
  className = "",
  readOnly = false,
  inCard = true,
  onEditCycle,
  activeEditCycleNumber = null,
}) => {
  const [firstTeam, secondTeam] = teams;
  const firstTeamOrdering = playerOrderings[firstTeam.id] || [];
  const secondTeamOrdering = playerOrderings[secondTeam.id] || [];

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

  const renderPlayerAnswerCell = (player, cycle) => {
    const answer = getPlayerAnswerValueInCycle(cycle, player.id);
    return (
      <td key={player.id} className={answer?.className || ""}>
        {answer?.value || null}
      </td>
    );
  };

  const renderScoresheetCycleRow = (cycle) => {
    const isCurrentCycle = cycle === currentCycle;
    return (
      <tr className={isCurrentCycle ? "table-active" : ""} key={cycle.number}>
        {!readOnly && (
          <td
            className={
              cycle.number === activeEditCycleNumber ? "text-bg-warning" : ""
            }
          >
            {!isCurrentCycle && (
              <Edit onClick={onEditCycle ? () => onEditCycle(cycle) : null} />
            )}
          </td>
        )}
        {orderPlayers(firstTeam.players, firstTeamOrdering).map((player) =>
          renderPlayerAnswerCell(player, cycle)
        )}
        <td>{getTeamBonusesInCycle(cycle, firstTeam.id)}</td>
        <td className={isCurrentCycle ? "text-bg-primary" : ""}>
          {getTeamScoreUpToCycle(cycle, firstTeam)}
        </td>
        <td>{cycle.number}</td>
        <td className={isCurrentCycle ? "text-bg-primary" : ""}>
          {getTeamScoreUpToCycle(cycle, secondTeam)}
        </td>
        <td>{getTeamBonusesInCycle(cycle, secondTeam.id)}</td>
        {orderPlayers(secondTeam.players, secondTeamOrdering).map((player) =>
          renderPlayerAnswerCell(player, cycle)
        )}
      </tr>
    );
  };
  const Wrapper = ({ children }) => {
    if (inCard) {
      return <Card className={className}>{children}</Card>;
    }
    return <>{children}</>;
  };
  return (
    <Wrapper>
      {currentCycle?.number > 1 && (
        <Info>
          You can edit a previous tossup/bonus cycle by clicking the{" "}
          <Edit className="me-1" />
          icon in the appropriate row.
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
            {!readOnly && <th></th>}
            <th colSpan={firstTeam.players.length}>{firstTeam.name}</th>
            <th colSpan={5} />
            <th colSpan={secondTeam.players.length}>{secondTeam.name}</th>
          </tr>
        </thead>
        <thead>
          <tr>
            {!readOnly && <th></th>}
            {orderPlayers(firstTeam.players, firstTeamOrdering).map(
              (player) => (
                <th title={player.name} key={player.id}>
                  {getPlayerDisplay(player)}
                </th>
              )
            )}
            <th>Bonus</th>
            <th>Total</th>
            <th>TU</th>
            <th>Total</th>
            <th>Bonus</th>
            {orderPlayers(secondTeam.players, secondTeamOrdering).map(
              (player) => (
                <th title={player.name} key={player.id}>
                  {getPlayerDisplay(player)}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {cycles.map((cycle) => renderScoresheetCycleRow(cycle))}
          {currentCycle && renderScoresheetCycleRow(currentCycle)}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default ScoresheetTable;
