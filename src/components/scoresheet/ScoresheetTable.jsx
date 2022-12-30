import React from "react";
import Table from "react-bootstrap/Table";

import Card from "@components/common/cards";

const ScoresheetTable = ({ cycles, currentCycle, teams, rules }) => {
  const [firstTeam, secondTeam] = teams;

  const getPlayerDisplay = (player) => player.name.substring(0, 2);

  const renderScoresheetCycleRow = (cycle) => (
    <tr
      className={cycle === currentCycle ? "table-success" : ""}
      key={cycle.number}
    >
      {firstTeam.players.map((player) => (
        <td key={player.id}></td>
      ))}
      <td></td>
      <td></td>
      <td>{cycle.number}</td>
      <td></td>
      <td></td>
      {secondTeam.players.map((player) => (
        <td key={player.id}></td>
      ))}
    </tr>
  );
  return (
    <Card>
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
