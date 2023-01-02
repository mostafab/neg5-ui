import React from "react";
import Table from "react-bootstrap/Table";

import { orderPlayers } from "@libs/scoresheet";

const TeamAnswersTable = ({ team, rules, playerOrder, playersSummary }) => {
  const nameColSpan = 2 + rules.tossupValues.length;
  return (
    <Table
      bordered
      responsive
      size="sm"
      className="m-0"
      style={{ textAlign: "center" }}
    >
      <thead>
        <tr>
          <th colSpan={nameColSpan}>{team.name}</th>
        </tr>
      </thead>
      <thead>
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
            <td className="ps-2" style={{ textAlign: "left" }}>
              {player.name}
            </td>
            {rules.tossupValues.map((tv) => (
              <td key={tv.value}>
                {playersSummary[player.id].tossupValueCounts[tv.value]}
              </td>
            ))}
            <td>{playersSummary[player.id].tossupsHeard}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TeamAnswersTable;
