import React, { useState } from "react";
import { Row, Col, Tab, Tabs } from "react-bootstrap";

import pickBy from "lodash/pickBy";
import { Add } from "@components/common/icon";
import Modal from "@components/common/modal";
import Card from "@components/common/cards";
import PhaseForm from "@components/tournaments/tournamentView/pools/PhaseForm";

import { groupTeamsWithoutAssignedPool, groupTeamsByPools } from "@libs/teams";

import PhaseScheduleEditor from "./PhaseScheduleEditor";

const SchedulingModal = ({
  teams,
  phases,
  onHide,
  pools,
  schedules,
  editable,
}) => {
  const [activeTab, setActiveTab] = useState(
    phases.length === 0 ? "" : phases[0].id
  );
  const poolTeams = groupTeamsByPools(teams);
  const teamsNotAssignedPools = groupTeamsWithoutAssignedPool(teams, phases);
  return (
    <Modal title="Scheduling" onHide={onHide} fullscreen>
      <Card>
        <Tabs transition={false} activeKey={activeTab} onSelect={setActiveTab}>
          {phases.map((phase) => {
            const poolsInPhase = pools.filter((p) => p.phaseId === phase.id);
            const poolTeamsForThisPhase = pickBy(poolTeams, (_, poolId) =>
              poolsInPhase.some((p) => p.id === poolId)
            );
            return (
              <Tab key={phase.id} eventKey={phase.id} title={phase.name}>
                <PhaseScheduleEditor
                  phase={phase}
                  teams={teams}
                  schedule={
                    schedules.find((s) => s.tournamentPhaseId === phase.id) ||
                    null
                  }
                  pools={poolsInPhase}
                  poolTeams={poolTeamsForThisPhase}
                  unassignedTeams={teamsNotAssignedPools[phase.id] || []}
                  editable={editable}
                />
              </Tab>
            );
          })}
          {editable && (
            <Tab eventKey="new" key="new" title={<Add className="mb-1" />}>
              <Row className="mt-3 p-3">
                <Col lg={4} md={2} sm={12} />
                <Col lg={4} md={8} sm={12}>
                  <PhaseForm
                    phase={null}
                    onSubmitSuccess={(phase) => setActiveTab(phase.id)}
                  />
                </Col>
                <Col lg={4} md={2} sm={12} />
              </Row>
            </Tab>
          )}
        </Tabs>
      </Card>
    </Modal>
  );
};

export default SchedulingModal;
