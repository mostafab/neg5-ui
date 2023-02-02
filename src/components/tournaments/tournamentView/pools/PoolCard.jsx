import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

import DropdownActions from "@components/common/DropdownActions";
import Card from "@components/common/cards";

const TeamRow = ({ team, poolId, pools, onAssign, readOnly }) => {
  const actions = readOnly
    ? []
    : pools
        .filter((p) => p.id !== poolId)
        .map((p) => ({
          label: p.id ? `Move to ${p.name}` : "Unassign",
          onClick: onAssign ? () => onAssign(team, poolId, p.id || null) : null,
        }));
  return (
    <div>
      <ListGroup.Item className="d-flex justify-content-between">
        {team.name}
        {actions.length > 0 && <DropdownActions actions={actions} />}
      </ListGroup.Item>
    </div>
  );
};

const PoolCard = ({
  pool,
  teams,
  onAssignTeam,
  pools,
  actions = null,
  readOnly,
  showCount = true,
}) => {
  return (
    <div>
      <Card
        title={
          <h6>
            <b>
              {pool.name} {teams.length > 0 && showCount && `(${teams.length})`}
            </b>
          </h6>
        }
        shadow={false}
        className="mt-4"
        actions={actions}
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
              readOnly={readOnly}
            />
          ))}
        </ListGroup>
      </Card>
    </div>
  );
};

export default PoolCard;
