import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import produce from "immer";

import Button from "@components/common/button";

import TeamsInPool from "./TeamsInPool";

const buildInitialState = (poolTeams, teamsNotAssignedPools) => ({
  poolTeams: poolTeams,
  teamsNotAssignedPools: teamsNotAssignedPools,
});

const unassignedPool = { name: "No Assigned Pool", id: null };

const TeamPoolsEditor = ({
  phaseId,
  pools,
  poolTeams,
  teamsNotAssignedPools = [],
}) => {
  const [poolAssignments, setPoolAssignments] = useState(
    () => buildInitialState(poolTeams, teamsNotAssignedPools)
  );
  console.log(poolAssignments);

  const onAssignTeam = (team, oldPoolId, newPoolId) => {
    /*
    On a pool re-assignment, add the team to the new pool and
    remove them from the old pool in this phase
    */
    const nextAssignmentsState = produce(poolAssignments, (draft) => {
      if (newPoolId && !draft.poolTeams[newPoolId]) {
        draft.poolTeams[newPoolId] = [];
      }
      if (oldPoolId && !draft.poolTeams[oldPoolId]) {
        draft.poolTeams[oldPoolId] = [];
      }
      if (oldPoolId) {
        draft.poolTeams[oldPoolId] = draft.poolTeams[oldPoolId].filter(t => t.id !== team.id);
      } else {
        draft.teamsNotAssignedPools = draft.teamsNotAssignedPools.filter(t => t.id !== team.id);
      }
      if (newPoolId) {
        draft.poolTeams[newPoolId].push(team);
      } else {
        draft.teamsNotAssignedPools.push(team);
      }
    });
    setPoolAssignments(nextAssignmentsState);
  };

  const onReset = () => {
    setPoolAssignments(buildInitialState(poolTeams, teamsNotAssignedPools));
  };

  return (
    <Row>
      <Col lg={4} md={6} sm={6} xs={6} key="unassigned">
        <TeamsInPool
          pool={unassignedPool}
          teams={poolAssignments.teamsNotAssignedPools}
          onAssignTeam={onAssignTeam}
        />
      </Col>
      {pools.map((p) => (
        <Col lg={4} md={6} sm={6} xs={6} key={p.id}>
          <TeamsInPool
            pool={p}
            teams={poolAssignments.poolTeams[p.id] || []}
            onAssignTeam={onAssignTeam}
          />
        </Col>
      ))}
      <Col lg={12} className="mt-3">
        <hr />
        <div className="float-end">
          <Button className="me-3" type="secondary" onClick={() => onReset()}>
            Reset
          </Button>
          <Button type="primary">Save Changes</Button>
        </div>
      </Col>
    </Row>
  );
};

export default TeamPoolsEditor;

