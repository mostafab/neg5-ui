import React from "react";
import { Row, Col } from "react-bootstrap";

import Card from "@components/common/cards";
import { buildPlayersSummary } from "@libs/scoresheet";

import TeamAnswersTable from "./TeamAnswersTable";

const ScoresheetSummary = ({
  cycles,
  currentCycle,
  teams,
  rules,
  playerOrderings,
}) => {
  const playersSummary = buildPlayersSummary(
    teams,
    [...cycles, currentCycle],
    rules
  );
  return (
    <Card title="Summary">
      <Row>
        {teams.map((team) => (
          <Col lg={6} md={6} sm={12} key={team.id}>
            <TeamAnswersTable
              team={team}
              cycles={cycles}
              currentCycle={currentCycle}
              rules={rules}
              playerOrder={playerOrderings[team.id]}
              playersSummary={playersSummary}
            />
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default ScoresheetSummary;
