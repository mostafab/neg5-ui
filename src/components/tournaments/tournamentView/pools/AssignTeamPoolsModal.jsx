import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import produce from "immer";

import Icon, { Warning } from "@components/common/icon";
import Card from "@components/common/cards";
import Modal from "@components/common/modal";

import PoolForm from "./PoolForm";
import PhaseForm from "./PhaseForm";
import TeamPoolsEditor from "./TeamPoolsEditor";

const buildInitialState = (phase, poolTeams, teamsNotAssignedPools) => ({
  poolTeams: poolTeams,
  teamsNotAssignedPools: teamsNotAssignedPools[phase.id],
});

const AssignTeamPoolsModal = ({
  phases,
  pools,
  poolTeams,
  teamsNotAssignedPools,
  onHide,
}) => {
  const [selectedTab, setSelectedTab] = useState(
    phases.length === 0 ? "new" : phases[0].id
  );

  const [poolAssignments, setPoolAssignments] = useState(
    () => {
      const result = {};
      phases.forEach(phase => {
        result[phase.id] = buildInitialState(phase, poolTeams, teamsNotAssignedPools);
      })
      return result;
    }
  );
  console.log(poolAssignments);

  const onAssignTeam = (phaseId, team, oldPoolId, newPoolId) => {
    /*
    On a pool re-assignment, add the team to the new pool and
    remove them from the old pool in this phase
    */
    const nextAssignmentsState = produce(poolAssignments, (draft) => {
      if (newPoolId && !draft[phaseId].poolTeams[newPoolId]) {
        draft[phaseId].poolTeams[newPoolId] = [];
      }
      if (oldPoolId && !draft[phaseId].poolTeams[oldPoolId]) {
        draft[phaseId].poolTeams[oldPoolId] = [];
      }
      if (oldPoolId) {
        draft[phaseId].poolTeams[oldPoolId] = draft[phaseId].poolTeams[oldPoolId].filter(t => t.id !== team.id);
      } else {
        draft[phaseId].teamsNotAssignedPools = draft[phaseId].teamsNotAssignedPools.filter(t => t.id !== team.id);
      }
      if (newPoolId) {
        draft[phaseId].poolTeams[newPoolId].push(team);
      } else {
        draft[phaseId].teamsNotAssignedPools.push(team);
      }
    });
    setPoolAssignments(nextAssignmentsState);
  };

  const renderPools = (phaseId) => {
    const matching = pools.filter((p) => p.phaseId === phaseId);
    return (
      <>
        <Row>
          <Col lg={4} md={6} sm={12}>
            <PoolForm className="mt-4" phaseId={phaseId} pool={null} />
          </Col>
        </Row>
        <TeamPoolsEditor
          teamsNotAssignedPools={teamsNotAssignedPools[phaseId]}
          phaseId={phaseId}
          pools={matching}
          poolTeams={poolTeams}
          onAssignTeam={onAssignTeam}
          poolAssignments={poolAssignments[phaseId]}
        />
      </>
    );
  };
  return (
    <Modal
      className="TournamentPhasesModal"
      onHide={onHide}
      title="Team Pools"
      size="xl"
    >
      <DndProvider backend={HTML5Backend}>
        <Card className="TournamentPhasesPanel mt-3" shadow title={null}>
          {phases.length > 0 && (
            <Tabs
              mountOnEnter={false}
              transition={false}
              activeKey={selectedTab}
              onSelect={(key) => setSelectedTab(key)}
            >
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
              <Tab
                eventKey="new"
                key="new"
                title={
                  <>
                    New Phase
                    <Icon name="Plus" className="ms-2" />
                  </>
                }
              >
                <Row className="mt-3 p-3">
                  <Col lg={4} md={2} sm={12} />
                  <Col lg={4} md={8} sm={12}>
                    <PhaseForm
                      phase={null}
                      onSubmitSuccess={(phase) => setSelectedTab(phase.id)}
                    />
                  </Col>
                  <Col lg={4} md={2} sm={12} />
                </Row>
              </Tab>
            </Tabs>
          )}
        </Card>
      </DndProvider>
    </Modal>
  );
};

export default AssignTeamPoolsModal;
