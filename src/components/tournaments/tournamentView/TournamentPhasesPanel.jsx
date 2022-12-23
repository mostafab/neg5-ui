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
  const [showModal, setShowModal] = useState(false);
  const renderPools = (phaseId) => {
    const unassignedPool = { name: "No Assigned Pool", id: null };
    const matching = pools.filter((p) => p.phaseId === phaseId);
    return (
      <Row>
        <Col lg={3} md={6} sm={12} key="unassigned">
          <TeamsInPool
            isUnassigned
            pool={unassignedPool}
            teams={teamsNotAssignedPools[phaseId] || []}
          />
        </Col>
        {matching.map((p) => (
          <Col lg={3} md={6} sm={12} key={p.id}>
            <TeamsInPool pool={p} teams={poolTeams[p.id] || []} />
          </Col>
        ))}
      </Row>
    );
  };
  if (!showModal) {
    return (
      <Card
        className="TournamentPhasesPanel"
        shadow={!showModal}
        title={
          <h5>
            {"View/Assign Team Pools"}
            {
              <Icon
                className="float-end"
                name="ArrowsAngleExpand"
                onClick={() => setShowModal(true)}
              />
            }
          </h5>
        }
      ></Card>
    );
  }
  const Wrapper = ({ children }) => {
    return (
      <Modal
        className="TournamentPhasesModal"
        onHide={() => setShowModal(false)}
        title="Team Pools"
        size="xl"
      >
        {children}
      </Modal>
    );
  };
  return (
    <Wrapper>
      <Card className="TournamentPhasesPanel" shadow={!showModal} title={null}>
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