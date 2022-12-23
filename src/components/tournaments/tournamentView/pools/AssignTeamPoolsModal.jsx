import React from "react";
import { Row, Col } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Icon, { Warning } from "@components/common/icon";
import Card from "@components/common/cards";
import Modal from "@components/common/modal";
import TeamsInPool from "@components/tournaments/tournamentView/pools/TeamsInPool";

const AssignTeamPoolsModal = ({
  phases,
  pools,
  poolTeams,
  teamsNotAssignedPools,
  onHide,
}) => {
  const renderPools = (phaseId) => {
    const unassignedPool = { name: "No Assigned Pool", id: null };
    const matching = pools.filter((p) => p.phaseId === phaseId);
    return (
      <Row>
        <Col lg={3} md={6} sm={12} key="unassigned">
          <TeamsInPool
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
  return (
    <Modal
      className="TournamentPhasesModal"
      onHide={onHide}
      title="Team Pools"
      size="xl"
    >
      <Card className="TournamentPhasesPanel" shadow={false} title={null}>
        {phases.length > 0 && (
          <Tabs defaultActiveKey={phases[0].id}>
            {phases.map((p) => (
              <Tab
                key={p.id}
                eventKey={p.id}
                title={
                  <>
                    <span className="m-1">{p.name}</span>
                    {(teamsNotAssignedPools[p.id] || []).length > 0 && (
                      <Warning
                        className="float-end"
                        message="Some teams aren't assigned to a pool."
                      />
                    )}
                  </>
                }
              >
                {renderPools(p.id)}
              </Tab>
            ))}
            <Tab eventKey="new" key="new" title={<Icon name="Plus" />} />
          </Tabs>
        )}
      </Card>
    </Modal>
  );
};

export default AssignTeamPoolsModal;
