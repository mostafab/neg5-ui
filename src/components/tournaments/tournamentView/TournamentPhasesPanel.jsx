import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Row, Col } from "react-bootstrap";

import Icon from "@components/common/icon";
import Card from "@components/common/cards";
import Modal from "@components/common/modal";
import TeamsInPool from "@components/tournaments/tournamentView/pools/TeamsInPool";

const TournamentPhasesPanel = ({
  phases,
  pools,
  poolTeams,
  teamsNotAssignedPools,
}) => {
  const [asModal, setAsModal] = useState(false);
  const renderPools = (phaseId) => {
    const unassignedPool = { name: "No Assigned Pool", id: null };
    const matching = pools.filter((p) => p.phaseId === phaseId);
    return (
      <Row>
        {matching.map((p) => (
          <Col lg={4} md={6} sm={12} key={p.id}>
            <TeamsInPool pool={p} teams={poolTeams[p.id] || []} />
          </Col>
        ))}
        <Col lg={4} md={6} sm={12} key="unassigned">
          <TeamsInPool
            isUnassigned
            pool={unassignedPool}
            teams={teamsNotAssignedPools[phaseId] || []}
          />
        </Col>
      </Row>
    );
  };
  const Wrapper = ({ children }) => {
    if (asModal) {
      return (
        <Modal
          className="TournamentPhasesModal"
          onHide={() => setAsModal(false)}
          title="Team Pools"
          size="xl"
        >
          {children}
        </Modal>
      );
    }
    return <>{children}</>;
  };
  return (
    <Wrapper>
      <Card
        className="TournamentPhasesPanel"
        shadow={!asModal}
        title={
          <h5>
            {asModal ? null : "Team Pools"}
            {asModal ? null : (
              <Icon
                className="float-end"
                name="ArrowsAngleExpand"
                onClick={() => setAsModal(true)}
              />
            )}
          </h5>
        }
      >
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
    </Wrapper>
  );
};

export default TournamentPhasesPanel;
