import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

import DropdownActions from "@components/common/DropdownActions";
import Card from "@components/common/cards";

const TeamRow = ({ team, poolId, pools, onAssign }) => {
  const actions = pools
    .filter((p) => p.id !== poolId)
    .map((p) => ({
      label: p.id ? `Move to ${p.name}` : "Unassign",
      onClick: () => onAssign(team, poolId, p.id || null),
    }));
  return (
    <div>
      <ListGroup.Item className="d-flex justify-content-between">
        {team.name}
        <DropdownActions actions={actions} />
      </ListGroup.Item>
    </div>
  );
};

const PoolCard = ({ pool, teams, onAssignTeam, pools }) => {
  return (
    <div>
      <Card
        title={
          <h6>
            <b>
              {pool.name} ({teams.length})
            </b>
          </h6>
        }
        shadow={false}
        className="mt-4"
      >
        <hr />
        <ListGroup>
          {teams.map((t) => (
            <TeamRow
              team={t}
              key={t.id}
              poolId={pool.id || null}
              pools={pools}
              onAssign={onAssignTeam}
            />
          ))}
        </ListGroup>
      </Card>
    </div>
  );
};

export default PoolCard;
