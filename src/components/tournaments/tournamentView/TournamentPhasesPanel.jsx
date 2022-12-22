import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Row, Col } from "react-bootstrap";

import Icon from "@components/common/icon";
import Card from "@components/common/cards";
import TeamsInPool from "@components/tournaments/tournamentView/pools/TeamsInPool";

const TournamentPhasesPanel = ({ phases, pools }) => {
  const renderPools = (phaseId) => {
    const matching = pools.filter((p) => p.phaseId === phaseId);
    return (
      <Row>
        {matching.map((p) => (
          <Col lg={4} md={6} sm={12} key={p.id}>
            <TeamsInPool key={p.id} pool={p} />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <Card title="Team Pools">
      {phases.length > 0 && (
        <Tabs defaultActiveKey={phases[0].id}>
          {phases.map((p) => (
            <Tab key={p.id} eventKey={p.id} title={p.name}>
              {renderPools(p.id)}
            </Tab>
          ))}
          <Tab eventKey="new" key="new" title={<Icon name="Plus" />} />
        </Tabs>
      )}
    </Card>
  );
};

export default TournamentPhasesPanel;
