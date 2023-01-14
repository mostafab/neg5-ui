import React, { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import pickBy from "lodash/pickBy";

import Modal from "@components/common/modal";
import Card from "@components/common/cards";

import { groupTeamsWithoutAssignedPool, groupTeamsByPools } from "@libs/teams";

import PhaseScheduleEditor from "./PhaseScheduleEditor";

const SchedulingModal = ({ teams, phases, onHide, pools, schedules }) => {
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
                />
              </Tab>
            );
          })}
        </Tabs>
      </Card>
    </Modal>
  );
};

export default SchedulingModal;
