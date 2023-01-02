import React from "react";
import Table from "react-bootstrap/Table";

import { orderPlayers } from "@libs/scoresheet";

const TeamAnswersTable = ({
  team,
  cycles,
  currentCycle,
  rules,
  playerOrder,
}) => {
  const nameColSpan = 2 + rules.tossupValues.length;
  return (
    <Table bordered responsive size="sm" className="m-0">
      <thead>
        <tr>
          <th style={{ textAlign: "center" }} colSpan={nameColSpan}>
            {team.name}
          </th>
        </tr>
      </thead>
      <thead style={{ textAlign: "center" }}>
        <tr>
          <th />
          {rules.tossupValues.map((tv) => (
            <th key={tv.value}>{tv.value}</th>
          ))}
          <th>TUH</th>
        </tr>
      </thead>
      <tbody>
        {orderPlayers(team.players, playerOrder).map((player) => (
          <tr key={player.id}>
            <td className="ps-2">{player.name}</td>
            {rules.tossupValues.map((tv) => (
              <td key={tv.value}></td>
            ))}
            <td></td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TeamAnswersTable;
