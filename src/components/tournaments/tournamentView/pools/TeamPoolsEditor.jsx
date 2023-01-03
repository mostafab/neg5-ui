import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";

import Button from "@components/common/button";

import TeamsInPool from "./TeamsInPool";

const buildInitialState = (poolTeams, teamsNotAssignedPools) => ({
  poolTeams: poolTeams,
  teamsNotAssignedPools,
});

const unassignedPool = { name: "No Assigned Pool", id: null };

const TeamPoolsEditor = ({
  phaseId,
  pools,
  poolTeams,
  teamsNotAssignedPools = [],
  onAssignTeam,
  poolAssignments,
}) => {

  const internalOnAssignTeam = (team, oldPoolId, newPoolId) => {
    onAssignTeam(phaseId, team, oldPoolId, newPoolId);
  };

  return (
    <Row>
      <Col lg={4} md={6} sm={6} xs={6} key="unassigned">
        <TeamsInPool
          pool={unassignedPool}
          teams={poolAssignments.teamsNotAssignedPools}
          onAssignTeam={internalOnAssignTeam}
        />
      </Col>
      {pools.map((p) => (
        <Col lg={4} md={6} sm={6} xs={6} key={p.id}>
          <TeamsInPool
            pool={p}
            teams={poolAssignments.poolTeams[p.id] || []}
            onAssignTeam={internalOnAssignTeam}
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

