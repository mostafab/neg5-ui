import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Row, Col } from "react-bootstrap";

import Card from "@components/common/cards";
import PoolCard from "@components/tournaments/tournamentView/pools/PoolCard";

const TournamentPhasesPanel = ({ phases, pools }) => {
  const renderPools = (phaseId) => {
    const matching = pools.filter((p) => p.phaseId === phaseId);
    return (
      <Row>
        {matching.map((p) => (
          <Col lg={3} md={3} sm={2}>
            <PoolCard key={p.id} pool={p} />
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <Card title="Phases & Pools">
      {phases.length > 0 && (
        <Tabs defaultActiveKey={phases[0].id}>
          {phases.map((p) => (
            <Tab key={p.id} eventKey={p.id} title={p.name}>
              {renderPools(p.id)}
            </Tab>
          ))}
        </Tabs>
      )}
    </Card>
  );
};

export default TournamentPhasesPanel;
