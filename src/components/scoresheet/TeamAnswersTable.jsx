import React from "react";
import Table from "react-bootstrap/Table";

const TeamAnswersTable = ({ team, cycles, currentCycle, rules }) => {
  const nameColSpan = 2 + rules.tossupValues.length;
  return (
    <Table
      bordered
      responsive
      size="sm"
      style={{ textAlign: "center" }}
      className="m-0"
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
    </Table>
  );
};

export default TeamAnswersTable;
