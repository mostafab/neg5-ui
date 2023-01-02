import React from "react";
import { Row, Col } from "react-bootstrap";

import Card from "@components/common/cards";

import TeamAnswersTable from "./TeamAnswersTable";

const ScoresheetSummary = ({ cycles, currentCycle, teams, rules }) => {
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
            />
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default ScoresheetSummary;
