import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import produce from "immer";
import pickBy from "lodash/pickBy";
import isEqual from "lodash/isEqual";

import Button from "@components/common/button";

import TeamsInPool from "./TeamsInPool";

const buildTeamToPoolMap = ({ teamsNotAssignedPools, poolTeams }) => {
  const map = {};
  teamsNotAssignedPools.forEach((team) => {
    map[team.id] = null;
  });
  Object.entries(poolTeams).forEach(([poolId, teams]) => {
    teams.forEach((team) => {
      map[team.id] = poolId;
    });
  });
  return map;
};

const editorIsDirty = (originalAssignments, currentAssignments) => {
  const originalMappings = buildTeamToPoolMap(originalAssignments);
  const newMappings = buildTeamToPoolMap(currentAssignments);
  return !isEqual(originalMappings, newMappings);
};

const buildInitialState = (pools, poolTeams, teamsNotAssignedPools) => ({
  poolTeams: pickBy({ ...poolTeams }, (_val, key) =>
    pools.some((p) => p.id === key)
  ),
  teamsNotAssignedPools: [...teamsNotAssignedPools],
});

const unassignedPool = { name: "No Assigned Pool", id: null };

const TeamPoolsEditor = ({
  phaseId,
  pools,
  poolTeams,
  teamsNotAssignedPools = [],
}) => {
  const [poolAssignments, setPoolAssignments] = useState(() => {
    return buildInitialState(pools, poolTeams, teamsNotAssignedPools);
  });
  const [originalAssignments, setOriginalAssignments] = useState({
    poolAssignments,
    dirty: false,
  });

  useEffect(() => {
    setOriginalAssignments({
      ...originalAssignments,
      dirty: editorIsDirty(
        originalAssignments.poolAssignments,
        poolAssignments
      ),
    });
  }, [poolAssignments]);

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
        draft.poolTeams[oldPoolId] = draft.poolTeams[oldPoolId].filter(
          (t) => t.id !== team.id
        );
      } else {
        draft.teamsNotAssignedPools = draft.teamsNotAssignedPools.filter(
          (t) => t.id !== team.id
        );
      }
      if (newPoolId) {
        draft.poolTeams[newPoolId] = [...draft.poolTeams[newPoolId], team];
      } else {
        draft.teamsNotAssignedPools = [...draft.teamsNotAssignedPools, team];
      }
    });
    setPoolAssignments(nextAssignmentsState);
  };

  const onReset = () => {
    setPoolAssignments(
      buildInitialState(pools, poolTeams, teamsNotAssignedPools)
    );
  };
  const allPools = [unassignedPool, ...pools];
  return (
    <Row>
      <Col lg={4} md={5} sm={12}>
        <TeamsInPool
          pool={unassignedPool}
          teams={poolAssignments.teamsNotAssignedPools}
          onAssignTeam={onAssignTeam}
          pools={allPools}
        />
      </Col>
      <Col lg={8} md={7} sm={12}>
        <Row>
          {pools.map((p) => (
            <Col lg={6} md={6} sm={6} xs={12} key={p.id}>
              <TeamsInPool
                pool={p}
                teams={poolAssignments.poolTeams[p.id] || []}
                onAssignTeam={onAssignTeam}
                pools={allPools}
              />
            </Col>
          ))}
        </Row>
      </Col>
      {originalAssignments.dirty && (
        <Col lg={12} md={5} sm={12} className="mt-3">
          <hr />
          <div className="float-end">
            <Button className="me-3" type="secondary" onClick={() => onReset()}>
              Reset
            </Button>
            <Button type="primary">Save Changes</Button>
          </div>
        </Col>
      )}
    </Row>
  );
};

export default TeamPoolsEditor;
